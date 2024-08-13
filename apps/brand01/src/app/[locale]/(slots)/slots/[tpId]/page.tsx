import Slots from '@brand01/src/components/slots'
import React from 'react'

interface ISlotPageProps {
	params: { tpId: string }
}
const page: React.FC<ISlotPageProps> = ({ params: { tpId } }) => {
	return (
		<div className='bg-layout-bg min-h-screen text-white'>
			<Slots tpId={tpId} />
		</div>
	)
}

export default page
