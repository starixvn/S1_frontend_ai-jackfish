import React from 'react'
import { imageUrl } from 'JF-core'

const Profile = () => {
	return (
		<div className='h-14 w-14'>
			<img
				className='h-full w-full'
				src={imageUrl('/desktop/img/user-info.png')}
				alt='profile icon'
			/>
		</div>
	)
}

export default Profile
