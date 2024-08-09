'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { paths } from 'JF-constants'
import { useGetPathname } from 'JF-core'
import Link from 'next/link'

const DepositAndWithdrawalBtn = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	return (
		<>
			<Link
				href={paths.deposit.root}
				className='font-headline text-body-md bg-primary-300 hidden min-w-max rounded-lg px-6 py-2 text-center text-sm font-semibold shadow-md lg:block'
			>
				{t('Label_General_Deposit')}
			</Link>
			<Link
				href={paths.withdrawal.root}
				className='font-headline text-body-md bg-secondary-300 hidden rounded-lg px-6 py-2 text-center text-sm font-semibold shadow-md lg:block'
			>
				{t('Label_General_Withdrawal')}
			</Link>
		</>
	)
}

export default DepositAndWithdrawalBtn
