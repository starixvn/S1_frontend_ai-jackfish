'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { paths } from 'JF-constants'
import { imageUrl, useGetPathname, useLocaleRouter, useMenuOpen } from 'JF-core'
import { useHomeStore } from 'JF-operations'

const SubMenu = () => {
	const router = useLocaleRouter()
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { onMenuOpen } = useMenuOpen()
	const { subMenuData } = useHomeStore()

	return (
		<>
			{subMenuData?.map(item => (
				<div key={`subMenu-${item.tpGameIdNo}`}>
					<div
						className='group relative cursor-pointer object-left-top'
						onClick={() => {
							onMenuOpen(item, {
								loginCallback: () => {
									router.push(paths.login.root)
								},
								// eslint-disable-next-line no-console
								messageCallBack: message => console.error(message),
							})
						}}
					>
						<img
							src={imageUrl(item.imgUrl)}
							alt=''
							className='w-full rounded-xl object-cover transition ease-in-out group-hover:scale-105'
						/>
						<div className='absolute inset-0 m-1 grid place-items-center rounded-xl bg-gradient-to-t from-neutral-500 to-neutral-500/10 opacity-0 transition ease-in-out group-hover:scale-105 group-hover:hover:opacity-100'>
							{/* icon play */}
							{/* <img src={''} alt={''} className='w-16 h-16 lg:w-20 lg:h-20' /> */}
							<div className='truncate text-center text-sm font-medium leading-8 text-neutral-100'>
								{t(item.displayKey)}
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	)
}
export default SubMenu
