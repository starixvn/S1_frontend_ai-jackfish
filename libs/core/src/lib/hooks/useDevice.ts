'use client'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'

type Device = 'mobile' | 'pad' | 'pc'

// 判斷裝置
const useDevice = (device: Device) => {
	const [hydrated, setHydrated] = useState(false)
	useEffect(() => {
		setHydrated(true)
	}, [])

	const deviceMediaQuery = {
		mobile: 1024,
		pad: 1190,
		pc: 2200,
	}
	const isDevice = useMediaQuery(`(max-width: ${deviceMediaQuery[device]}px)`)

	if (!hydrated) {
		// Returns null on first render, so the client and server match
		return null
	}
	return isDevice
}

export default useDevice
