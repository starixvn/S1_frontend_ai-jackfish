import { CurrenciesEnum, INTEGER_ONLY_REGEX } from 'JF-constants'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import { isNaN, replace } from 'lodash-es'
import { FieldErrors } from 'react-hook-form'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

/**
 *
 * @param value
 * @param maximumFractionDigits 擷取到小數點後第n為，後面都捨棄掉
 * @returns 經過格式化後有逗點的字串，ex:1,999.99
 */
export const numFormatToDigits = (
	value: number,
	maximumFractionDigits = 2,
): string => {
	return value.toLocaleString('en', {
		maximumFractionDigits,
		roundingMode: 'trunc',
	} as Intl.NumberFormatOptions)
}

export const isConvert = (currencyId: CurrenciesEnum) =>
	[CurrenciesEnum.IDR, CurrenciesEnum.VND, CurrenciesEnum.KRW].includes(
		currencyId,
	)

/**
 * @returns string
 *
 * @description 格式化金額字串
 * ```tsx
 * numberFormat(5000000, CurrenciesEnum.MYR) // 5,000,000
 * numberFormat(5000000, CurrenciesEnum.VND) // 5,000 ('000)
 * numberFormat(5000000, CurrenciesEnum.VND, 0) // 5,000 ('000));
 * numberFormat(5000000, CurrenciesEnum.VND, 0, false) // 5,000;
 * ```
 */
export const numberFormat = (
	value: number | string,
	currencyId: CurrenciesEnum,
	digits?: number,
	format = true,
) => {
	// 原生的
	if (isNaN(Number(value))) return undefined

	if (isConvert(currencyId)) {
		return `${numFormatToDigits(Number(value) / 1000, digits)} ${
			format ? `('000)` : ''
		}`
	}

	return numFormatToDigits(Number(value), digits)
}

/**
 * 處理後端 API 傳送的時間字串，統一移除時區資訊並轉換為標準時間格式。
 * 適用於兩種時間格式：
 * 1. 不含時區的日期字串，例如：'2024-05-12'，會補上時間 '00:00:00'。
 * 2. 含完整時區的時間字串，例如：'2024-04-29T00:00:00+07:00'。
 *
 * 使用 dayjs 進行解析，並強制設定 UTC 時區偏移為 0，避免自動判斷本地時區導致時間錯誤。
 * 回傳 dayjs 物件，後續可根據需求進行 format。
 */
export const revertTimeZone = (time: string) => {
	return dayjs(`${time} 00:00:00`, 'YYYY-MM-DD HH:mm:ss').utcOffset(0, true)
}

/**
 * @returns number
 * @description 根據 currencies 返回真實金額
 * ```tsx
revertNumberFormat(1000, CurrenciesEnum.VND)	// 1000000
revertNumberFormat(1000, CurrenciesEnum.IDR)	// 1000000
revertNumberFormat(1000, CurrenciesEnum.MYR)	// 1000
revertNumberFormat(1000, CurrenciesEnum.THB)	// 1000
revertNumberFormat("1.00 ('000)", currencyId)	// 1000
revertNumberFormat("1,000.00 ('000)", currencyId)	// 1000000
 * ```
 */
export const revertNumberFormat = (
	value: number | string | undefined,
	currencyId: CurrenciesEnum,
): string | undefined => {
	if (!value) return undefined

	let result = Number(replace(String(value), INTEGER_ONLY_REGEX, ''))

	if (isConvert(currencyId)) {
		result = Number(result) * 1000
	}

	return String(result)
}

/**
 * Input:
 *
 * {
		password: { type: 'required', message: 'Password is required.' },
		userName: { type: 'required', message: 'Username is required.' },
	}
 *
 * Output: ['Username is required.', 'Password is required.']
 *
 * * @example modal.info(renderFieldError(errors))
 */

export const renderFieldErrors = (errors: FieldErrors = {}): string[] => {
	const result = Object.keys(errors).map(key => `${errors[key]?.message}` || '')

	return result
}

/**
 * Input:
 *
 * {
		password: { type: 'required', message: 'Password is required.' },
		userName: { type: 'required', message: 'Username is required.' },
	}
 *
 * Output: 'Username is required.'
 *
 * * @example modal.info(renderFieldError(errors))
 */

export const renderFieldError = (errors: FieldErrors = {}): string => {
	const result = Object.keys(errors).map(key => `${errors[key]?.message}` || '')

	return result[0]
}

// console.log(replaceStringToNumber("100('000)")); // 應該輸出: 100
// console.log(replaceStringToNumber("500 ('000)")); // 應該輸出: 500
// console.log(replaceStringToNumber("1988.88 ('000)")); // 應該輸出: 1988.88
// console.log(replaceStringToNumber("3000")); // 應該輸出: 3000

export const replaceStringToNumber = (str: string) => {
	// 匹配 , 和 ('000)
	const regex = /\s*\('000\)$|,/g

	// 使用 replace 方法將匹配到的部分替換為空字串
	return str.replace(regex, '')
}

export const convertFileToBase64 = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader()
		reader.readAsDataURL(file)
		reader.onload = () => resolve(reader.result as string)
		reader.onerror = error => reject(error)
	})
}
