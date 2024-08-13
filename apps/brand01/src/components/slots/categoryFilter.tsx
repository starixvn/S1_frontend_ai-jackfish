'use client'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { ISlotsCategoryData } from 'JF-api/game/type'
import { cn, useGetPathname } from 'JF-core'
import { useSlotPageStore } from 'JF-operations'
import { useEffect } from 'react'

interface ICategoryFilterProps {
	tpId: string
	activeCategoryKey: keyof ISlotsCategoryData
	setActiveCategoryKey: (activeCategoryKey: keyof ISlotsCategoryData) => void
}
const CategoryFilter = ({
	tpId,
	activeCategoryKey,
	setActiveCategoryKey,
}: ICategoryFilterProps) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { slotsCategoryData, categoryKeys, setCategoryKeys } =
		useSlotPageStore()
	useEffect(() => {
		const updateCategoryKeys = () => {
			const newCategoryKeys: string[] = []
			if (tpId) {
				Object.entries(slotsCategoryData).forEach(([key, value]) => {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					const result = value.find((item: any) => String(item.tpId) === tpId)
					if (result !== undefined) {
						newCategoryKeys.push(key)
					}
				})
				setCategoryKeys(newCategoryKeys)
			} else {
				setCategoryKeys(Object.keys(slotsCategoryData))
			}
		}

		updateCategoryKeys()
	}, [setCategoryKeys, slotsCategoryData, tpId])

	const onCategoryChange = (value: string) => {
		setActiveCategoryKey(value as keyof ISlotsCategoryData)
	}

	return (
		<div className='bg-tertiary-400 scrollbar-thin scrollbar-track-tertiary-500 scrollbar-thumb-primary-100 flex w-full gap-5 overflow-auto px-6 pt-4 lg:px-52 lg:pt-6'>
			{categoryKeys.map(value => {
				return (
					<div
						key={`slots-nav-${value}`}
						className={cn(
							'cursor-pointer whitespace-nowrap pb-4 text-white lg:pb-6',
							{
								'border-b-secondary-300 border-b-2':
									activeCategoryKey === value,
							},
						)}
						onClick={() => onCategoryChange(value)}
					>
						{t(
							`Label_General_${value.charAt(0).toUpperCase() + value.slice(1)}`,
						)}
					</div>
				)
			})}
		</div>
	)
}

export default CategoryFilter
