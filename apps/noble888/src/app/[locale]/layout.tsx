import { Layout } from '@noble888/src/components'
import { checkSignIn } from 'JF-api/auth/server'
import { ReactNode } from 'react'

export default async function MainLayout({
	children,
}: {
	children: ReactNode
}) {
	const isSignedIn = await checkSignIn()
	return <Layout isSignedIn={isSignedIn}>{children}</Layout>
}
