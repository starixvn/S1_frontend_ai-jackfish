import Layout from '@brand01/src/components/layout'
import { checkSignIn } from 'JF-api/auth/server'
import { getIpCountry } from 'JF-api/site/server'
import { paths } from 'JF-constants'
import { redirect } from 'next/navigation'

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const isSignedIn = await checkSignIn()
	const { isAccess } = (await getIpCountry()) || {}
	if (!isSignedIn) {
		redirect(paths.login.root)
	}
	if (!isAccess) {
		redirect(paths.blockIp.root)
	}
	return <Layout isSignedIn={isSignedIn}>{children}</Layout>
}
