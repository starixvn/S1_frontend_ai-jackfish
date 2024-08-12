import Layout from '@brand01/src/components/layout'
import { envCookieNames } from '@brand01/src/i18n/settings'
import { checkSignIn } from 'JF-api/auth/server'
import { paths } from 'JF-constants'
import { cookies } from 'next/headers'
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
	const cookieStore = cookies()
	const langId = cookieStore.get(envCookieNames.langId)?.value
	const currencyId = cookieStore.get(envCookieNames.currencyId)?.value
	return (
		<Layout
			isSignedIn={isSignedIn}
			cookieLangId={String(langId)}
			cookieCurrencyId={Number(currencyId)}
		>
			{children}
		</Layout>
	)
}
