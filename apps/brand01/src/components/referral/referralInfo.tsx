import Input from '@brand01/src/components/input'
import { referralSteps, socialMedias } from '@brand01/src/data/referral'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { useGetReferralCode } from 'JF-api/account/client'
import { paths } from 'JF-constants'
import { cn, imageUrl, useGetPathname } from 'JF-core'
import { toUpper } from 'lodash-es'
import QRCode from 'qrcode.react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

const ReferralInfo = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	const { referralCode, isLoading } = useGetReferralCode()
	const origin = (typeof window !== 'undefined' && window.location.origin) || ''
	const referralLink = referralCode
		? `${origin}${paths.join.root}?AffId=${referralCode}`
		: ''

	const { register, setValue } = useForm<{
		referralCode: string
		referralLink: string
	}>()

	useEffect(() => {
		setValue('referralCode', referralCode ?? '')
		setValue('referralLink', referralLink)
	}, [referralCode, referralLink, setValue])

	return (
		<div className='mt-8 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2'>
			<div className='flex w-full flex-col'>
				<div className='text-check-200 text-center text-lg font-bold lg:text-left lg:text-xl'>
					{t('Label_Referral_Simple3StepsToShare')}
				</div>
				{referralSteps.map(({ name, subjectLabel, contentLabel }, index) => (
					<div
						className={cn(
							'relative mt-8 grid grid-cols-[auto_1fr] items-center gap-2.5 lg:mt-14',
							{ 'mt-6 lg:mt-6': index === 0 },
						)}
						key={name}
					>
						<img
							className='h-[3.75rem] w-[3.75rem] lg:h-[4.375rem] lg:w-[4.375rem]'
							src={imageUrl(`/img/icon/referral/icon-${name}.png`)}
							alt={name}
						/>
						{index !== referralSteps.length - 1 && (
							<img
								className='absolute top-12 left-7 h-14 w-1 lg:top-[4.4rem] lg:left-8'
								src={imageUrl('/img/dash-line.png')}
								alt='dash-line'
							/>
						)}
						<div className='grid'>
							<div className='text-check-200 text-base font-bold'>
								{toUpper(t(subjectLabel) || '')}
							</div>
							<div className='text-xs lg:text-sm'>{t(contentLabel)}</div>
						</div>
					</div>
				))}
			</div>
			<div className='flex w-full flex-col'>
				<div className='text-check-200 text-center text-lg font-bold lg:text-left lg:text-xl'>
					{toUpper(t('Label_Referral_YourLinkInvite') || '')}
				</div>
				<div className='mt-6 grid gap-1.5 lg:gap-2.5'>
					<div className='text-check-200 text-center text-sm font-bold lg:text-left lg:text-base'>
						{toUpper(t('Label_Referral_ReferralCode') || '')}
					</div>
					<Input
						divClassName='lg:w-96'
						className='h-9 rounded-full border-none px-4 text-left text-xs text-neutral-400'
						register={register('referralCode')}
						dirty={false}
						isMessagesHide
						readOnly
						copy
					/>
				</div>
				<div className='mt-4 grid gap-1.5 lg:gap-2.5'>
					<div className='text-check-200 text-center text-sm font-bold lg:text-left lg:text-base'>
						{toUpper(t('Label_Referral_ReferralLink') || '')}
					</div>
					<Input
						divClassName='lg:w-96'
						className='h-9 rounded-full border-none px-4 text-left text-xs text-neutral-400'
						register={register('referralLink')}
						dirty={false}
						isMessagesHide
						readOnly
						copy
					/>
				</div>
				<div className='mt-5 grid justify-center gap-2.5 lg:justify-start'>
					<div className='text-check-200 text-sm font-bold lg:text-base'>
						QR CODE
					</div>
					{!isLoading && <QRCode value={referralLink} size={70} />}
				</div>
				<div className='mt-5 grid justify-center gap-2.5 lg:justify-start'>
					<div className='text-check-200 text-sm font-bold lg:text-base'>
						{t('Label_Referral_ShareAcrossSocialMedia')}
					</div>
					<div className='flex items-center justify-center gap-4 lg:justify-start'>
						{socialMedias.map(({ name, url }) => {
							const href = url
								.replace('{{ref_url}}', referralLink)
								.replace('{{text}}', t('Label_Referral_Welcome'))
							return (
								<a key={name} href={href} target='_blank'>
									<img
										className='h-6 w-6 lg:h-8 lg:w-8'
										src={imageUrl(`/img/icon/socialmedia/icon-${name}.svg`)}
										alt={name}
									/>
								</a>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ReferralInfo
