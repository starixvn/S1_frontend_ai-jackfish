'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import dayjs from 'dayjs'
import { THotEventData } from 'JF-api/hotEvent/type'
import { cn, LocaleLink } from 'JF-core'
import { paths } from 'libs/constants/src/lib/paths'
import { dateFormat, timeFormat } from 'libs/constants/src/lib/timeFormat'
import React from 'react'

const HotMatchItem: React.FC<{ hotMatchData: THotEventData }> = ({
	hotMatchData,
}: {
	hotMatchData: THotEventData
}) => {
	const { t } = useClientTranslation()
	const formatHdp = (hdp: number) => {
		if (hdp === 0) return hdp

		return `${hdp > 0 ? '+' : ''}${hdp}`
	}

	const {
		sportLeaguesTitle,
		homeTeamPic,
		homeTeamName,
		awayTeamPic,
		awayTeamName,
		battleTime,
		tpId,
		matchId,
		gameId,
		awayOdds = 0,
		homeOdds = 0,
		handicap = 0,
	} = hotMatchData

	const date = dayjs(battleTime).format(dateFormat)
	const time = dayjs(battleTime).format(timeFormat)

	const homeTeamHandicap = formatHdp(handicap)
	const awayTeamHandicap = formatHdp(handicap * -1)

	const searchParams = new URLSearchParams({
		tpId,
		matchId: matchId ? String(matchId) : '',
		gameId,
	})

	return (
		<>
			<div className='w-full rounded-t-[20px] bg-white px-5 pb-3'>
				<div className='flex w-full items-center justify-between pt-4'>
					<span className='whitespace-nowrap font-semibold'>
						{sportLeaguesTitle}
					</span>
					<div className='flex gap-2 text-xs font-medium'>
						<span>{date}</span>
						<span>{time}</span>
					</div>
				</div>
				<div
					className={cn(
						'h-1 w-20 [clip-path:polygon(0_0,100%_0,100%_100%,6%_100%)]',
						'from-secondary-500 bg-gradient-to-r to-white',
					)}
				/>
				<div className='mt-2.5 grid gap-2.5'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<img
								className='w-9 rounded-full border-2 border-solid border-gray-600 p-1'
								src={homeTeamPic}
								alt='homeTeamPic'
							/>
							<span className='line-clamp-2 max-w-32 break-words text-sm'>
								{homeTeamName}
							</span>
						</div>
						<div className='flex h-7 w-[20vw] items-center justify-between rounded-full bg-gray-100 px-4 text-xs font-semibold lg:w-28'>
							<span>{homeTeamHandicap}</span>
							<span className='text-primary-600'>{homeOdds}</span>
						</div>
					</div>
					<div className='flex items-center justify-between'>
						<div className='flex items-center gap-2'>
							<img
								className='w-9 rounded-full border-2 border-solid border-gray-600 p-1'
								src={awayTeamPic}
								alt='awayTeamPic'
							/>
							<span className='line-clamp-2 max-w-32 break-words text-sm'>
								{awayTeamName}
							</span>
						</div>
						<div className='flex h-7 w-[20vw] items-center justify-between rounded-full bg-gray-100 px-4 text-xs font-semibold lg:w-28'>
							<span>{awayTeamHandicap}</span>
							<span className='text-primary-600'>{awayOdds}</span>
						</div>
					</div>
				</div>
			</div>
			<LocaleLink href={`${paths.sports.root}/?${searchParams.toString()}`}>
				<button className='bg-secondary-500 h-10 w-full rounded-b-[20px] text-center text-sm font-medium text-white'>
					{t('Label_General_BetNow')}
				</button>
			</LocaleLink>
		</>
	)
}

export default HotMatchItem
