import { numberFormat, revertNumberFormat } from 'JF-core'
import { TFunction } from 'i18next'
import { z } from 'zod'

interface IbaseDepositFormSchemaProps {
	currencyId: number
	minAmount: number
	maxAmount: number
	t: TFunction<string, undefined>
}

export const baseDepositFormSchema = ({
	currencyId,
	minAmount,
	maxAmount,
	t,
}: IbaseDepositFormSchemaProps) => {
	const convertedMinAmount = revertNumberFormat(minAmount, currencyId) || 0
	return z.object({
		amount: z.coerce
			.number({
				required_error: t('Label_General_AmountLessThan', {
					value1: numberFormat(convertedMinAmount, currencyId, 0),
				}),
				invalid_type_error: 'Amount must be a number', // input 有檢查，目前不會顯示
			})
			.gte(minAmount, {
				message: t('Label_General_AmountLessThan', {
					value1: numberFormat(convertedMinAmount, currencyId, 0),
				}),
			})
			.max(maxAmount, t('Label_General_NotInLimit')),
		bonusCode: z.string().nullish(),
		promoCode: z.string().nullish(),
	})
}
