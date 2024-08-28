import { imageUrl } from 'JF-core'

const Profile = () => {
	return (
		<div className='absolute h-14 w-14 lg:relative'>
			<img
				className='h-full w-full'
				src={imageUrl('/img/header/user-info.png')}
				alt='profile icon'
			/>
		</div>
	)
}

export default Profile
