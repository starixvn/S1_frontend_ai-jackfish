'use client'
import { cn } from 'JF-core'
import LoginForm from './LoginForm'
import Logo from './Logo'
import MemberInfo from './MemberInfo'
import Menu from './menu'

interface HeaderProps {
	isLogin: boolean
	setIsLogin: (isLogin: boolean) => void
}

export default function Header({ isLogin, setIsLogin }: HeaderProps) {
	return (
		<div className='sticky top-0 z-50'>
			{/* TODO: 在登入功能做好前，先用此button判斷登入登出來看畫面 */}
			<button
				className={cn(
					'absolute left-1/2 translate-x-[-50%] rounded-md bg-green-700 p-2',
					{
						'bg-red-700': isLogin,
					},
				)}
				onClick={() => setIsLogin(!isLogin)}
			>
				{isLogin ? '登出' : '登入'}
			</button>
			<header className='bg-primary-900 grid w-full grid-cols-12 items-center px-3 py-2 lg:px-6 lg:py-6'>
				<Logo />

				<div className='col-span-8 flex items-center justify-end gap-4 md:col-span-9 lg:col-span-10'>
					{isLogin ? <MemberInfo /> : <LoginForm />}
				</div>
			</header>
			<Menu />
		</div>
	)
}
