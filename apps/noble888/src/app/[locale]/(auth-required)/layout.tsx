import Dashboard from '@noble888/src/components/dashboard'
// import { AuthGuard } from 'JF-core'
import React from 'react'

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		// 	{isSignedIn => <Layout isSignedIn={isSignedIn}>{children}</Layout>}
		// TODO: 目前為讓開發順利，先不阻當未登入邏輯，直接顯示 Dashboard
		<Dashboard>{children}</Dashboard>
	)
}
