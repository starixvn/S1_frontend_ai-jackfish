import { paths } from 'JF-constants'
import { bannerUrl } from 'JF-core'

export interface INavMenuProps {
	displayKey: string
	pathname: string
	icon?: string
	active: string
}

export const MENU_NAV_DATA = [
	{
		displayKey: 'Label_General_Home',
		pathname: paths.home.root,
		active: 'home',
	},
	{
		displayKey: 'Label_General_Promotion',
		pathname: paths.promotion.root,
		active: 'promotion',
	},
	{
		displayKey: 'Label_General_Contact',
		pathname: 'https://line.me/R/ti/p/@743gnvdf?oat_content=url&ts=05031614',
		active: 'contact',
	},
] as const satisfies Array<INavMenuProps>

// 存提款左手邊功能
export const Nav_Links = [
	{
		displayKey: 'Label_General_Referral',
		pathname: paths.referral.root, // TODO: 待確認要導到哪頁
		icon: `${bannerUrl('/img/header/referral.png')}`,
		active: 'referral',
	},
	{
		displayKey: 'Label_General_Promotion',
		pathname: paths.promotion.root,
		icon: `${bannerUrl('/img/mobile-footer/icon-promos.png')}`,
		active: 'promotion',
	},
] as const satisfies Array<INavMenuProps>
