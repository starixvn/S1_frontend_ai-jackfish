import { fallbackLng, languages } from '@brand01/src/i18n/settings'
import { QueryProvider } from 'JF-core'
import { toUpper } from 'lodash-es'
import NextTopLoader from 'nextjs-toploader'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css/bundle'
import '../style/global.css'

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

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: React.ReactNode
	params: {
		locale: string
	}
}) {
	return (
		<html lang={locale}>
			<body className='bg-tertiary-500 mx-auto lg:bg-neutral-500'>
				<NextTopLoader
					color='rgb(var(--color-primary-300))'
					showSpinner={false}
				/>
				<QueryProvider>{children}</QueryProvider>
			</body>
		</html>
	)
}
