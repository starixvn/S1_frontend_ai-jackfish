import Input from '@brand01/src/components/input'
import { socialMedias } from '@brand01/src/data/referral'
import { TFunction } from 'i18next'
import { imageUrl } from 'JF-core'
import QRCode from 'qrcode.react'
import { UseFormRegister } from 'react-hook-form'

interface IReferralLinksProps {
	referralLink: string
	register: UseFormRegister<{
		referralCode: string
		referralLink: string
	}>
	isLoading: boolean
	t: TFunction<string, undefined>
}

const ReferralLinks: React.FC<IReferralLinksProps> = ({
	referralLink,
	register,
	isLoading,
	t,
}) => {
	return (
		<div className='flex w-full flex-col'>
			<div className='text-check-200 text-center text-lg font-bold lg:text-left lg:text-xl'>
				{t('Label_Referral_YourLinkInvite').toUpperCase()}
			</div>
			<div className='mt-6 grid gap-1.5 lg:gap-2.5'>
				<div className='text-check-200 text-center text-sm font-bold lg:text-left lg:text-base'>
					{t('Label_Referral_ReferralCode').toUpperCase()}
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
					{t('Label_Referral_ReferralLink').toUpperCase()}
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
	)
}

export default ReferralLinks
