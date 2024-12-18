import Layout from '@noble888/src/components/layout'
import { checkSignIn } from 'JF-api/auth/server'
import { ReactNode } from 'react'

export default async function MainLayout({
	children,
}: {
	children: ReactNode
}) {
	// const { isLoading, ipCountryData } = getIpCountry()
	// const { isAccess } = ipCountryData || {}
	// fetching 完成且不可進入導回首頁
	// if (!isLoading && !isAccess) {
	// 	redirect(paths.blockIp.root)
	// }
	const isSignedIn = await checkSignIn()
	return <Layout isSignedIn={isSignedIn}>{children}</Layout>
}
