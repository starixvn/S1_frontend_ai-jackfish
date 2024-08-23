import SlotLayout from '@brand01/src/components/layout/slots'
import { checkSignIn } from 'JF-api/auth/server'
import { getLobbyHeader } from 'JF-api/game/server'
import { paths } from 'JF-constants'
import { toUpper } from 'lodash-es'
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

// setting metadata only for slot page
export async function generateMetadata({
	params: { tpId },
}: {
	params: {
		tpId: string
	}
}) {
	// 取得遊戲商名稱並顯示在title上
	const data = await getLobbyHeader()
	const slotsTpVendor = data
		.find(item => item.lobbyCategoryId === 4)
		?.data.find(item => item.tpId === Number(tpId))

	return {
		title: `${toUpper(`${process.env.NEXT_PUBLIC_SITE_NAME}`)} - ${slotsTpVendor?.productName}`,
		description: 'Slot Lobby Page',
	}
}
