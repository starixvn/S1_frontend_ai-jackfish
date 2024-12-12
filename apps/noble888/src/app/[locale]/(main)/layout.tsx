import { ReactNode } from 'react'

export default async function MainLayout({
	children,
}: {
	children: ReactNode
}) {
	return <div>{children}</div>
}
