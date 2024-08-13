'use client'
import { ISlotsCategoryData } from 'JF-api/game/type'
import { scrollToTop } from 'JF-core'
import { useEffect, useState } from 'react'
import CategoryFilter from './categoryFilter'
import SlotGameList from './slotGameList'

interface ISlotsComponentProps {
	tpId: string
}

const Slots = ({ tpId }: ISlotsComponentProps) => {
	const [activeCategoryKey, setActiveCategoryKey] =
		useState<keyof ISlotsCategoryData>('all')
	useEffect(() => {
		// 不知道為啥一進畫面不會在最上面，故先用此function讓一進畫面先滾到最頂
		scrollToTop()
	}, [])

	return (
		<>
			{/* category橫幅 */}
			<CategoryFilter
				tpId={tpId}
				activeCategoryKey={activeCategoryKey}
				setActiveCategoryKey={setActiveCategoryKey}
			/>

			{/* slot games list */}
			<div className='w-full'>
				<SlotGameList tpId={tpId} activeCategoryKey={activeCategoryKey} />
			</div>
		</>
	)
}

export default Slots
