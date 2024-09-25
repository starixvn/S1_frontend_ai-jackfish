import Layout from '@brand01/src/components/layout'
import { checkSignIn } from 'JF-api/auth/server'
import { paths } from 'JF-constants'
import { redirect } from 'next/navigation'

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const isSignedIn = await checkSignIn()
	if (!isSignedIn) {
		redirect(paths.login.root)
	}

	return <Layout isSignedIn={isSignedIn}>{children}</Layout>
}
