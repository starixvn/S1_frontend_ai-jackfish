'use client'

import ContactSupport from '@brand01/src/components/contactSupport'
import Language from '@brand01/src/components/language'
import { cn } from 'JF-core'
import LoginForm from './LoginForm'
import Logo from './Logo'

const Login: React.FC = () => {
	return (
		<div
			className={cn(
				'bg-tertiary-500 flex w-full flex-col justify-center p-4',
				'lg:shadow-primary-200 lg:min-h-[46rem] lg:rounded-lg lg:p-16 lg:shadow-[0_0_0.75rem_0]',
			)}
		>
			<Logo />
			<LoginForm />
			<ContactSupport />
			<Language className='mt-16' />
		</div>
	)
}

export default Login
