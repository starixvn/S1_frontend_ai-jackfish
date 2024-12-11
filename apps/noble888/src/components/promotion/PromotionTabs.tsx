import clsx from 'clsx'
import { IconType } from 'react-icons'

export interface ITab {
	Icon?: IconType
	label: string
}

interface IPromotionTabsProps {
	tabs: Record<string, ITab>
	selected: string
	onChange: (tabName: string) => void
}

export default function PromotionTabs({
	tabs,
	selected,
	onChange,
}: IPromotionTabsProps) {
	return (
		<div className='flex w-full font-bold'>
			{Object.entries(tabs).map(([key, { label, Icon }]) => (
				<button
					key={key}
					onClick={() => onChange(key)}
					className={clsx(
						key === selected
							? 'bg-primary-600 hover:bg-primary-700 text-white'
							: 'bg-primary-100 text-primary-600',
						'flex min-w-40 flex-grow items-center justify-center gap-1 px-5 py-2 text-sm',
						'hover:bg-primary-600 hover:text-white',
					)}
				>
					{Icon && <Icon />}
					{label}
				</button>
			))}
		</div>
	)
}
