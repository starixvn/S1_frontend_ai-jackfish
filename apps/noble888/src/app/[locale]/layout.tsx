import { Layout } from '@noble888/src/components'
import { checkSignIn } from 'JF-api/auth/server'
import { QueryProvider } from 'JF-core'
import { ReactNode } from 'react'

export default async function MainLayout({
	children,
}: {
	children: ReactNode
}) {
	const isSignedIn = await checkSignIn()
	return (
		<QueryProvider>
			<Layout isSignedIn={isSignedIn}>{children}</Layout>
		</QueryProvider>
	)
}
