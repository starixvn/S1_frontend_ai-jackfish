'use client'
import { useAuthStore } from 'JF-operations'
import useSWR from 'swr'
import { IAxiosResponse, fetcher } from '../baseApi'
import { TAnnouncementData } from './type'
import { messageApiUrl } from './url'

export const getAnnouncement = () => {
	const { userInfo } = useAuthStore()
	const { data: { data: announcementData } = {}, isLoading } = useSWR<
		IAxiosResponse<TAnnouncementData[]>
	>(
		userInfo.langId ? `${messageApiUrl.announcement}/${userInfo.langId}` : null,
		(url: string) =>
			fetcher<TAnnouncementData[]>(url, {
				currencyId: userInfo.currencyId,
			}),
	)
	return {
		announcementData,
		isLoading,
	}
}
