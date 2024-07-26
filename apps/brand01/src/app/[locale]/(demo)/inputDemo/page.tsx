'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useGetPathname } from 'JF-core'
import { useClientTranslation } from '@brand01/src/i18n/client'
import Input from '@brand01/src/components/input'

const page = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const {
		register,
		formState: { errors, dirtyFields },
	} = useForm({ mode: 'onChange' })

	return (
		<div className='grid h-screen w-screen place-items-center'>
			<form className='grid w-96 place-items-center gap-1'>
				<Input
					register={register('phoneNo', {
						required: {
							value: true,
							message: t('Label_Join_PhoneRequired'),
						},
						pattern: {
							value: /\d{9}/,
							message: 'invalid format',
						},
					})}
					type='number'
					placeholder={t('Label_General_Phone') || ''}
					title='+66'
					icon='icon-phone'
					error={!!errors['phoneNo']}
					errorMessage={errors['phoneNo']?.message as string}
					dirty={!!dirtyFields['phoneNo']}
				/>
				<Input
					register={register('password', {
						required: {
							value: true,
							message: t('Label_General_PasswordRequired'),
						},
					})}
					password
					placeholder={t('Label_General_Passsword') || ''}
					icon='icon-lock'
					error={!!errors['password']}
					errorMessage={errors['password']?.message as string}
					dirty={!!dirtyFields['password']}
				/>
				<Input
					register={register('disable')}
					dirty={!!dirtyFields['disable']}
					disabled
					placeholder='disabled'
				/>
				<Input
					register={register('information', {
						required: {
							value: true,
							message: 'Please enter your information',
						},
					})}
					dirty={!!dirtyFields['information']}
					placeholder='information'
					infoMessage='this is information message'
					error={!!errors['information']}
					errorMessage={errors['information']?.message as string}
				/>
			</form>
		</div>
	)
}

export default page
