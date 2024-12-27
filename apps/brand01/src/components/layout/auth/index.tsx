'use client'

import { LANG_TO_CURRENCY } from '@brand01/src/data/country'
import { useInitEffect } from 'JF-operations'
import { ReactNode } from 'react'

interface IAuthLayoutProps {
	children: ReactNode
	isSignedIn: boolean
}

const AuthLayout = ({ children, isSignedIn }: IAuthLayoutProps) => {
	// 初始化
	useInitEffect({ isSignedIn, langToCurrency: LANG_TO_CURRENCY })
	return <>{children}</>
}

export default AuthLayout
