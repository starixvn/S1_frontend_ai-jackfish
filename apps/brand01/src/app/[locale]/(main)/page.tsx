import HomeContent from '@brand01/src/components/home/homeContent'
import React from 'react'

interface IHomeProps {
	params: { locale: string }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Home: React.FC<IHomeProps> = ({ params: { locale } }) => {
	return (
		<div className=' w-full'>
			<div className=''>
				<HomeContent />
			</div>
		</div>
	)
}

export default Home
