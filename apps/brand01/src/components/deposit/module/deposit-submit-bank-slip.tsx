'use client'

import Button from '@brand01/src/components/button'
import ModuleWrapper from '@brand01/src/components/deposit/module/moudle-wrapper'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { ChangeEvent, Dispatch, DragEvent, SetStateAction } from 'react'

export default function DepositSubmitBankSlip({
	locale,
	imageFile,
	setImageFile,
	onImageFileChange,
	errorMessage,
}: {
	locale: string
	imageFile: File | null
	setImageFile: Dispatch<SetStateAction<File | null>>
	onImageFileChange: (
		event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLLabelElement>,
	) => void
	errorMessage: string
}) {
	const { t } = useClientTranslation(locale)

	return (
		<ModuleWrapper>
			<h2 className='mb-4 text-center text-base font-bold'>
				{t('Label_Deposit_SubmitProof')}
			</h2>
			<p className='text-center'>{t('Label_History_AttachFile_Required')}.</p>
			<ul className='mb-4 list-inside list-disc text-center'>
				<li>{t('Label_History_BankSlipHint1')}</li>
				<li>{t('Label_History_BankSlipHint2')}</li>
				<li>{t('Label_History_BankSlipHint3')}</li>
			</ul>
			<input
				type='file'
				id='file-upload'
				accept='image/*'
				className='invisible z-10 h-full w-full hover:cursor-pointer'
				onChange={onImageFileChange}
			/>
			<label
				htmlFor='file-upload'
				className='bg-secondary-500 border-secondary-300 hover:bg-secondary-400/80  flex h-48 cursor-pointer items-center justify-center rounded-lg border-2'
			>
				{imageFile ? (
					<img
						className='h-full w-full object-contain '
						src={URL.createObjectURL(imageFile)}
						alt='upload-file'
					/>
				) : (
					<div className='text-secondary-300 text-4xl'>+</div>
				)}
			</label>
			<div className='-mt-12 mb-12 text-center text-neutral-300'>
				{errorMessage}
			</div>

			<Button
				className='mt-4 w-full'
				onClick={() => setImageFile(null)}
				size='xl'
				desktopSize='xl'
				h='sm'
				type='cancel'
			>
				{t('Label_General_Cancel')}
			</Button>
		</ModuleWrapper>
	)
}
