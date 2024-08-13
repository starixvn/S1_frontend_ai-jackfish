'use client'

import { useInitEffect } from 'JF-core'
import { ReactNode } from 'react'

interface IAuthLayoutProps {
	children: ReactNode
	isSignedIn: boolean
}

const AuthLayout = ({ children, isSignedIn }: IAuthLayoutProps) => {
	// 初始化
	useInitEffect({ isSignedIn })
	return <>{children}</>
}

export default AuthLayout
