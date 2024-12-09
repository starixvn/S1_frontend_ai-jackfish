import { CurrenciesEnum } from 'JF-constants'

export const GET_AFFILIATE_LINK = ({
	currencyId,
	langId,
}: {
	currencyId: number
	langId: string
}) => {
	if (currencyId === CurrenciesEnum.INR) {
		return `https://aff.nova88india.com/?lang=${langId}`
	}
	// return `https://aff.nova88bkk.com/?lang=${langId}`
	return ` https://aff.nova88mas102.com/?lang=${langId}`
}
