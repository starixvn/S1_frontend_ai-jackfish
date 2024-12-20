import Button from '@brand01/src/components/button'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { useQueryClient } from '@tanstack/react-query'
import { uploadCustPhoto } from 'JF-api/accountStrict/client'
import { useGetPathname, useImageUploader } from 'JF-core'
import { toast } from 'react-toastify'

export const Uploader = () => {
	const { locale } = useGetPathname()
	const queryClient = useQueryClient()
	const { t } = useClientTranslation(locale)
	const { onSubmit, file, onChangeInput } = useImageUploader(uploadCustPhoto)

	const handleKycSubmit = async () => {
		try {
			await onSubmit()
			await queryClient.invalidateQueries({
				queryKey: [['withdrawal'], ['payment']],
			})
			toast.success(t('Label_General_UpdateSuccessful'))
		} catch (error) {
			toast.error((error as Error).message)
		}
	}

	return (
		<div className='grid w-full grid-flow-row gap-2 text-center'>
			<input
				type='file'
				id='file-upload'
				accept='image/*'
				className='invisible absolute z-10 h-full w-full cursor-pointer'
				onChange={e => {
					onChangeInput(e)
				}}
			/>
			<label
				htmlFor='file-upload'
				className='bg-secondary-500 border-secondary-300 hover:bg-secondary-400/80 flex h-32 cursor-pointer items-center justify-center rounded-lg border-2'
			>
				{typeof file?.fileImg === 'string' ? (
					<img
						alt='preview'
						src={file.fileImg}
						className='h-full w-full rounded-lg object-contain'
					/>
				) : (
					<span className='text-secondary-300 text-4xl'>+</span>
				)}
			</label>
			<ul className='text-primary-200  grid  grid-flow-col place-content-start gap-1 text-xs lg:list-inside lg:list-disc lg:place-content-center lg:gap-2'>
				<li>{t('Label_Withdrawal_NationalIdentityCard')}</li>
				<li>{t('Label_Withdrawal_Passport')}</li>
				<li>{t('Label_Withdrawal_DrivingLicense')}</li>
			</ul>
			<div className='grid grid-cols-2 gap-2'>
				<Button className='w-full' onClick={handleKycSubmit}>
					{t('Label_General_Submit')}
				</Button>
				<Button className='w-full' type='cancel'>
					{t('Label_General_Cancel')}
				</Button>
			</div>
		</div>
	)
}
