'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { useGetPathname } from 'JF-core'
import ReferralBanner from './referralBanner'
import ReferralInfo from './referralInfo'
import ReferralStatus from './referralStatus'

const Referral: React.FC = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	return (
		<div className='mb-10 w-full cursor-default'>
			<ReferralBanner locale={locale} />
			<ReferralStatus t={t} />
			<ReferralInfo t={t} />
		</div>
	)
}

export default Referral
