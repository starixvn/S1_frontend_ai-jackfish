'use client'

import Button from '@brand01/src/components/button'
import { toast } from 'react-toastify'

const Page = () => {
	const notifyError = () => toast.error('This is an error message!')
	const notifySuccess = () => toast.success('This is a success message!')
	const notifyWarning = () => toast.warning('This is a warning message!')
	const notifyInfo = () => toast.info('This is an info message!')
	const notifyDefault = () => toast('This is a default message!')

	return (
		<div className='my-5 mx-5 flex flex-col items-start gap-6'>
			<Button onClick={notifySuccess}>Success</Button>
			<Button onClick={notifyError}>Error</Button>
			<Button onClick={notifyWarning}>Warning</Button>
			<Button onClick={notifyInfo}>Info</Button>
			<Button onClick={notifyDefault}>Default</Button>
		</div>
	)
}

export default Page
