'use client'
import { changeTheme } from '../utils/helper'

export default function Home() {
	return (
		<div className='grid place-items-center bg-primary min-h-full '>
			<div>
				<button
					className='py-2 px-8 bg-tertiary text-neutral-500 m-2'
					onClick={() => changeTheme('')}
				>
					theme 0
				</button>
				<button
					className='py-2 px-8 bg-tertiary text-neutral-500 m-2'
					onClick={() => changeTheme('theme1')}
				>
					theme 1
				</button>
				<button
					className='py-2 px-8 bg-tertiary text-neutral-500 m-2'
					onClick={() => changeTheme('theme2')}
				>
					theme 2
				</button>
				<button
					className='py-2 px-8 bg-tertiary text-neutral-500 m-2'
					onClick={() => changeTheme('theme3')}
				>
					theme 3
				</button>
			</div>
		</div>
	)
}
