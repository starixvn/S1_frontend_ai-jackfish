import { useClientTranslation } from '@brand01/src/i18n/client'
import { envCookieNames } from '@brand01/src/i18n/settings'
import {
	getPromotionDetail,
	getPromotionListV3,
	setClaimPromotion,
} from 'JF-api/promotion/client'
import { PromotionType } from 'JF-api/promotion/type'
import { promotionApiUrl } from 'JF-api/promotion/url'
import { DeviceTypeEnum } from 'JF-constants'
import { useAuthStore } from 'JF-operations'
import dayjs from 'dayjs'
import { every, filter, includes } from 'lodash-es'
import { useCookies } from 'react-cookie'
import useSWR from 'swr'

const deviceType = DeviceTypeEnum.Desktop

const useLocale = () => {
	const [cookies] = useCookies([
		envCookieNames.langId,
		envCookieNames.currencyId,
	])
	return {
		langId: String(cookies[envCookieNames.langId]),
		currencyId: Number(cookies[envCookieNames.currencyId]),
	}
}

export const usePromotionList = () => {
	const { langId, currencyId } = useLocale()
	const { data: { data: originalPromotionList } = {}, isLoading } = useSWR(
		{
			url: promotionApiUrl.getPromotionListV3,
			args: { langId, currencyId, deviceType },
		},
		({ args }) => getPromotionListV3(args),
	)

	const data = originalPromotionList
		? filter(
				originalPromotionList,
				({ isJoin, promotionType, custExpiryTime, periodTo }) =>
					isJoin &&
					!includes(
						[PromotionType.Rebate, PromotionType.Cashback],
						promotionType,
					)
						? dayjs().isBefore(dayjs(custExpiryTime))
						: dayjs().isBefore(dayjs(dayjs.unix(periodTo))),
			)
		: []

	return { data, isLoading }
}

export const useActivePromotionList = () => {
	const { langId, currencyId } = useLocale()
	const { data: { data: originalPromotionList } = {}, isLoading } = useSWR(
		{
			url: promotionApiUrl.getPromotionListV3,
			args: { langId, currencyId, deviceType },
		},
		({ args }) => getPromotionListV3(args),
	)

	const data = originalPromotionList
		? filter(
				originalPromotionList,
				({ isJoin, promotionType, custExpiryTime, periodTo }) =>
					isJoin &&
					!includes(
						[PromotionType.Rebate, PromotionType.Cashback],
						promotionType,
					)
						? dayjs().isBefore(dayjs(custExpiryTime))
						: dayjs().isBefore(dayjs(dayjs.unix(periodTo))),
			)
		: []

	return { data, isLoading }
}

// const revalidateUrl = (url: string) => mutate((key: any) => key?.url === url)

export const usePromotionDetail = ({
	bonusCode,
	errorCallback,
	amountCallback,
	successCallback,
}: {
	bonusCode: string
	errorCallback?: (message: string) => void
	successCallback?: () => void
	amountCallback?: () => void
}) => {
	const { t } = useClientTranslation()
	const { langId, currencyId } = useLocale()

	const {
		data: { data } = {},
		isLoading,
		mutate,
	} = useSWR(
		{
			url: promotionApiUrl.getPromotionDetail,
			args: { langId, currencyId, deviceType, bonusCode },
		},
		({ args }) => getPromotionDetail(args),
	)

	const {
		userInfo: {
			accountName,
			phoneNo,
			email,
			birth_d: birthD,
			birth_m: birthM,
			birth_y: birthY,
		},
	} = useAuthStore()

	/**
	 * 領取該 Promotion
	 * @param amount 領取的金額，若未提供且為特定類別會呼叫 amountCallback，否則預設使用該 Promotion 的最大金額 (maxAmount)
	 */
	const claimPromotion = async (amount?: number) => {
		try {
			if (!data) throw new Error(t('Label_General_NoData'))

			// 領取前需先完成個人資料
			if (!every([accountName, phoneNo, email, birthD, birthM, birthY])) {
				throw new Error(t('Label_General_UpdateProfileInfo'))
			}

			// 特定類別需要輸入金額
			const isAmountRequired = includes(
				[
					PromotionType.Redeposit,
					PromotionType.FirstDeposit,
					PromotionType.MissionBonus,
				],
				data.promotionType,
			)

			// 依照 Nova88 原有邏輯，是 canJoin 才要求輸入金額，若非 canJoin 則送 API 拿錯誤訊息
			if (amountCallback && data.canJoin && isAmountRequired && !amount) {
				amountCallback()
				return
			}

			const lockedAmount = amount ?? data.maxAmount ?? 0
			await setClaimPromotion({ langId, deviceType, bonusCode, lockedAmount })
			mutate()
			if (successCallback) successCallback()
		} catch (error) {
			if (errorCallback) errorCallback((error as Error)?.message)
		}
	}

	return { data, isLoading, claimPromotion }
}
