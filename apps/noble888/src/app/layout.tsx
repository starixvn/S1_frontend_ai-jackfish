import { fallbackLng, languages } from '@noble888/src/i18n/settings'
import { toUpper } from 'lodash-es'
import { ReactNode } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css/bundle'
import { LangId } from '../data/country'
import '../style/global.css'

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: LangId }
}) {
	if (!languages.includes(locale)) locale = fallbackLng
	return {
		title: `${toUpper(`${process.env.NEXT_PUBLIC_SITE_NAME}`)}`,
		description: `Welcome to ${toUpper(`${process.env.NEXT_PUBLIC_SITE_NAME}`)}`,
		icons: { icon: `${process.env.NEXT_PUBLIC_IMAGE_HOST}/img/favicon.ico` },
	}
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return children
}
