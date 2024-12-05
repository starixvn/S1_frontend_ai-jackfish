'use client'
import { paths } from 'JF-constants'
import { useAuthStore } from 'JF-operations'
import { isNumber, trim } from 'lodash-es'
import useSWR from 'swr'
import { IAxiosError, IAxiosResponse, fetcher } from '../baseApi'
import {
	BannerActionEnum,
	BannerTypeEnum,
	IExistsPhoneNoArgs,
	IGetNumberCaptchaArgs,
	IResetPwdByOTPArgs,
	IResetPwdByPhoneArgs,
	ISignUpPhoneArgs,
	ISignUpUserNameArgs,
	ISocialChannelArgs,
	IVerifyOTPArgs,
	TBannerData,
	TGetNumberCaptchaData,
	TIpCountryData,
	TRecaptchaInfoData,
	TSocialChannelData,
	type TTpMaintainData,
} from './type'
import { siteApiUrl } from './url'

export const getTpMaintainList = () => {
	const { data: { data: tpMaintainList } = {}, isLoading } = useSWR<
		IAxiosResponse<TTpMaintainData>
	>(siteApiUrl.getTpMaintainList, (url: string) =>
		fetcher<TTpMaintainData>(url),
	)
	return {
		tpMaintainList: tpMaintainList,
		isLoading,
	}
}

export const getBanner = () => {
	const { userInfo } = useAuthStore()
	const { data, isLoading } = useSWR<IAxiosResponse<TBannerData[]>>(
		userInfo?.langId ? `${siteApiUrl.getBanner}/${userInfo?.langId}` : null,
		(url: string) =>
			fetcher<TBannerData[]>(url, {
				currencyId: userInfo?.currencyId,
				bannerType: BannerTypeEnum.Main,
			}),
	)
	const newBannerData = data?.data.map(
		(
			{ actionMode, bonusCode, urlRouter, tpId, tpGameType, gameId, ...rest },
			index,
		) => {
			let redirectLink = null
			if (actionMode === BannerActionEnum.GoToBonus) {
				redirectLink = `${paths.promotion.root}?bonusCode=${bonusCode}`
			} else if (actionMode === BannerActionEnum.RedirectPageOfThisSite) {
				let params = `?tpId=${tpId}`
				if (urlRouter === paths.slots.root) {
					params += isNumber(tpGameType)
						? `&tpGameType=${tpGameType}`
						: '&tpGameType=undefined'
				}
				// * 目前沒有sports頁面
				// else if (urlRouter === paths.sports.root) {
				// 	params += gameId ? `&gameId=${gameId}` : ''
				// }
				redirectLink = `${urlRouter}${params}`
			}

			// * 目前沒有rewards頁面
			// if (redirectLink && redirectLink === paths.rewards.root) {
			// 	redirectLink = `${
			// 		process.env.NODE_ENV === 'production'
			// 			? window.location.origin
			// 			: process.env['NEXT_PUBLIC_OPEN_URL']
			// 	}${redirectLink}`
			// }

			return {
				actionMode,
				bonusCode,
				urlRouter,
				tpId,
				tpGameType,
				gameId,
				...rest,
				redirectLink,
				itemKey: `${index}-${tpGameType}-${tpId}`,
			}
		},
	) as TBannerData[]
	return {
		bannerData: newBannerData,
		isLoading,
	}
}

