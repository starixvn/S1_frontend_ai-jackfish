import Loading from '@brand01/src/components/loading'
import Modal from '@brand01/src/components/modal'
import { useGetReferralSettingDetail } from 'JF-api/account/client'
import { imageUrl } from 'JF-core'
import useDisclosure from 'libs/core/src/lib/hooks/useDisclosure'

interface IReferralBannerProps {
	locale: string
}

const ReferralBanner: React.FC<IReferralBannerProps> = ({ locale }) => {
	const { isOpen, onClose, onOpen } = useDisclosure()
	const { referralSettingDetail, isLoading } = useGetReferralSettingDetail()
	const { referralContent } = referralSettingDetail ?? {}
	return (
		<>
			<div className='w-full cursor-pointer' onClick={onOpen}>
				<picture>
					<source
						media='(min-width: 1024px)'
						srcSet={imageUrl(`/img/referral/referral-banner-${locale}.jpg`)}
					/>
					<img
						className='w-full lg:rounded-b-[50px]'
						src={imageUrl(`/img/referral/referral-banner-mobile-${locale}.jpg`)}
						alt='referral-banner'
					/>
				</picture>
			</div>
			<Modal size='lg' isOpen={isOpen} onClose={onClose} closeOnOverlayClick>
				{isLoading ? (
					<Loading className='h-[70vh] bg-transparent' />
				) : (
					<>
						{referralContent?.bannerUrl && (
							<img
								className='w-full rounded-2xl'
								src={referralContent?.bannerUrl}
								alt='referral-detail-banner'
							/>
						)}
						<div className='text-check-200 mt-2 w-full text-xl font-bold'>
							{referralContent?.title}
						</div>
						<div className='w-full font-semibold text-neutral-300'>
							{referralContent?.description}
						</div>
						{referralContent?.detail && (
							<div
								className='mt-2.5'
								dangerouslySetInnerHTML={{
									__html: referralContent?.detail,
								}}
							/>
						)}
					</>
				)}
			</Modal>
		</>
	)
}

export default ReferralBanner
