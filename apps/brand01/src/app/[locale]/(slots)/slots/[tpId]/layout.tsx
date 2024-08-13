import SlotLayout from '@brand01/src/components/layout/slots'
import { checkSignIn } from 'JF-api/auth/server'
import { paths } from 'JF-constants'
import { redirect } from 'next/navigation'

export default async function SlotPageLayout({
	children,
	params: { tpId },
}: {
	children: React.ReactNode
	params: {
		tpId: string
	}
}) {
	const isSignedIn = await checkSignIn()
	if (!isSignedIn) {
		redirect(paths.login.root)
	}

	return (
		<SlotLayout isSignedIn={isSignedIn} tpId={tpId}>
			{children}
		</SlotLayout>
	)
}
