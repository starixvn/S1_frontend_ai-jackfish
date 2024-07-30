'use client'

import React from 'react'
import { toast } from 'react-toastify'

const page = () => {
	const showToast = () => {
		toast('這是自定義樣式的 Toast!', {
			style: {
				backgroundColor: 'purple',
				color: 'white',
				fontFamily: 'Helvetica',
			},
			progressStyle: { background: 'blue' },
		})
	}

	return (
		<div className='text-white'>
			<button onClick={showToast}>Notify - Info</button>
		</div>
	)
}

export default page
