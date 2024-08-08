import { useGetReferralCode } from 'JF-api/account/client'
import { paths } from 'JF-constants'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import ReferralLinks from './referralLinks'
import ReferralSteps from './referralSteps'

const ReferralInfo: React.FC = () => {
	const { referralCode = '', isLoading } = useGetReferralCode()

	const origin = (typeof window !== 'undefined' && window.location.origin) || ''
	const referralLink = referralCode
		? `${origin}${paths.join.root}?AffId=${referralCode}`
		: ''

	const { register, setValue } = useForm<{
		referralCode: string
		referralLink: string
	}>()

	useEffect(() => {
		setValue('referralCode', referralCode)
		setValue('referralLink', referralLink)
	}, [referralCode, referralLink, setValue])

	return (
		<div className='mt-8 grid grid-cols-1 gap-8 lg:mt-16 lg:grid-cols-2'>
			<ReferralSteps />
			<ReferralLinks
				referralLink={referralLink}
				register={register}
				isLoading={isLoading}
			/>
		</div>
	)
}

export default ReferralInfo
