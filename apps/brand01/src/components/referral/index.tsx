'use client'

import ReferralBanner from './referralBanner'
import ReferralInfo from './referralInfo'
import ReferralStatus from './referralStatus'

const Referral: React.FC = () => {
	return (
		<div className='mb-10 w-full cursor-default'>
			<ReferralBanner />
			<ReferralStatus />
			<ReferralInfo />
		</div>
	)
}

export default Referral
