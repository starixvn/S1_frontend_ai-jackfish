import { imageUrl } from 'JF-core'

const Logo: React.FC = () => {
	return (
		<div className='grid grid-cols-1 place-items-center'>
			<img className='w-1/2' src={imageUrl('/img/logo.png')} alt='logo' />
		</div>
	)
}

export default Logo
