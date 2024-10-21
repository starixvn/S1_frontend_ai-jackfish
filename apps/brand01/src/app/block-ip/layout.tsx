import { ReactNode, Suspense } from 'react'

export default function BlockIpLayout({ children }: { children: ReactNode }) {
	return <Suspense>{children}</Suspense>
}
