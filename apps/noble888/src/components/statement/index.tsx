'use client'
import React from 'react'
import {
	Breadcrumb,
	MainTabMenu,
	Select,
	SubTabMenu,
} from '@noble888/src/components/common/index'
import { useState } from 'react'
const index = () => {
	const [activeSubMenuIndex, setActiveSubMenuIndex] = useState<number>(0)
	const [activeBreadcrumbIndex, setActiveBreadcrumbIndex] = useState<number>(3)
	const [selectedValue, setSelectedValue] = useState<
		string | number | undefined
	>()
	const menuData = [
		{ displayKey: 'Today' },
		{ displayKey: 'Yesterday' },
		{ displayKey: 'This Week' },
		{ displayKey: 'Last Week' },
		{ displayKey: 'This Month' },
		{ displayKey: 'Last Month' },
	]

	const breadcrumbItems = [
		{ displayKey: 'Quick Pick' },
		{ displayKey: 'Last Month' },
		{ displayKey: 'By Day' },
		{ displayKey: 'By Category' },
	]
	const options = [
		{ value: 1, label: '選項 1' },
		{ value: 2, label: '選項 2' },
		{ value: 3, label: '選項 3' },
	]

	/** 點擊標籤時的事件 */
	const handleMenuClick = (index: number) => {
		console.log(menuData[index].displayKey)
	}

	const handleBreadcrumbClick = (index: number) => {
		console.log(breadcrumbItems[index].displayKey)
		setActiveBreadcrumbIndex(3)
	}
	const handleSelectChange = (value: string | number | undefined) => {
		console.log(value)

		setSelectedValue(value)
	}
	return (
		<>
			<MainTabMenu />
			<SubTabMenu
				activeIndex={activeSubMenuIndex}
				setActiveIndex={setActiveSubMenuIndex}
				menuData={menuData}
				onMenuClick={handleMenuClick}
			/>
			<Breadcrumb
				activeIndex={activeBreadcrumbIndex}
				setActiveIndex={setActiveBreadcrumbIndex}
				breadcrumbData={breadcrumbItems}
				onBreadcrumbClick={handleBreadcrumbClick}
			/>
			{/* <NoInformation /> */}

			<div className='mt-10'>
				<Select
					value={selectedValue}
					defaultValue={options[0].value}
					options={options}
					placeholder='請選擇一個選項'
					onChange={handleSelectChange}
				/>
			</div>

			
		</>
	)
}

export default index
