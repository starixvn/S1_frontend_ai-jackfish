import { fallbackLng, languages } from '@brand01/src/i18n/settings'
import { ReactNode } from 'react'
import { ToastContainer } from 'react-toastify'

export async function generateMetadata({
	params: { locale },
}: {
	params: {
		locale: string
	}
}) {
	if (languages.indexOf(locale) < 0) locale = fallbackLng
}

export default async function MainLayout({
	children,
}: {
	children: ReactNode
}) {
	return (
		<>
			{children}
			<ToastContainer />
		</>
	)
}
