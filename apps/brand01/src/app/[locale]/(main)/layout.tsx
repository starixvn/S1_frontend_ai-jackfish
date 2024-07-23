import { redirect } from 'next/navigation'
import { checkSignIn } from 'JF-api'
import { paths } from 'JF-constants'
import Layout from '@brand01/src/components/layout'

export default async function MainLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: {
		locale: string
	}
}) {
	const isSignedIn = await checkSignIn()
	if (!isSignedIn) {
		redirect(paths.login.root)
	}
	return (
		<Layout locale={locale} isSignedIn={isSignedIn}>
			{children}
		</Layout>
	)
}
