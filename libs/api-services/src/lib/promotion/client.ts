import useSWR from 'swr'
import { fetcher, IAxiosResponse } from '../baseApi'
import {
	IGetPromotionBaseArgs,
	IGetPromotionDetailArgs,
	IGetPromotionListArgs,
	IGetRebateExcludeGameListArgs,
	ISetClaimPromotionArgs,
	ISetDepositPromotionQueueArgs,
	ISetSpecialCodeArgs,
	TDepositPromotionData,
	TPromotionBonusData,
	TPromotionData,
	TRebateExcludeGameData,
} from './type'
import { promotionApiUrl } from './url'

export const getPromotionListV3 = ({
	langId,
	...payload
}: IGetPromotionListArgs) =>
	fetcher<TPromotionData[]>(
		`${promotionApiUrl.getPromotionListV3}/${langId}`,
		payload,
	)

export const getPromotionDetail = ({
	langId,
	...payload
}: IGetPromotionDetailArgs) =>
	fetcher<TPromotionData>(
		`${promotionApiUrl.getPromotionDetail}/${langId}`,
		payload,
	)

export const getRebateExcludeGameList = ({
	langId,
	...payload
}: IGetRebateExcludeGameListArgs) =>
	fetcher<TRebateExcludeGameData[]>(
		`${promotionApiUrl.getRebateExcludeGameList}/${langId}`,
		payload,
	)

export const getSpecialPromotionList = ({
	langId,
	...payload
}: IGetPromotionBaseArgs) =>
	fetcher<TPromotionData[]>(
		`${promotionApiUrl.getSpecialPromotionList}/${langId}`,
		payload,
	)

export const getDepositPromotionList = ({
	langId,
	...payload
}: IGetPromotionBaseArgs) =>
	fetcher<TDepositPromotionData[]>(
		`${promotionApiUrl.getDepositPromotionList}/${langId}`,
		payload,
	)

export const setSpecialCode = ({ langId, ...payload }: ISetSpecialCodeArgs) =>
	fetcher<void>(`${promotionApiUrl.setSpecialCode}/${langId}`, payload)

export const setClaimPromotion = ({
	langId,
	...payload
}: ISetClaimPromotionArgs) =>
	fetcher<void>(`${promotionApiUrl.setClaimPromotion}/${langId}`, payload)

export const setDepositPromotionQueue = ({
	langId,
	...payload
}: ISetDepositPromotionQueueArgs) =>
	fetcher<void>(
		`${promotionApiUrl.setDepositPromotionQueue}/${langId}`,
		payload,
	)

export const getPopUpPromotion = ({
	langId,
	...payload
}: IGetPromotionBaseArgs) =>
	fetcher<TPromotionBonusData>(
		`${promotionApiUrl.getPopUpPromotion}/${langId}`,
		payload,
	)

export const getRetentionPromotion = ({
	langId,
	...payload
}: IGetPromotionBaseArgs) =>
	fetcher<TPromotionBonusData>(
		`${promotionApiUrl.getRetentionPromotion}/${langId}`,
		payload,
	)

// to be relocated
export const useDepositPromotionList = ({ langId }: { langId: string }) => {
	const { data, isLoading } = useSWR<IAxiosResponse<TDepositPromotionData[]>>(
		`${promotionApiUrl.getDepositPromotionList}/${langId}`,
		(url: string) =>
			fetcher<TDepositPromotionData[]>(url, {
				deviceType: 1,
			}),
	)
	return {
		depositPromotionList: data?.data,
		isLoading,
	}
}
