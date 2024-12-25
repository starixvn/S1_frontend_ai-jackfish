'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { useForm } from 'react-hook-form'
import { FaUserCircle } from 'react-icons/fa'
import { MdOutlineEmail } from 'react-icons/md'
import { z } from 'zod'
import { DateSelector, Input, Select } from '../common'

const InfoEdit = () => {
	const { t } = useClientTranslation()

	const formSchema = z.object({
		formEmail: z
			.string()
			.min(1, { message: 'Email is required' })
			.email({ message: 'Invalid email address' }),
		formPhone: z.string().min(1, { message: 'Phone number is required' }),
		formRealName: z.string().min(1, { message: 'Real name is required' }),
		formAreaCode: z.string().optional(),
		formBirthDay: z.number().min(1).max(31),
		formBirthMonth: z.number().min(1).max(12),
		formBirthYear: z.number().min(1900),
	})

	const {
		register,
		handleSubmit,
		formState: { errors, dirtyFields },
	} = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			formEmail: '',
			formPhone: '',
			formRealName: '',
			formAreaCode: '',
			formBirthDay: 1,
			formBirthMonth: 1,
			formBirthYear: 2000,
		},
	})

	const onSubmit = (data: any) => {
		console.log(data)
	}

	return (
		<div className='my-5 w-full'>
			<h2 className='text-md mb-4 text-center font-bold'>Information</h2>
			<form onSubmit={handleSubmit(onSubmit)} className='text-primary-700'>
				{/* Email */}
				<div className='my-2 flex flex-col'>
					<span className='text-gray-0  mb-2 text-xs'>
						{t('Label_General_Email')}
					</span>
					<Input
						register={register('formEmail')}
						placeholder={t('Label_General_Email') as string}
						dirty={!!dirtyFields.formEmail}
						error={!!errors.formEmail}
						errorMessage={errors.formEmail?.message}
						infoMessage={t('Label_Profile_EnterAddress') || ''}
						icon={<MdOutlineEmail size={14} />}
					/>
				</div>

				{/* Phone */}
				<div className='mt-1 flex flex-col gap-3'>
					<span className='text-gray-0 text-xs'>
						{t('Label_General_Phone')}
					</span>
					<div className='flex gap-1'>
						<Select
							value={1}
							defaultValue={1}
							options={[{ value: 1, label: 1 }]}
							isTranslation={true}
							placeholder='-'
							onChange={() => {
								//
							}}
							title='Label_History_QuickPick'
							className='!mx-0'
						/>
						<Input
							register={register('formPhone')}
							type='number'
							placeholder={t('Label_General_Phone') || ''}
							error={!!errors['formPhone']}
							dirty={!!dirtyFields['formPhone']}
							isMessagesHide
							onBlur={() => {
								//
							}}
						/>
					</div>
					{errors['formPhone'] ? (
						<div className='text-danger-500 text-sm'>
							{errors['formPhone']?.message as string}
						</div>
					) : (
						<div className='mb-2' />
					)}
				</div>

				{/* 生日 */}
				<div className='mb-5 mt-2 flex flex-col'>
					<span className='text-gray-0 mb-2 text-xs'>
						{t('Label_Profile_Birthday')}
					</span>
					<DateSelector
						selected={null}
						onChange={() => {
							//
						}}
						// maxDate={dayjs().subtract(18, 'year').toDate()}
						placeholderText='DD/MM/YYYY'
						closeOnScroll
						showDisabledMonthNavigation
						showYearDropdown
						className='w-full'
					/>
				</div>

				{/* Real Name */}
				<div className='my-2 flex flex-col'>
					<span className='text-gray-0 mb-2 text-xs'>
						{t('Label_General_RealName')}
					</span>
					<Input
						register={register('formRealName')}
						placeholder={t('Label_General_RealName') as string}
						dirty={!!dirtyFields.formRealName}
						error={!!errors.formRealName}
						errorMessage={errors.formRealName?.message}
						infoMessage={t('Label_General_RemindForName') as string}
						icon={<FaUserCircle size={14} />}
					/>
				</div>

				<button
					type='submit'
					className='bg-secondary-500 text-gray-0 mt-2 w-full  rounded-full py-2 transition'
				>
					{t('Label_General_Submit')}
				</button>
			</form>
		</div>
	)
}

export { InfoEdit }
