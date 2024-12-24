import {
	TWithdrawalRecentInfoData,
	WithdrawalStatusEnum,
} from 'JF-api/payment/type'
import { find } from 'lodash-es'
import { useMemo } from 'react'
import { useWithdrawalBasicQueries } from '../queries'

// 撈取執行中的 withdrawal 單，一次只能送一張單的 site 會需要此資訊做判斷
const useRunningRequest = (): TWithdrawalRecentInfoData | undefined => {
	const {
		recentInfoQuery: { data: { data: recentInfo = [] } = {} },
	} = useWithdrawalBasicQueries()

	return useMemo(() => {
		return find(recentInfo, item => {
			const { status, canCancel } = item
			return (
				(canCancel && status === WithdrawalStatusEnum.Pending) ||
				status === WithdrawalStatusEnum.ToKyc
			)
		})
	}, [recentInfo])
}

export { useRunningRequest }
