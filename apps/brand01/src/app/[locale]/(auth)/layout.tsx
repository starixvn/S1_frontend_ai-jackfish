import { redirect } from 'next/navigation'
import { checkSignIn } from 'JF-api'
import { paths } from 'JF-constants'

export default async function AuthLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const isSignedIn = await checkSignIn()
	if (isSignedIn) {
		redirect(paths.home.root)
	}
	return <>{children}</>
}
