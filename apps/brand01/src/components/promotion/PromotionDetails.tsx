'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { PromotionType, TPromotionData } from 'JF-api/promotion/type'
import { useSocialChannelStore } from 'JF-operations'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { includes } from 'lodash-es'
import { FC, useState } from 'react'
import { MoonLoader } from 'react-spinners'
import Button from '../button'
import PromotionCard from './PromotionCard'

dayjs.extend(isBetween)

interface PromotionDetailsProps {
	data: TPromotionData
	onClaim: () => void | Promise<void>
}

const PromotionDetails: FC<PromotionDetailsProps> = ({ data, onClaim }) => {
	const { t } = useClientTranslation()
	const [isLoading, setIsLoading] = useState(false)
	const { lineChannel } = useSocialChannelStore()

	if (!data) return t('Label_General_NoData')

	const isWithinPromotionPeriod = dayjs().isBetween(
		dayjs.unix(data.periodFrom),
		dayjs.unix(data.periodTo),
	)

	const isJoinButton =
		isWithinPromotionPeriod &&
		!(
			data.isJoin ||
			data.beenUsed ||
			data.promotionType === PromotionType.Rebate ||
			data.promotionType === PromotionType.SpecialBonus
		)

	const isClaimNowButton = includes(
		[PromotionType.Cashback, PromotionType.RetentionFreeBet],
		data.promotionType,
	)

	const isApplyNowButton = data.promotionType === PromotionType.SpecialBonus

	const onClaimClick = async () => {
		setIsLoading(true)
		await onClaim()
		setIsLoading(false)
	}

	return (
		<div className='flex h-full flex-col'>
			<div className='mb-8 text-center text-xl lg:hidden'>
				{t('Label_General_Promotion')}
			</div>
			<main className='flex-1 overflow-auto'>
				<h1 className='text-secondary-300 text-xl font-bold'>{data.title}</h1>
				<div className='mt-4 w-full overflow-hidden rounded-2xl'>
					{data.banner && <PromotionCard image={data.banner} />}
				</div>
				{data.details && (
					<div
						className='mt-6 lg:mt-4'
						dangerouslySetInnerHTML={{ __html: data.details }}
					/>
				)}
			</main>
			<footer className='mt-4 flex justify-center'>
				{isJoinButton && (
					<Button
						type='secondary'
						size='md'
						onClick={onClaimClick}
						isDisabled={isLoading}
					>
						{isLoading ? (
							<MoonLoader size={16} className='bg-transparent' />
						) : isClaimNowButton ? (
							t('Label_Promotion_ClaimNow')
						) : (
							t('Label_Promotion_JoinNow')
						)}
					</Button>
				)}
				{isApplyNowButton && (
					<a href={lineChannel.link} target='_blank' rel='noreferrer'>
						<Button type='secondary' size='md'>
							{t('Label_Promotion_ApplyNow')}
						</Button>
					</a>
				)}
			</footer>
		</div>
	)
}

export default PromotionDetails
