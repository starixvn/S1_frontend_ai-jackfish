'use server'

import { fetcher } from '../baseApi'
import { TAnnouncementData, IGetAnnouncementPayload } from './type'
import { cookies } from 'next/headers'

const messageApiUrl = {
	announcement: 'Message/GetAnnouncement',
}

export const getAnnouncement = async () => {
	const cookieStore = cookies()
	const langId = cookieStore.get('i18next')?.value
	// TODO currencyId目前沒有存在cookie?
	const data = await fetcher<TAnnouncementData[], IGetAnnouncementPayload>(
		`${messageApiUrl.announcement}/${langId}`,
		{
			currencyId: 4,
		},
	)
	return data?.data
}
