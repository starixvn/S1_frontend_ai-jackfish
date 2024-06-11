import useSWR from 'swr'
import { fetcher, IAxiosResponse } from '../baseApi'
import { IUserInfoData } from './type'

export const accountStrictApiUrl = {
	getCustProfile: 'AccountStrict/GetCustProfile',
	getOTPVerifyInfo: 'AccountStrict/GetOTPVerifyInfo',
	sendOTPEmail: 'AccountStrict/SendOTPEmail',
	sendOTPSMS: 'AccountStrict/SendOTPSMS',
	verifyOTP: 'AccountStrict/VerifyOTP',
	SetProfile: 'AccountStrict/SetProfile',
	setProfileAddress: 'AccountStrict/SetProfileAddress',
	setCustCryptoWallet: 'AccountStrict/SetCustCryptoWallet',
	deleteBankCard: 'AccountStrict/DelCustBankInfo',
	deleteEWalletCard: 'AccountStrict/DelCustEWalletInfo',
	setLocalBankInfo: 'AccountStrict/SetCustBankInfo',
	setEWalletInfo: 'AccountStrict/SetCustEWalletInfo',
	uploadCustPhoto: 'AccountStrict/UploadCustPhotoId',
	resetPassword: 'AccountStrict/ResetPassword',
	verifyEmail: 'AccountStrict/VerifyEmail',
}

export const getUserInfo = async () => {
	return await fetcher<IUserInfoData>(accountStrictApiUrl.getCustProfile)
}

// 用 useSWR 封裝，不一定使用得到
export const useCustProfile = () => {
	const { data, isLoading } = useSWR<IAxiosResponse<IUserInfoData>>(
		accountStrictApiUrl.getCustProfile,
		(url: string) => fetcher<IUserInfoData>(url),
	)
	return {
		profile: data?.data,
		isLoading,
	}
}
