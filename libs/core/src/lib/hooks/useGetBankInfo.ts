import { getCustBankInfo } from 'JF-api/account/client'
import useSWR from 'swr'

const useGetBankInfo = () => {
	const { data, error } = useSWR('/custBankInfo', getCustBankInfo)
	return {
		bankInfo: data,
		isLoading: !error && !data,
		isError: error,
	}
}

export { useGetBankInfo }
