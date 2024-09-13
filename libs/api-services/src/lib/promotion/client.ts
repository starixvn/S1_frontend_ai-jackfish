import {
	IDepositPromotionData,
	ISetDepositPromotionQueueArgs,
} from 'JF-api/promotion/type'
import { promotionApiUrl } from 'JF-api/promotion/url'
import useSWR from 'swr'
import { IAxiosResponse, fetcher } from '../baseApi'

export const getDepositPromotionList = ({ langId }: { langId: string }) => {
	const { data, isLoading } = useSWR<IAxiosResponse<IDepositPromotionData[]>>(
		`${promotionApiUrl.getDepositPromotionList}/${langId}`,
		(url: string) =>
			fetcher<IDepositPromotionData[]>(url, {
				deviceType: 1,
			}),
	)
	return {
		depositPromotionList: data?.data,
		isLoading,
	}
}

export const setDepositPromotionQueue = ({
	langId,
	...payload
}: ISetDepositPromotionQueueArgs) =>
	fetcher<void>(
		`${promotionApiUrl.setDepositPromotionQueue}/${langId}`,
		payload,
	)
