'use client'
import { imageUrl } from 'JF-core'
import { useAuthStore } from 'JF-operations'

const Wallet = () => {
	const { userInfo } = useAuthStore()
	const { userName } = userInfo
	return (
		<>
			<div className=''>
				<div className='text-center'>{userName}</div>
				<div className='flex items-center justify-between gap-4 rounded-3xl bg-[#2C245E]'>
					<img
						className='h-8 w-8'
						src={imageUrl('/img/header/balance-money.png')}
						alt=''
					/>
					<span>1,000</span>
					<img
						className='h-8 w-8'
						src={imageUrl('/img/icon/icon-refresh.svg')}
						alt=''
					/>
				</div>
			</div>
		</>
	)
}

export default Wallet
