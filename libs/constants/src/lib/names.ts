/**
 * @param LangId 後端目前有些 api 會嘗試拿 ex: `${siteName}LangId` 格式的 cookie 值
 */
export const ENV_COOKIE_NAMES = {
	CurrencyId: `${process.env['NEXT_PUBLIC_SITE_NAME']}_currencyId`,
	LangId: `${process.env['NEXT_PUBLIC_SITE_NAME']}LangId`, // * 跟後端約定的格式，不能加底線 '_'
	LineUserId: `${process.env['NEXT_PUBLIC_SITE_NAME']}_lineUserId`,
	AppDownloadHint: `${process.env['NEXT_PUBLIC_SITE_NAME']}_AppDownloadHint`,
}

export const ENV_LOCAL_STORAGE_NAMES = {
	SlotsGameFavorites: `${process.env['NEXT_PUBLIC_SITE_NAME']}_SlotsGameFavorites`,
	DepositSavedChecked: `${process.env['NEXT_PUBLIC_SITE_NAME']}-DepositSavedChecked`,
	DepositSavedInfo: (userName: string) =>
		`${process.env['NEXT_PUBLIC_SITE_NAME']}-${userName}-DepositSavedInfo`,
}
