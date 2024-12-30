'use client'
import { useGotoGameRedirect } from 'JF-core'

/**
 *
 * GotoGame的遊戲打開時會因為加載時間偏長，讓使用者以為沒反應，所以多做launcher來開新頁面讓UX更直覺（Nova88已改）
 */
const LauncherPage = () => {
	useGotoGameRedirect()
	return (
		<html>
			<body></body>
		</html>
	)
}

export default LauncherPage
