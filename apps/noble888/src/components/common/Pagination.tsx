'use client'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { ReactPaginateProps } from 'react-paginate'
import Select from './Select'

const ReactPagination = dynamic(() => import('react-paginate'), {
	ssr: false,
})

export interface IPaginationProps {
	totalPage: number
	currentPage: number
	onPageChange: (selectedItem: { selected: number }) => void
}

const Pagination = (props: IPaginationProps) => {
	const { totalPage, currentPage, onPageChange } = props

	const [isLgScreen, setIsLgScreen] = useState(false)
	const [selectedPage, setSelectedPage] = useState(currentPage)

	// RWD 適配
	useEffect(() => {
		const updateScreenSize = () => setIsLgScreen(window.innerWidth >= 1024)
		updateScreenSize()
		window.addEventListener('resize', updateScreenSize)
		return () => window.removeEventListener('resize', updateScreenSize)
	}, [])

	useEffect(() => {
		setSelectedPage(currentPage)
	}, [currentPage])

	// 頁數選項
	const pageOptions = Array.from({ length: totalPage }, (_, i) => ({
		value: i + 1,
		label: i + 1,
	}))

	// 處理 Select 選擇變更
	const handleSelectChange = (value: number | string) => {
		setSelectedPage(value as number)
		onPageChange({ selected: (value as number) - 1 })
	}

	// 分頁設定（桌機）
	const config: ReactPaginateProps = {
		pageCount: totalPage,
		forcePage: currentPage - 1,
		onPageChange,
		className: 'flex items-center justify-center gap-1 mt-4',
		pageLinkClassName:
			'flex items-center justify-center w-8 h-8 text-lg rounded-full text-secondary-500 hover:bg-secondary-500 hover:text-white transition',
		activeLinkClassName:
			'flex items-center justify-center w-8 h-8 text-lg rounded-full bg-secondary-500 text-white',
		previousLinkClassName:
			'flex items-center justify-center w-8 h-8 text-lg rounded-full text-secondary-500 hover:bg-secondary-500 hover:text-white transition',
		nextLinkClassName:
			'flex items-center justify-center w-8 h-8 text-lg rounded-full text-secondary-500 hover:bg-secondary-500 hover:text-white transition',
		disabledLinkClassName: 'opacity-50 cursor-not-allowed',
		previousLabel: <FiChevronLeft size={isLgScreen ? 16 : 25} />,
		nextLabel: <FiChevronRight size={isLgScreen ? 16 : 25} />,
		pageRangeDisplayed: isLgScreen ? 5 : 0,
		marginPagesDisplayed: isLgScreen ? 2 : 1,
		breakLabel: '...',
		breakLinkClassName:
			'flex items-center justify-center w-8 h-8 text-lg rounded-full text-gray-500',
	}

	return (
		<div>
			{isLgScreen ? (
				// 大螢幕分頁
				<ReactPagination {...config} />
			) : (
				// 小螢幕使用 Select 顯示頁數
				<div className='w-full'>
					<Select
						options={pageOptions}
						value={selectedPage}
						onChange={handleSelectChange}
						isTranslation={false}
						// todo 請市場翻譯 Current Page:
						title='Current Page:'
						showValue={true}
					/>
				</div>
			)}
		</div>
	)
}

export default Pagination
