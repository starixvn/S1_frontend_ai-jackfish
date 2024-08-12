'use client'

import { useInitEffect } from 'JF-core'
import { ReactNode } from 'react'

interface IAuthLayoutProps {
	isSignedIn: boolean
	children: ReactNode
}

const AuthLayout = ({ isSignedIn, children }: IAuthLayoutProps) => {
	// 初始化
	useInitEffect({ isSignedIn })
	return <>{children}</>
}

export default AuthLayout
