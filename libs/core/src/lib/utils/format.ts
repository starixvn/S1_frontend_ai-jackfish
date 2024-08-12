import { CurrenciesEnum, INTEGER_ONLY_REGEX } from 'JF-constants'
import { isNaN, replace } from 'lodash-es'
import { FieldErrors } from 'react-hook-form'

/**
 * @returns 數字 format 到特定小數點，預設為第二位
 */
export const numFormatToDigits = (value: number, digits = 2): string => {
	// 轉換為整數
	const integerValue = Math.trunc(value)

	// 格式化整數部分
	let formattedValue = new Intl.NumberFormat('en').format(integerValue)

	// 如果有小數位數，則添加小數點和小數部分
	if (digits > 0) {
		const factor = 10 ** digits
		const decimalValue = Math.abs(value - integerValue)
		const truncatedDecimal = Math.trunc(decimalValue * factor) / factor
		const decimalString = truncatedDecimal
			.toFixed(digits)
			.slice(2)
			.replace(/0+$/, '')
		if (decimalString.length > 0) {
			formattedValue += `.${decimalString}`
		}
	}

	return formattedValue
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
