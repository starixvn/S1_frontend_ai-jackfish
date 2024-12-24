'use client'

import Features from './Features'
import JoinForm from './JoinForm'

const Join: React.FC = () => {
	return (
		<div className='mx-auto my-12 flex min-h-[85vh] max-w-[70vw] gap-6 lg:max-w-[55vw]'>
			<Features />
			<JoinForm />
		</div>
	)
}

export default Join
