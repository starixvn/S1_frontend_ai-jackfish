'use client'

import { useInitEffect } from 'JF-core'
import { ReactNode } from 'react'

interface IAuthLayoutProps {
	children: ReactNode
	isSignedIn: boolean
	cookieLangId: string
	cookieCurrencyId: number
}

const AuthLayout = ({
	children,
	isSignedIn,
	cookieLangId,
	cookieCurrencyId,
}: IAuthLayoutProps) => {
	// 初始化
	useInitEffect({ isSignedIn, cookieLangId, cookieCurrencyId })
	return <>{children}</>
}

export default AuthLayout
