import React from 'react'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import { getStaticMaintenance } from 'JF-api/maintenance/server'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { paths } from 'JF-constants'
import { useServerTranslation } from '@brand01/src/i18n'

dayjs.extend(utc)
dayjs.extend(timezone)

export default async function MaintenancePage({
	params: { locale },
}: {
	params: {
		locale: string
	}
}) {
	const response = await getStaticMaintenance('NOVA88')
	const { t } = await useServerTranslation(locale)
	// get current url in server component
	const headersList = headers()
	const currentDomain = headersList.get('x-forwarded-host') || ''

	const {
		Maintain,
		DateTimeStart,
		DateTimeEnd,
		ExcludeDomain = [],
	} = response || {}

	const startDateUTC = dayjs.utc(DateTimeStart)
	const endDateUTC = dayjs.utc(DateTimeEnd)

	// Format the dates to only show the time
	const startTime = startDateUTC.format('HH:mm')
	const endTime = endDateUTC.format('HH:mm')

	const currentTimezone = dayjs.tz.guess()

	// Get the current time with timezone
	const currentTime = dayjs()

	// Get the offset in minutes
	const offsetInMinutes = currentTime.tz(currentTimezone).utcOffset()

	// Convert offset to hours and format it like (GMT+8)
	const offsetHours = offsetInMinutes / 60
	const formattedOffset = `GMT${offsetHours >= 0 ? '+' : ''}${offsetHours}`

	// * 當前 domain 是否匹配 ExcludeDomain 的任何一組 domain，匹配則不進入維護頁
	// * ExcludeDomain 可讓後端決定指定 domain 是否可跳過維護邏輯
	const isExcludeDomain = ExcludeDomain.some(
		domain => !!currentDomain.match(domain),
	)

	if (isExcludeDomain) {
		return
	}

	// * 如果該頁面結束維護，回首頁
	if (!Maintain) {
		redirect(paths.home.root)
	}

	return (
		<div className='md:p-15 flex max-w-7xl flex-1 flex-col items-center justify-center gap-4 p-5 sm:p-10 lg:p-20'>
			<div className='relative flex flex-1 flex-col items-center text-white'>
				<div className="h-[20rem] w-full bg-[url('/img/errorpage/upgrade.png')] bg-contain bg-center bg-no-repeat sm:h-[30rem] md:h-[35rem] lg:h-[40rem]"></div>
				<div className='sm:-mt-15 -mt-8 flex flex-col items-center gap-4 md:-mt-20 lg:-mt-28'>
					<h3 className='text-xl sm:text-2xl md:text-3xl'>
						{t('Label_Static_Maintenance_SimplePlay_Fantasy_Goddess')}
					</h3>
					<h2 className='text-3xl font-black sm:text-4xl md:text-5xl'>
						{t('Label_Static_Maintenance_Server_Upgrade')}
					</h2>
					<h4 className='text-warning-300 gap-1 text-2xl sm:text-xl md:text-2xl'>
						{t('Label_Static_Maintenance_Performing_Maintenance')}
						<br />
						<span>{`${startTime}～${endTime} ( ${formattedOffset} )`}</span>
					</h4>
					<p className='text-md m-0 text-center leading-6 sm:text-base md:text-lg '>
						{t('Label_Static_Maintenance_Dear_Valued_Customers')},
						<br />
						{t('Label_Static_Maintenance_Notification_1')}
						<br />
						{t('Label_Static_Maintenance_Notification_2')}
						<br />
						{t('Label_Static_Maintenance_Notification_3')}
						<br />
						{t('Label_Static_Maintenance_Notification_4')}
					</p>
				</div>
			</div>
		</div>
	)
}
