'use client'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface ISubTabMenuProps {
	menuData: Array<{ i18nKey: string }> // 選單資料
	currentIndex: number // 當前選中索引
	onMenuClick: (index: number) => void // 點擊選單的回調
}

/**
 * SubTabMenu 選單組件
 *
 * @description
 * 用於顯示橫向滾動的選單，支持平滑滾動。
 *
 * @prop {Array<{ i18nKey: string }>} menuData - 選單資料，每個選項包含一個 i18nKey。
 * @prop {number} currentIndex - 當前選中的索引。
 * @prop {(index: number) => void} onMenuClick - 點擊選單按鈕時觸發的回調函數。
 *
 * @example
 * <SubTabMenu
 *   menuData={[{ i18nKey: 'Today' }, { i18nKey: 'Yesterday' }]}
 *   currentIndex={0}
 *   onMenuClick={(index) => console.log(index)}
 * />
 */
const SubTabMenu = ({
	menuData,
	currentIndex,
	onMenuClick,
}: ISubTabMenuProps) => {
	const { t } = useClientTranslation()
	const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]) // 用於存放所有按鈕的引用

	/** 點擊事件：滾動到目標按鈕並觸發回調 */
	const handleClick = (index: number) => {
		onMenuClick(index)
		// 滾動到目標按鈕
		buttonRefs.current[index]?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		})
	}

	/** 上一個 */
	const handlePrev = () => {
		if (currentIndex > 0) {
			handleClick(currentIndex - 1)
		}
	}

	/** 下一個 */
	const handleNext = () => {
		if (currentIndex < menuData.length - 1) {
			handleClick(currentIndex + 1)
		}
	}

	return (
		<div className='relative flex h-14 w-full items-center overflow-x-hidden border-b border-black bg-gray-200'>
			{/* 左箭頭 */}
			<button
				onClick={handlePrev}
				className='absolute left-0 top-1/2 -translate-y-1/2 px-2 py-2 text-gray-500 hover:text-black disabled:text-gray-300'
				disabled={currentIndex === 0}
			>
				<FiChevronLeft className='text-black' size={20} />
			</button>

			{/* 選單按鈕 */}
			<div
				style={{
					msOverflowStyle: 'none', // 隱藏 IE 和 Edge 的 scrollbar
					scrollbarWidth: 'none', // 隱藏 Firefox 的 scrollbar
				}}
				className='flex items-center overflow-x-auto whitespace-nowrap'
			>
				<div className='mx-6 flex'>
					{menuData.map((tag, index) => {
						const activeClass =
							index === currentIndex ? 'text-black font-bold' : 'text-gray-600'
						return (
							<button
								key={t(tag.i18nKey)}
								ref={el => {
									// 正確處理 ref，保證不返回值
									buttonRefs.current[index] = el
								}}
								className={`shrink-0 appearance-none border-none px-4 py-2 text-sm outline-none ${activeClass}`}
								onClick={() => handleClick(index)}
							>
								{t(tag.i18nKey)}
							</button>
						)
					})}
				</div>
			</div>

			{/* 右箭頭 */}
			<button
				onClick={handleNext}
				className='absolute right-0 top-1/2 -translate-y-1/2 px-2 py-2 text-gray-500 hover:text-black disabled:text-gray-300'
				disabled={currentIndex === menuData.length - 1}
			>
				<FiChevronRight className='text-black' size={20} />
			</button>
		</div>
	)
}

export default SubTabMenu
