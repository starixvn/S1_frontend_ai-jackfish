'use server'

import { cookies } from 'next/headers'
import { fetcher } from '../baseApi'
import { IGetAnnouncementPayload, TAnnouncementData } from './type'
import { messageApiUrl } from './url'

export const getAnnouncement = async () => {
	const cookieStore = cookies()
	const langId = cookieStore.get('i18next')?.value
	const data = await fetcher<TAnnouncementData[], IGetAnnouncementPayload>(
		`${messageApiUrl.announcement}/${langId}`,
		{
			currencyId: 4,
		},
	)
	return data?.data
}
