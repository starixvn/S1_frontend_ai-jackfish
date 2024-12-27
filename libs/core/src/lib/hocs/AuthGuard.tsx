import { checkSignIn } from 'JF-api/auth/server'
import { paths } from 'JF-constants'
import { redirect } from 'next/navigation'
import React from 'react'

interface IAuthGuardProps {
	children: (isSignedIn: boolean) => React.ReactNode
}

// 需要登入的頁面，用此 HOC 包在 Layout 外層
export async function AuthGuard({
	children,
}: IAuthGuardProps): Promise<JSX.Element> {
	const isSignedIn = await checkSignIn()
	if (!isSignedIn) {
		redirect(paths.home.root)
	}

	return <>{children(isSignedIn)}</>
}
