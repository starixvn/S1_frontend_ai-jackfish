import { useBankInfoQuery } from 'JF-api/account/queries'

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
