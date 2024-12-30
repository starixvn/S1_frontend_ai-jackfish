'use client'
import TemporarySwitch from '../TemporarySwitch'
import LoginForm from './LoginForm'
import Logo from './Logo'
import MemberInfo from './memberInfo/MemberInfo'
import Menu from './menu'

interface IHeaderProps {
	isLogin: boolean
}

export default function Header({ isLogin }: IHeaderProps) {
	return (
		<div className='sticky top-0 z-20'>
			{/* TODO: to be removed */}
			<div className='absolute right-2 top-2 z-30'>
				<TemporarySwitch />
			</div>
			<header className='z-10 grid w-full grid-cols-12 items-center bg-black px-3 py-2 lg:px-6 lg:py-6'>
				<Logo />

				<div className='col-span-8 flex items-center justify-end gap-4 md:col-span-9 lg:col-span-10'>
					{isLogin ? <MemberInfo /> : <LoginForm />}
				</div>
			</header>
			<Menu />
		</div>
	)
}
