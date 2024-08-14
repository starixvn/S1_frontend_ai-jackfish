import { useIntersectionObserver } from 'usehooks-ts'

interface Args extends IntersectionObserverInit {
	freezeOnceVisible?: boolean
}

/**
 *
 * @useInView 滾動捲軸無限讀取資料展開
 */
const useInView = ({
	threshold = 0,
	root = null,
	rootMargin = '0%',
	freezeOnceVisible = false,
}: Args) => {
	const { ref, entry } = useIntersectionObserver({
		threshold,
		root,
		rootMargin,
		freezeOnceVisible,
	})

	const isInView = !!entry?.isIntersecting

	return { ref, isInView }
}

export { useInView }
