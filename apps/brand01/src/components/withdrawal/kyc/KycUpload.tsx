import { useClientTranslation } from '@brand01/src/i18n/client'
import { cn, useGetPathname } from 'JF-core'
import { Uploader } from './Uploader'

export const KycUpload = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	return (
		<div
			className={cn(
				'bg-tertiary-500 grid grid-flow-row  gap-6 rounded-2xl p-8 text-center',
			)}
		>
			<h2 className='text-xl '>{t('Label_Withdrawal_SubmitPhotoId')}</h2>
			<div className='text-primary-200 grid grid-flow-row gap-0.5 text-xs'>
				<span>{t('Label_Withdrawal_SubmitPhotoIdListTitle')}</span>
				<span>{`${t('Label_Withdrawal_ImageUploadWarning')} ${t('Label_Withdrawal_ImageJpgPngOnly')}`}</span>
			</div>
			<Uploader />
		</div>
	)
}
