'use client'

import { SelectOptionType } from '@brand01/src/components/select/type'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { cn, useGetPathname } from 'JF-core'
import { SelectHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

interface ISelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
	options: Array<SelectOptionType>
	register: UseFormRegisterReturn
	selectId: string
}

export default function Select({
	options,
	register,
	selectId,
	className,
	...props
}: ISelectProps) {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	return (
		<select
			id={selectId}
			className={cn(
				'text-tertiary-400 focus:border-secondary-300  w-full appearance-none rounded-[5px] border-2 border-solid border-transparent py-3 px-12 text-center text-sm placeholder:text-neutral-300 focus:outline-none disabled:bg-neutral-200 ',
				className,
			)}
			{...register}
			{...props}
		>
			<option value=''>{t('Label_General_None')}</option>
			{options.map(option => {
				return (
					<option value={option.value} key={option.value}>
						{option.label}
					</option>
				)
			})}
		</select>
	)
}
