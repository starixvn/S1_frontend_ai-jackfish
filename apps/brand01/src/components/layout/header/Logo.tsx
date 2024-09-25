import { paths } from 'JF-constants'
import { imageUrl, LocaleLink } from 'JF-core'

const Logo = () => {
	return (
		<div className='col-span-4 flex items-center justify-center pr-6 text-neutral-100 md:col-span-3 lg:col-span-2'>
			<LocaleLink className='w-44' href={paths.home.root}>
				<img
					className='h-full w-full'
					src={imageUrl('/img/logo.png')}
					alt='tuk555 logo'
				/>
			</LocaleLink>
		</div>
	)
}

export default Logo
