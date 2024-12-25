'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Input } from '../common'

const AddressEdit = () => {
	const { t } = useClientTranslation()

	const formSchema = z.object({
		formLineFirst: z
			.string()
			.min(1, { message: t('Label_Profile_ContentNotEmpty') }),
		formLineSecond: z.string().optional(),
		formCity: z
			.string()
			.min(1, { message: t('Label_Profile_ContentNotEmpty') }),
		formPostCode: z
			.string()
			.min(1, { message: t('Label_Profile_ContentNotEmpty') }),
		formState: z
			.string()
			.min(1, { message: t('Label_Profile_ContentNotEmpty') }),
		formCountry: z
			.string()
			.min(1, { message: t('Label_Profile_ContentNotEmpty') }),
	})

	const {
		handleSubmit,
		register,
		formState: { errors, dirtyFields },
	} = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			formLineFirst: '',
			formLineSecond: '',
			formCity: '',
			formPostCode: '',
			formState: '',
			formCountry: '',
		},
		mode: 'onChange',
	})

	const handleSubmitForm = () => {
		//
	}

	return (
		<div className='my-5 w-full'>
			<h2 className='mb-4 text-center text-md font-bold'>
				{t('Label_Profile_Address')}
			</h2>
			<form
				onSubmit={handleSubmit(handleSubmitForm)}
				className='text-primary-700'
			>
				<div className='flex flex-col my-2'>
					<span className='text-gray-0 mb-2 text-xs'>{t('Label_Profile_Line1')}</span>
					<Input
						register={register('formLineFirst')}
						dirty={!!dirtyFields['formLineFirst']}
						error={!!errors['formLineFirst']}
						errorMessage={errors['formLineFirst']?.message}
						infoMessage={t('Label_Profile_EnterAddress') || ''}
					/>
				</div>

				<div className='flex flex-col my-2'>
					<span className='text-gray-0 mb-2 text-xs'>{t('Label_Profile_Line2')}</span>
					<Input
						register={register('formLineSecond')}
						dirty={!!dirtyFields['formLineSecond']}
						error={!!errors['formLineSecond']}
						infoMessage={t('Label_Profile_EnterAddress') || ''}
					/>
				</div>

				<div className='flex flex-col my-2'>
					<span className='text-gray-0 mb-2 text-xs'>{t('Label_Profile_City')}</span>
					<Input
						register={register('formCity')}
						dirty={!!dirtyFields['formCity']}
						error={!!errors['formCity']}
						errorMessage={errors['formCity']?.message}
						infoMessage={t('Label_Profile_EnterCity') || ''}
					/>
				</div>

				<div className='flex flex-col my-2'>
					<span className='text-gray-0 mb-2 text-xs'>
						{t('Label_Profile_PostCode')}
					</span>
					<Input
						type='number'
						min='0'
						register={register('formPostCode')}
						dirty={!!dirtyFields['formPostCode']}
						error={!!errors['formPostCode']}
						errorMessage={errors['formPostCode']?.message}
						infoMessage={t('Label_Profile_EnterPostCode') || ''}
					/>
				</div>

				<div className='flex flex-col my-2'>
					<span className='text-gray-0 mb-2 text-xs'>{t('Label_Profile_State')}</span>
					<Input
						register={register('formState')}
						dirty={!!dirtyFields['formState']}
						error={!!errors['formState']}
						errorMessage={errors['formState']?.message}
						infoMessage={t('Label_Profile_EnterState') || ''}
					/>
				</div>

				<div className='flex flex-col my-2'>
					<span className='text-gray-0 mb-2 text-xs'>{t('Label_Profile_Country')}</span>
					<Input
						register={register('formCountry')}
						dirty={!!dirtyFields['formCountry']}
						error={!!errors['formCountry']}
						errorMessage={errors['formCountry']?.message}
						infoMessage={t('Label_Profile_EnterCountry') || ''}
					/>
				</div>

				<button
					type='submit'
					className='bg-secondary-500 my-2 text-gray-0 w-full rounded-full py-2'
				>
					{t('Label_General_Submit')}
				</button>
			</form>
		</div>
	)
}

export { AddressEdit }
