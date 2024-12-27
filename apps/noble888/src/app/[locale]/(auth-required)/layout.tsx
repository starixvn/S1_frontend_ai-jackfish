import Dashboard from '@noble888/src/components/dashboard'
import { AuthGuard } from 'JF-core'
import React from 'react'

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return <AuthGuard>{() => <Dashboard>{children}</Dashboard>}</AuthGuard>
}
