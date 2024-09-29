import AuthLayout from '@brand01/src/components/layout/auth'
import { checkSignIn } from 'JF-api/auth/server'
import { paths } from 'JF-constants'
import { BlockIpProvider } from 'JF-core'
import { redirect } from 'next/navigation'

export default async function Layout({
	children,
}: {
	children: React.ReactNode
}) {
	const isSignedIn = await checkSignIn()
	if (isSignedIn) {
		redirect(paths.home.root)
	}
	return (
		<AuthLayout isSignedIn={isSignedIn}>
			<BlockIpProvider>{children}</BlockIpProvider>
		</AuthLayout>
	)
}
