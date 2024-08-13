import { useIntersectionObserver } from 'usehooks-ts'

interface Args extends IntersectionObserverInit {
	freezeOnceVisible?: boolean
}

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
