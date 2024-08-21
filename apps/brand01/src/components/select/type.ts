import { ReactNode } from 'react'

export type SelectOptionType = {
	value: string | number | undefined
	label: string | number | null | ReactNode
}
