'use client'

import { getIpCountry } from 'JF-api/site/client'
import { paths } from 'JF-constants'
import { redirect } from 'next/navigation'
import React, { ReactNode, createContext, useContext } from 'react'
interface BlockIpContextState {
	isAccess: boolean | undefined
}

const BlockIpContext = createContext<BlockIpContextState | undefined>(undefined)

interface BlockIpProviderProps {
	children: ReactNode
}

export const BlockIpProvider: React.FC<BlockIpProviderProps> = ({
	children,
}) => {
	const { isLoading, ipCountryData } = getIpCountry()
	const { isAccess } = ipCountryData || {}

	// fetching 完成且不可進入導回首頁
	if (!isLoading && !isAccess) {
		redirect(paths.blockIp.root)
	}

	return (
		<BlockIpContext.Provider value={{ isAccess }}>
			{children}
		</BlockIpContext.Provider>
	)
}

export const useBlockIp = (): BlockIpContextState => {
	const context = useContext(BlockIpContext)
	if (!context) {
		throw new Error('useBlockIp must be used within a BlockIpProvider')
	}
	return context
}
