import { useBankInfoQuery } from 'JF-api/account/queries'

// 單獨取 bankInfo 的擴充 hook
const useGetBankInfo = () => {
	const {
		data: { data: bankInfo } = {},
		isFetching,
		isError,
	} = useBankInfoQuery()
	return {
		bankInfo,
		isLoading: isFetching,
		isError,
	}
}

export { useGetBankInfo }
