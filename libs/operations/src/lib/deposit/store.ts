import { getCustBankInfo, getCustEWalletInfo } from 'JF-api/account/client'
import { IAxiosError } from 'JF-api/baseApi'
import {
	checkDepositSpecialCode,
	getDepositInfoRecentList,
	getPayInfoListAll,
	postDepositBankTransferReq,
	postUploadReceipt,
} from 'JF-api/payment/client'
import { setDepositPromotionQueue } from 'JF-api/promotion/client'
import {
	DEPOSIT_OPTIONS_IMAGE,
	DEPOSIT_PAYMENT_TYPE,
	DepositStatusEnum,
	DepositTypeEnum,
	DeviceTypeEnum,
} from 'JF-constants'
import { convertFileToBase64, isConvert, objectEntries } from 'JF-core'
import { filter, head, isEmpty } from 'lodash-es'
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { IDepositAction, IDepositState, PaymentOption } from './type'

const useDepositStore = create<IDepositState & IDepositAction>((set, get) => ({
	isInit: false,
	isLoading: false,
	payInfoListAll: null,
	paymentOptions: [],
	runningDepositRequestList: [],
	bankData: {
		custEWalletInfo: [],
		bankInfoDetail: [],
		usdtDetail: [],
	},
	fetchPayInfoListAll: async () => {
		set({ isLoading: true })
		const [payInfoListAll, depositRecentInfo, custBankInfo, custEWalletInfo] =
			await Promise.all([
				getPayInfoListAll(),
				getDepositInfoRecentList(),
				getCustBankInfo(),
				getCustEWalletInfo(),
			])

		const { bankInfoDetail = [], uSDTDetail: usdtDetail = [] } =
			custBankInfo ?? {}

		const bankData = {
			bankInfoDetail,
			usdtDetail,
			custEWalletInfo,
		}

		const runningDepositRequestList = filter(depositRecentInfo, item => {
			const { depositType, status } = item || {}
			// 只有 BankTransfer 才有 Processing 狀態
			return (
				depositType === DepositTypeEnum.BankTransfer &&
				status === DepositStatusEnum.Pending
			)
		})

		if (!payInfoListAll) return

		const paymentOptions = objectEntries(payInfoListAll).reduce<
			PaymentOption[]
		>((acc, [key, value]) => {
			if (key === DEPOSIT_PAYMENT_TYPE.EWallet) {
				// EWallet 顯示的數量是根據 api 決定，在 nova 來說這裡是第二層
				value?.data.forEach(EWalletData => {
					const defEWalletItem = DEPOSIT_OPTIONS_IMAGE.EWallet.options.find(
						item => item.groupId === EWalletData.groupId,
					)

					acc.push({
						title: DEPOSIT_OPTIONS_IMAGE[key]?.title,
						query: {
							paymentType: key,
							groupId: EWalletData.groupId,
						},
						image: defEWalletItem?.image,
					})
				})
			} else if (key === DEPOSIT_PAYMENT_TYPE.BankTransfer) {
				// BankTransfer 顯示的數量只有一個，api 沒有就不顯示
				if (!isEmpty(value?.data)) {
					const firstBankSysId = head(value?.data)?.sysId
					acc.push({
						title: DEPOSIT_OPTIONS_IMAGE[key]?.title,
						query: {
							paymentType: key,
							sysId: firstBankSysId,
						},
						image: DEPOSIT_OPTIONS_IMAGE[key]?.image,
					})
				}
			} else if (key === DEPOSIT_PAYMENT_TYPE.OnlineBanking) {
				// OnlineBanking 顯示的數量只有一個，api 沒有就不顯示
				if (!isEmpty(value?.data)) {
					const firstPayId = head(value?.data)?.payId
					acc.push({
						title: DEPOSIT_OPTIONS_IMAGE[key]?.title,
						query: {
							paymentType: key,
							payId: firstPayId,
						},
						image: DEPOSIT_OPTIONS_IMAGE[key]?.image,
					})
				}
			} else if (key === DEPOSIT_PAYMENT_TYPE.Crypto) {
				// Crypto 顯示的數量只有一個，api 沒有就不顯示，這裡固定只有一個，不會有沒有的情況
				if (!isEmpty(value?.data)) {
					acc.push({
						title: DEPOSIT_OPTIONS_IMAGE[key]?.title,
						query: {
							paymentType: key,
						},
						image: DEPOSIT_OPTIONS_IMAGE[key]?.image,
					})
				}
			}
			return acc
		}, [])

		set({
			isInit: true,
			isLoading: false,
			payInfoListAll,
			paymentOptions,
			runningDepositRequestList,
			bankData,
		})
	},
	onSubmitBankTransfer: async (
		amount,
		originBonusCode,
		promoCode,
		imageFile,
		setImageFile,
		currencyId,
		sysIdParam,
		bankAccountInfo,
		langId,
		t,
	) => {
		set({ isLoading: true })
		const receipt = imageFile && (await convertFileToBase64(imageFile))
		const convertedAmount = isConvert(currencyId) ? amount * 1000 : amount

		let bonusCode = originBonusCode

		try {
			if (promoCode) {
				const { data } = await checkDepositSpecialCode({
					specialCode: promoCode,
				})

				bonusCode = data?.bonusCode
			}

			const {
				data: { transId },
			} = await postDepositBankTransferReq({
				amount: convertedAmount,
				sysId: Number(sysIdParam),
				bankId: Number(bankAccountInfo?.bankId),
				hasPromotion: Boolean(bonusCode),
				code: bankAccountInfo?.code,
			})

			if (transId) {
				await Promise.all([
					receipt && postUploadReceipt({ transId, receipt }),
					bonusCode &&
						setDepositPromotionQueue({
							langId,
							transId,
							bonusCode,
							deviceType: DeviceTypeEnum.Desktop,
						}),
				])
			}
			setImageFile(null)
			toast.success(t('Label_General_UpdateSuccessful'))
			await get().fetchPayInfoListAll()
		} catch (error) {
			const { rawMessage, message } = error as IAxiosError
			toast.error(rawMessage || message)
			set({ isLoading: false })
		}
	},
	onSubmitOnlineBanking: async (
		amount,
		originBonusCode,
		promoCode,
		channelId,
		currencyId,
		langId,
		t,
	) => {
		set({ isLoading: true })
		try {
			const {
				bankData: { bankInfoDetail },
			} = get()
			const bankItem = head(bankInfoDetail)

			if (!bankItem) return

			const { accountNo, sysId } = bankItem

			const host = typeof window === 'undefined' ? null : window.location.origin

			const dbHost =
				process.env.NODE_ENV === 'production'
					? host
					: process.env['NEXT_PUBLIC_ENV_DB_HOST']

			const realAmount = isConvert(currencyId)
				? Number(amount) * 1000
				: Number(amount)

			let bonusCode = originBonusCode

			if (promoCode) {
				const { data } = await checkDepositSpecialCode({
					specialCode: promoCode,
				})

				bonusCode = data?.bonusCode
			}

			const errorUrl = `${dbHost}/404/index_${langId}.html`
			const searchParams = new URLSearchParams({
				sysId: String(sysId),
				payAccount: accountNo,
				channelId: String(channelId),
				amount: String(realAmount),
				bonusCode: String(bonusCode),
				errorUrl,
			})
			const paramsUrl = searchParams.toString()
			const baseUrl = `${dbHost}/${langId}/Cashier/DepositReq`
			window.open(`${baseUrl}?${paramsUrl}`)
			set({ isLoading: false })
			toast.success(t('Label_General_UpdateSuccessful'))
		} catch (error) {
			const { rawMessage, message } = error as IAxiosError
			toast.error(rawMessage || message)
		}
	},
	onSubmitMobilePay: async (
		amount,
		originBonusCode,
		promoCode,
		firstChannelId,
		currencyId,
		langId,
		t,
	) => {
		set({ isLoading: true })
		try {
			const {
				bankData: { bankInfoDetail },
			} = get()
			const bankItem = head(bankInfoDetail)

			if (!bankItem) return

			const { accountNo, sysId } = bankItem

			const host = typeof window === 'undefined' ? null : window.location.origin

			const dbHost =
				process.env.NODE_ENV === 'production'
					? host
					: process.env['NEXT_PUBLIC_ENV_DB_HOST']

			const realAmount = isConvert(currencyId)
				? Number(amount) * 1000
				: Number(amount)

			let bonusCode = originBonusCode

			if (promoCode) {
				const { data } = await checkDepositSpecialCode({
					specialCode: promoCode,
				})

				bonusCode = data?.bonusCode
			}

			const errorUrl = `${dbHost}/404/index_${langId}.html`

			const searchParams = new URLSearchParams({
				SysId: String(sysId),
				PayAccount: accountNo,
				ChannelId: String(firstChannelId),
				Amount: String(realAmount),
				BonusCode: String(bonusCode),
				errorUrl,
			})

			const paramsUrl = searchParams.toString()
			const baseUrl = `${dbHost}/${langId}/Cashier/DepositReq`
			window.open(`${baseUrl}?${paramsUrl}`)
			set({ isLoading: false })
			toast.success(t('Label_General_UpdateSuccessful'))
		} catch (error) {
			const { rawMessage, message } = error as IAxiosError
			toast.error(rawMessage || message)
		}
	},
	onSubmitCryptoPay: async (
		amount,
		originBonusCode,
		promoCode,
		firstChannelId,
		currencyId,
		langId,
		t,
	) => {
		set({ isLoading: true })
		try {
			const {
				bankData: { bankInfoDetail },
			} = get()
			const bankItem = head(bankInfoDetail)

			if (!bankItem) return

			const { accountNo, sysId } = bankItem

			const host = typeof window === 'undefined' ? null : window.location.origin

			const dbHost =
				process.env.NODE_ENV === 'production'
					? host
					: process.env['NEXT_PUBLIC_ENV_DB_HOST']

			const realAmount = isConvert(currencyId)
				? Number(amount) * 1000
				: Number(amount)

			let bonusCode = originBonusCode

			if (promoCode) {
				const { data } = await checkDepositSpecialCode({
					specialCode: promoCode,
				})

				bonusCode = data?.bonusCode
			}

			const errorUrl = `${dbHost}/404/index_${langId}.html`

			const searchParams = new URLSearchParams({
				SysId: String(sysId),
				PayAccount: accountNo,
				ChannelId: String(firstChannelId),
				Amount: String(realAmount),
				BonusCode: String(bonusCode),
				errorUrl,
			})

			const paramsUrl = searchParams.toString()
			const baseUrl = `${dbHost}/${langId}/Cashier/DepositReq`
			window.open(`${baseUrl}?${paramsUrl}`)
			set({ isLoading: false })
			toast.success(t('Label_General_UpdateSuccessful'))
		} catch (error) {
			const { rawMessage, message } = error as IAxiosError
			toast.error(rawMessage || message)
		}
	},
}))

export { useDepositStore }