export const signUpPhone = async ({
	phoneNo,
	userpwd,
	...rest
}: ISignUpPhoneArgs) => {
	try {
		const data = await fetcher<null, ISignUpPhoneArgs>(siteApiUrl.signUpPhone, {
			phoneNo: trim(phoneNo),
			userpwd: trim(userpwd),
			...rest,
		})
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}

export const affiliateCheck = async ({ affCode }: { affCode: string }) => {
	try {
		const data = await fetcher<null, { affCode: string }>(
			siteApiUrl.affiliateCheck,
			{
				affCode,
			},
		)
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}

export const getAffiliateAgent = async ({ affId }: { affId: string }) => {
	try {
		const data = await fetcher<
			{ currencyId: number },
			{
				affId: string
			}
		>(siteApiUrl.getAffiliateAgent, {
			affId,
		})
		return data?.data
	} catch (error) {
		return { currencyId: null }
	}
}

export const existsPhoneNo = async ({ ...args }: IExistsPhoneNoArgs) => {
	try {
		const data = await fetcher<boolean, IExistsPhoneNoArgs>(
			siteApiUrl.existsPhoneNo,
			args,
		)
		return data?.data
	} catch (error) {
		return true
	}
}

export const resetPwdByOTP = async ({ ...args }: IResetPwdByOTPArgs) => {
	try {
		const data = await fetcher<null, IResetPwdByOTPArgs>(
			siteApiUrl.reSetPwdByOTP,
			args,
		)
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}

export const resetPwdByPhone = async ({ ...args }: IResetPwdByPhoneArgs) => {
	try {
		const data = await fetcher<null, IResetPwdByPhoneArgs>(
			siteApiUrl.reSetPwdByPhone,
			args,
		)
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}

export const verifyOTP = async ({ ...args }: IVerifyOTPArgs) => {
	try {
		const data = await fetcher<null, IVerifyOTPArgs>(siteApiUrl.verifyOTP, args)
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}

export const getSocialChannel = async ({ ...args }: ISocialChannelArgs) => {
	try {
		const data = await fetcher<TSocialChannelData[], ISocialChannelArgs>(
			siteApiUrl.getSocialChannel,
			args,
		)
		return data?.data
	} catch (error) {
		return []
	}
}

export const useGetIpCountry = () => {
	const { data: { data: ipCountryData } = {}, isLoading } = useSWR<
		IAxiosResponse<TIpCountryData>
	>(siteApiUrl.getIpCountry, (url: string) => fetcher<TIpCountryData>(url))
	return { ipCountryData, isLoading }
}

export const signUpUserName = async ({
	langId,
	...args
}: ISignUpUserNameArgs) => {
	try {
		const data = await fetcher<void>(`${siteApiUrl.signup}/${langId}`, args)
		return data
	} catch (error) {
		throw error as IAxiosError
	}
}

export const existsUserName = async ({
	userName,
	langId,
}: {
	userName: string
	langId: string
}) => {
	try {
		const data = await fetcher<boolean, { userName: string }>(
			`${siteApiUrl.existsUserName}/${langId}`,
			{ userName },
		)
		return data
	} catch (error) {
		return { data: true, message: (error as Error).message }
	}
}

export const existsEmail = async ({ email }: { email: string }) => {
	try {
		const data = await fetcher<boolean, { email: string }>(
			siteApiUrl.existsEmail,
			{ email },
		)
		return data
	} catch (error) {
		return { data: true, message: (error as Error).message }
	}
}

export const useGetSiteCurrencyList = () => {
	const { data: { data: siteCurrencyList } = {}, isLoading } = useSWR<
		IAxiosResponse<number[]>
	>(siteApiUrl.getSiteCurrencyList, (url: string) => fetcher<number[]>(url))
	return {
		siteCurrencyList,
		isLoading,
	}
}

export const getRecaptchaInfo = async () => {
	try {
		const data = await fetcher<TRecaptchaInfoData, null>(
			siteApiUrl.getRecaptchaInfo,
		)
		return data?.data
	} catch (error) {
		return null
	}
}

export const getNumberCaptcha = async (args: IGetNumberCaptchaArgs) => {
	try {
		const data = await fetcher<TGetNumberCaptchaData, IGetNumberCaptchaArgs>(
			siteApiUrl.getNumberCaptcha,
			args,
		)
		return data?.data
	} catch (error) {
		return null
	}
}
// TODO signUpUserName 時要 getNumberCaptcha
