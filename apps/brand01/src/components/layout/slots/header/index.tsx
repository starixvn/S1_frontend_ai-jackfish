'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { paths } from 'JF-constants'
import { LocaleLink, imageUrl, useGetPathname } from 'JF-core'
import { useAuthStore, useSlotPageStore } from 'JF-operations'
import { useEffect, useState } from 'react'

const Header = ({ tpId: providerTpId }: { tpId: string }) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { providerList } = useSlotPageStore()
	const { userInfo } = useAuthStore()
	const [providerLogo, setProviderLogo] = useState<string | undefined>('')
	useEffect(() => {
		const logo = providerList.find(({ tpId }) => tpId === Number(providerTpId))
		setProviderLogo(logo?.imgName)
	}, [providerList, providerTpId])

	return (
		<div className='bg-tertiary-500 sticky top-0 z-50 flex h-14 items-center justify-between px-6 text-neutral-100 lg:px-52'>
			<div className=''>
				<img
					className='h-full w-full'
					src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/providers-logo/${providerLogo}.png`}
					alt='SLOT LOGO'
				/>
			</div>
			<div className='flex items-center gap-5'>
				<div className='flex gap-1'>
					<span>{t('Label_General_Welcome')}!</span>
					<span className='text-check-200'>{userInfo.userName}</span>
				</div>

				<div className='flex gap-1'>
					<span>{t('Label_General_Balance')}:</span>
					{/* TODO: 放個人餘額 */}
					<span className='text-secondary-300'>0.00</span>
				</div>

				<div className='flex cursor-pointer gap-2'>
					<div className='h-5 w-5'>
						<img
							className='mr-2 h-full w-full'
							src={imageUrl('/img/icon/icon-refresh.svg')}
							alt={'icon-refresh'}
						/>
					</div>
					<LocaleLink href={paths.home.root} className='h-5 w-5'>
						<img
							className='mr-2 h-full w-full'
							src={imageUrl('/img/icon/slot/icon-home.svg')}
							alt={'icon-home'}
						/>
					</LocaleLink>
				</div>
			</div>
		</div>
	)
}

export default Header
