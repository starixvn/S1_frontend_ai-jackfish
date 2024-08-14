'use client'
import { useInitEffect, useOnlineCheckInterval } from 'JF-core'
import { useSlotPageStore } from 'JF-operations'
import { ReactNode, useEffect } from 'react'
import Loading from '../../loading'
import Banner from './banner'
import Header from './header'
interface ISlotLayoutProps {
	children: ReactNode
	tpId: string
	isSignedIn: boolean
}
const SlotLayout = ({ children, tpId, isSignedIn }: ISlotLayoutProps) => {
	const { fetchSlotGameData, isLoading } = useSlotPageStore()
	useEffect(() => {
		fetchSlotGameData()
	}, [fetchSlotGameData])
	// 初始化
	useInitEffect({ isSignedIn })
	// check login interval
	useOnlineCheckInterval()

	return (
		<>
			{isLoading ? (
				<Loading className='h-screen bg-transparent' />
			) : (
				<div className='w-full'>
					{/* header */}
					<Header tpId={tpId} />

					{/* banner */}
					<Banner />

					{children}
				</div>
			)}
		</>
	)
}

export default SlotLayout
