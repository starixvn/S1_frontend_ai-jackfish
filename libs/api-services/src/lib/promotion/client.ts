import {
	IDepositPromotionData,
	ISetDepositPromotionQueueArgs,
} from 'JF-api/promotion/type'
import { promotionApiUrl } from 'JF-api/promotion/url'
import useSWR from 'swr'
import { IAxiosError, IAxiosResponse, fetcher } from '../baseApi'

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

export const setDepositPromotionQueue = async ({
	...args
}: ISetDepositPromotionQueueArgs) => {
	try {
		return await fetcher<null, ISetDepositPromotionQueueArgs>(
			promotionApiUrl.setDepositPromotionQueue,
			args,
		)
	} catch (error) {
		throw error as IAxiosError
	}
}
