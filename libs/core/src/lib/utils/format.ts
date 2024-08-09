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
