import { fallbackLng, languages } from '@brand01/src/i18n/settings'
import { getIpCountry } from 'JF-api/site/server'
import { paths } from 'JF-constants'
import { toUpper } from 'lodash-es'
import { redirect } from 'next/navigation'
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
	return {
		title: `${toUpper(`${process.env.NEXT_PUBLIC_SITE_NAME}`)}`,
		description: `Welcome to ${toUpper(`${process.env.NEXT_PUBLIC_SITE_NAME}`)}`,
		icons: {
			icon: [
				{
					url: `${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/favicon.ico`,
					href: `${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/favicon.ico`,
				},
			],
		},
	}
}

export default async function MainLayout({
	children,
}: {
	children: ReactNode
}) {
	const { isAccess } = (await getIpCountry()) || {}
	if (!isAccess) {
		redirect(paths.blockIp.root)
	}
	return (
		<>
			{children}
			<ToastContainer />
		</>
	)
}
