import { range } from 'lodash-es'

/**
 * @returns 回傳金額快捷列表
 * ```
 * generateShortcutList({ minAmount: 1000, isConvert: false })
 * //  [1000, 5000, 20000, 100000, 600000]
 *
 * generateShortcutList({ minAmount: 1000, isConvert: true })
 * // [1, 5, 20, 100, 600]
 * ```
 */
export const generateShortcutList = ({
	minAmount,
	isConvert = false,
}: {
	minAmount: number
	isConvert?: boolean
}) =>
	range(5).map(n => {
		const currentAmount = minAmount * 5 ** n
		const maxDigit = 10 ** Math.floor(Math.log10(currentAmount))
		let roundedAmount = Math.floor(currentAmount / maxDigit) * maxDigit

		if (isConvert) {
			roundedAmount = Math.floor(roundedAmount / 1000)
		}

		return roundedAmount
	})
