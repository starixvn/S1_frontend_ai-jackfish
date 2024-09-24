'use client'
import { Nav_Links } from '@brand01/src/data/layout/header'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { LocaleLink, cn, useGetPathname } from 'JF-core'

const DepositLeft = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	return (
		<>
			{Nav_Links.map(value => {
				const { displayKey, pathname, icon } = value
				return (
					<div key={displayKey} className='hidden text-neutral-100 lg:block'>
						<LocaleLink
							href={pathname}
							className={cn('whitespace-nowrap px-4 py-2')}
						>
							<div className='mx-auto my-0 h-11 w-11'>
								<img className='h-full w-full' src={icon} alt='' />
							</div>
							<div className=''>{t(displayKey)}</div>
						</LocaleLink>
					</div>
				)
			})}
		</>
	)
}

export default DepositLeft
