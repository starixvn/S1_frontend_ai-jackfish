import { CurrenciesEnum } from 'JF-constants'

export type TEventData = {
	name: string
	path: string
	desktopPicUrl: string
	h5PicUrl: string
	label: string
	isNew: boolean
	underMaintenance: boolean
	allowedCurrencies?: CurrenciesEnum[]
}
