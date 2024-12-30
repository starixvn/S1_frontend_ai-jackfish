'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { paths } from 'JF-constants'
import { LocaleLink, cn, imageUrl, useGetPathname, useIconSpin } from 'JF-core'
import { useAuthStore, useSlotPageStore } from 'JF-operations'
import { useEffect, useState } from 'react'

const Header = ({ tpId: providerTpId }: { tpId: string }) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { providerList } = useSlotPageStore()
	const { TUKWallet, getWalletInfo } = useAuthStore()
	const [providerLogo, setProviderLogo] = useState<string | undefined>('')
	const [slotBalance, setSlotBalance] = useState<string | undefined>('0')
	const { isSpinActive, onIconSpin } = useIconSpin()

	const { mainWallet, totalWallet, promoCategoryId } = TUKWallet

	const handleRefetchWallet = () => {
		getWalletInfo()
		onIconSpin()
	}

	// 如果玩家的bonus是all or slot的話，slot page的balance就用total wallet，不然就單純顯示main wallet就好
	useEffect(() => {
		if (promoCategoryId === 0 || promoCategoryId === 1) {
			setSlotBalance(totalWallet)
		} else {
			setSlotBalance(mainWallet)
		}
	}, [mainWallet, promoCategoryId, totalWallet])

	useEffect(() => {
		const logo = providerList.find(({ tpId }) => tpId === Number(providerTpId))
		setProviderLogo(logo?.imgName)
	}, [providerList, providerTpId])

	return (
		<div className='bg-tertiary-500 sticky top-0 z-50 grid h-14 grid-cols-10 place-content-center px-4 text-neutral-100 lg:px-52'>
			<div className='col-span-2 w-fit'>
				<img
					className='h-full w-full'
					src={`${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/providers-logo/${providerLogo}.png`}
					alt='SLOT LOGO'
				/>
			</div>
			<div className='col-span-8 flex items-center justify-end gap-4'>
				{/* <div className='flex gap-1'>
					<span>{t('Label_General_Welcome')}!</span>
					<span className='text-check-200'>{userInfo.userName}</span>
				</div> */}

				<div className='flex gap-1'>
					<span>{t('Label_General_Balance')}:</span>
					<span className='text-secondary-300'>{slotBalance}</span>
				</div>

				<div className='flex cursor-pointer gap-2'>
					<div className='h-5 w-5'>
						<img
							className={cn('mr-2 h-full w-full cursor-pointer', {
								'animate-spin-once': isSpinActive,
							})}
							src={imageUrl('/img/icon/icon-refresh.svg')}
							alt='refresh-icon'
							onClick={handleRefetchWallet}
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
