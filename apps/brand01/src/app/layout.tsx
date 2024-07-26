import { ReactNode } from 'react'
import '../style/global.css'
import 'swiper/css/bundle'
import 'react-toastify/dist/ReactToastify.css'

export default function RootLayout({
	children,
	params: { locale },
}: {
	children: ReactNode
	params: {
		locale: string
	}
}) {
	return (
		<html lang={locale}>
			<body className='mx-auto bg-neutral-500'>{children}</body>
		</html>
	)
}
