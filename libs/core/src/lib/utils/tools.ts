export const onWindowOpenProduct = ({
	pathname,
	windowKey,
}: {
	pathname: string
	windowKey: string
}) => {
	if (typeof window !== `undefined`) {
		window
			.open(
				pathname,
				windowKey,
				'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0',
			)
			?.focus()
	}
}
export const scrollToTop = () => {
	window !== undefined && window.scrollTo({ top: 0, behavior: 'smooth' })
}
