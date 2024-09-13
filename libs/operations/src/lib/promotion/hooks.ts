import { useClientTranslation } from '@brand01/src/i18n/client'
import { envCookieNames } from '@brand01/src/i18n/settings'
import {
	getDepositPromotionList,
	getPromotionDetail,
	getPromotionListV3,
	getSpecialPromotionList,
	setClaimPromotion,
	setSpecialCode,
} from 'JF-api/promotion/client'
import { PromotionType } from 'JF-api/promotion/type'
import { promotionApiUrl } from 'JF-api/promotion/url'
import { DeviceTypeEnum } from 'JF-constants'
import { useAuthStore } from 'JF-operations'
import dayjs from 'dayjs'
import { concat, every, filter, includes } from 'lodash-es'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
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
	const {
		data: { data: promotionList = [] } = {},
		isLoading: isLoadingPromotionList,
	} = useSWR(
		{
			url: promotionApiUrl.getPromotionListV3,
			args: { langId, currencyId, deviceType },
		},
		({ args }) => getPromotionListV3(args),
	)

	const {
		data: { data: specialPromotionList = [] } = {},
		isLoading: isLoadingSpecialPromotionList,
	} = useSWR(
		{
			url: promotionApiUrl.getPromotionListV3,
			args: { langId, currencyId, deviceType },
		},
		({ args }) => getSpecialPromotionList(args),
	)

	const joinedPromotionList = concat(promotionList, specialPromotionList)

	const filteredList = filter(
		joinedPromotionList,
		({ isJoin, promotionType, custExpiryTime, periodTo }) => {
			if (
				isJoin &&
				!includes([PromotionType.Rebate, PromotionType.Cashback], promotionType)
			) {
				return dayjs().isBefore(dayjs(custExpiryTime))
			}
			return dayjs().isBefore(dayjs(dayjs.unix(periodTo)))
		},
	)

	return {
		data: filteredList,
		isLoading: isLoadingPromotionList || isLoadingSpecialPromotionList,
	}
}

export const useActivePromotionList = () => {
	const { data: originalPromotionList, isLoading } = usePromotionList()

	const data = filter(originalPromotionList, ({ isJoin }) => isJoin)

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

			// 依 Nova88 原有邏輯，是 canJoin 才要求輸入金額，若非 canJoin 則送 API 拿錯誤訊息
			if (amountCallback && data.canJoin && isAmountRequired && !amount) {
				amountCallback()
				return
			}

			const lockedAmount = amount ?? data.maxAmount ?? 0
			await setClaimPromotion({ langId, deviceType, bonusCode, lockedAmount })
			mutate()
			if (successCallback) successCallback()
		} catch (error) {
			const { message } = error as Error
			if (errorCallback && message) errorCallback((error as Error)?.message)
		}
	}

	return { data, isLoading, claimPromotion }
}

export const useDepositPromotionList = () => {
	const { langId } = useLocale()
	const { data, isLoading } = useSWR(
		{
			url: promotionApiUrl.getDepositPromotionList,
			args: { langId, deviceType },
		},
		({ args }) => getDepositPromotionList(args),
	)

	return {
		depositPromotionList: data?.data,
		isLoading,
	}
}

export const useSetSpecialCode = ({
	errorCallback,
	successCallback,
}: {
	errorCallback?: (message: string) => void
	successCallback?: () => void
}) => {
	const { langId } = useLocale()
	const [isSubmitting, setIsSubmitting] = useState(false)
	const form = useForm<{ specialCode: string }>()
	const handleFormSubmit = form.handleSubmit(
		async ({ specialCode }: { specialCode: string }) => {
			try {
				setIsSubmitting(true)
				if (!specialCode) throw new Error()
				await setSpecialCode({
					langId,
					deviceType,
					specialCode,
				})
				if (successCallback) successCallback()
			} catch (error) {
				const { message } = error as Error
				if (errorCallback && message) errorCallback(message)
			} finally {
				setIsSubmitting(false)
			}
		},
	)

	return { form, handleFormSubmit, isSubmitting }
}
