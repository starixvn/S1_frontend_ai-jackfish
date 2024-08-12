import {
	getCustBankInfo,
	getCustEWalletInfo,
	getWithdrawalAvailableBalance,
} from 'JF-api/account/client'
import { IAxiosError } from 'JF-api/baseApi'
import {
	cancelWithdrawalReq,
	checkKyc,
	getWithdrawalBlockSetting,
	getWithdrawalLimit,
	getWithdrawalRecentInfo,
	submitLocalBankWithdrawal,
} from 'JF-api/payment/client'
import { KycStatusEnum, WithdrawalStatusEnum } from 'JF-api/payment/type'
import { isConvert } from 'JF-core'
import { find, head } from 'lodash-es'
import { create } from 'zustand'
import { IWithdrawalAction, IWithdrawalState } from './type'

const useWithdrawalStore = create<IWithdrawalState & IWithdrawalAction>(
	(set, get) => ({
		isInit: false,
		isLoading: false,
		accountName: '',
		withdrawalLimit: undefined,
		withdrawalBalance: undefined,
		runningWithdrawalRequest: undefined,
		kycStatus: KycStatusEnum.Normal,
		withdrawalBlockSetting: [],
		bankData: {
			custEWalletInfo: [],
			bankInfoDetail: [],
			usdtDetail: [],
		},
		// 初始化所有資料，每次 mutation 這些資料都要被重撈
		fetchWithdrawalInfo: async () => {
			set({ isLoading: true })
			const [
				kycStatus,
				custBankInfo,
				custEWalletInfo,
				withdrawalBalance,
				withdrawalLimit,
				withdrawalBlockSetting,
				withdrawalRecentInfo,
			] = await Promise.all([
				checkKyc(),
				getCustBankInfo(),
				getCustEWalletInfo(),
				getWithdrawalAvailableBalance(),
				getWithdrawalLimit(),
				getWithdrawalBlockSetting(),
				getWithdrawalRecentInfo(),
			])

			const {
				bankInfoDetail = [],
				uSDTDetail: usdtDetail = [],
				accountName = '',
			} = custBankInfo ?? {}

			const bankData = {
				bankInfoDetail,
				usdtDetail,
				custEWalletInfo,
			}
			const runningWithdrawalRequest = find(withdrawalRecentInfo, item => {
				const { status, canCancel } = item
				return (
					(canCancel && status === WithdrawalStatusEnum.Pending) ||
					status === WithdrawalStatusEnum.ToKyc
				)
			})

			set({
				isInit: true,
				isLoading: false,
				kycStatus,
				bankData,
				accountName,
				withdrawalBalance,
				withdrawalLimit,
				withdrawalBlockSetting,
				runningWithdrawalRequest,
			})
		},
		submitWithdrawalRequest: async ({ amount, currencyId }) => {
			set({ isLoading: true })
			const {
				bankData: { bankInfoDetail },
			} = get()
			const bankItem = head(bankInfoDetail)

			// 沒銀行資料就直接 early return
			// tuk555 只有 localBank , 並且固定只有一張卡，因為後端沒改結構，固定取第一張 bank card
			if (!bankItem) return

			const { accountNo, sysId, ifscCode } = bankItem

			// 判斷 amount 送出是否需經過轉換，特定幣別需使用
			const realAmount = isConvert(currencyId)
				? Number(amount) * 1000
				: Number(amount)

			// 三方 blackBox , submit 要用，計算 risk 分數
			const blackbox = await (async () => {
				let blackBox = ''
				if (
					window &&
					'IGLOO' in window &&
					typeof window.IGLOO === 'function' &&
					'getBlackbox' in window.IGLOO &&
					typeof window.IGLOO.getBlackbox === 'function'
				) {
					try {
						const result = await window.IGLOO.getBlackbox()
						blackBox = result?.blackbox || ''
					} catch (e) {
						//
					}
				}

				return blackBox
			})()

			try {
				await submitLocalBankWithdrawal({
					amount: realAmount,
					accountNo,
					ifscCode,
					sysId,
					blackbox,
				})
			} catch (error) {
				// errorCode : 2 也被視為成功
				if ((error as IAxiosError).errorCode !== 2) throw error
			}

			await get().fetchWithdrawalInfo()
		},
		cancelWithdrawalRequest: async ({ transId }) => {
			set({ isLoading: true })
			await cancelWithdrawalReq(transId)
			await get().fetchWithdrawalInfo()
		},
	}),
)

export { useWithdrawalStore }
