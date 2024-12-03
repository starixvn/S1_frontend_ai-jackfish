import { paths } from 'JF-constants'
import { LocaleLink } from 'JF-core'

export default function Logo() {
	return (
		<LocaleLink href={paths.home.root}>
			<div className='text-xl uppercase'>Noble888</div>
		</LocaleLink>
	)
}
