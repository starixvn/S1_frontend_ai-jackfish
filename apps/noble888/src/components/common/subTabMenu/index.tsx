'use client'
import { useRef } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface ISubMenuProps {
	menuData: Array<{ displayKey: string }>
	activeIndex: number
	setActiveIndex: (index: number) => void
	onMenuClick: (index: number) => void
}

/**
 * SubMenu 選單組件
 * @param  activeIndex - 當前選中標籤的索引。
 * @param  setActiveIndex - 設定選中的標籤索引。
 * @param  menuData - 選單資料。
 * @param  onTagClick - 點擊標籤時的事件。
 * @example
 *  const [activeIndex, setActiveIndex] = useState<number>(0)
 * 
 *  const menuData = [
 *		{ displayKey: 'Today' },
 *		{ displayKey: 'Yesterday' },
 *		{ displayKey: 'This Week' },
 *		{ displayKey: 'Last Week' },
 *		{ displayKey: 'This Month' },
 *		{ displayKey: 'Last Month' },
 *	 ]
 *
 *	// 點擊標籤時的事件
 *	const handleMenuClick = (index: number) => {
 *		if (index === 0) console.log(menuData[index].name) // 'Today'
 *	 }

 *   <SubMenu
 *     activeIndex={activeIndex}
 *     setActiveIndex={setActiveIndex}
 *     menuData={menuData}
 *	   onMenuClick={handleMenuClick}
 *    />
 */
const SubTabMenu = ({
	menuData,
	activeIndex,
	setActiveIndex,
	onMenuClick,
}: ISubMenuProps) => {
	const tagsRef = useRef<Array<HTMLButtonElement | null>>([]) // 存放每個按鈕的引用

	/** 點擊事件 */
	const handleClick = (index: number) => {
		setActiveIndex(index)
		tagsRef.current[index]?.scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'center',
		})
		onMenuClick(index)
	}

	/** 上一個 */
	const handlePrev = () => {
		if (activeIndex > 0) {
			handleClick(activeIndex - 1)
		}
	}

	/** 下一個 */
	const handleNext = () => {
		if (activeIndex < menuData.length - 1) {
			handleClick(activeIndex + 1)
		}
	}

	return (
		<div className='relative w-full overflow-x-hidden bg-gray-200 border-b border-black-900'>
			{/* 左箭頭 */}
			<button
				onClick={handlePrev}
				className='absolute left-0 top-1/2 -translate-y-1/2 px-2 py-2 text-gray-500 hover:text-black disabled:text-gray-300'
				disabled={activeIndex === 0}
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
							index === activeIndex ? 'text-black font-bold' : 'text-gray-600'
						return (
							<button
								key={tag.displayKey}
								ref={el => {
									tagsRef.current[index] = el
								}}
								className={`shrink-0 appearance-none border-none px-4 py-2 text-sm outline-none ${activeClass}`}
								onClick={() => handleClick(index)}
							>
								{tag.displayKey}
							</button>
						)
					})}
				</div>
			</div>

			{/* 右箭頭 */}
			<button
				onClick={handleNext}
				className='absolute right-0 top-1/2 -translate-y-1/2 px-2 py-2 text-gray-500 hover:text-black disabled:text-gray-300'
				disabled={activeIndex === menuData.length - 1}
			>
				<FiChevronRight className='text-black' size={20} />
			</button>
		</div>
	)
}

export default SubTabMenu
