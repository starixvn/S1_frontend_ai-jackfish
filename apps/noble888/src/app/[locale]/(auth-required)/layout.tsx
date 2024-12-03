import Layout from '@noble888/src/components/layout'
import { AuthGuard } from 'JF-core'

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<AuthGuard>
			{isSignedIn => <Layout isSignedIn={isSignedIn}>{children}</Layout>}
		</AuthGuard>
	)
}
