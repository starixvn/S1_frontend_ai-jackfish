'use client'

import ReferralInfo from './referralInfo'
import ReferralStatus from './referralStatus'

const Referral = () => {
	return (
		<div className='mt-8 w-full cursor-default p-5 lg:mt-10'>
			<ReferralStatus />
			<ReferralInfo />
		</div>
	)
}

export default Referral
