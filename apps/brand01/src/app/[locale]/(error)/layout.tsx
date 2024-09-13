import { ReactNode } from 'react'

export default function BlockIPLayout({ children }: { children: ReactNode }) {
	return (
		<main className='bg-tertiary-500 flex min-h-screen items-center justify-center'>
			{children}
		</main>
	)
}
