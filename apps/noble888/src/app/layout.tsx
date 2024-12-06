import { ReactNode } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import 'swiper/css/bundle'
import '../style/global.css'

export default function RootLayout({ children }: { children: ReactNode }) {
	return children
}
