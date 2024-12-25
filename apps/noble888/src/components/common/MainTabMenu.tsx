'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'
import Link from 'next/link'
import { useState } from 'react'
interface TagData {
	link: string
	name?: string
	tagName?: string
}

interface MainTabMenuProps {
	tagsData: TagData[]
}

const MainTabMenu = ({ tagsData }: MainTabMenuProps) => {
	const { t } = useClientTranslation()
	const [currentTagIndex, setCurrentTagIndex] = useState<number>(0)

	return (
		<div className='flex h-10'>
			{tagsData.map((tag, index) => {
				const activeClass =
					index === currentTagIndex
						? 'bg-secondary-500 text-gray-0'
						: 'bg-gray-800 text-gray-500 '

				return (
					<Link
						className={`flex flex-1 cursor-pointer items-center justify-center ${activeClass}`}
						href={tag.link}
						key={tag.link}
						onClick={() => setCurrentTagIndex(index)}
					>
						{t(tag.tagName as string)}
					</Link>
				)
			})}
		</div>
	)
}

export default MainTabMenu
