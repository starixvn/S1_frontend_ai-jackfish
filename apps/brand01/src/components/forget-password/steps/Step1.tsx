import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { resetPwdByOTP } from 'JF-api/site/client'
import { AREA_CODE_BY_CURRENCY } from 'JF-constants'
import { imageUrl, useGetPathname } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

interface IStep1Props {
	goToNextStep: () => void
}

const Step1 = ({ goToNextStep }: IStep1Props) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	const {
		userInfo: { currencyId },
	} = useAuthStore()

	const {
		formState: { errors, dirtyFields },
		trigger,
		register,
		getValues,
	} = useFormContext()

	const handleGetOTP = async () => {
		const isPhoneValid = await trigger('phoneNo')
		if (isPhoneValid) {
			const { areaCode, phoneNo } = getValues()
			try {
				await resetPwdByOTP({
					areaCode,
					phoneNo,
				})
				goToNextStep()
			} catch (error) {
				toast.error((error as Error).message)
			}
		}
	}

	return (
		<>
			<div className='grid place-items-center'>
				<img
					className='h-20 w-20'
					src={imageUrl('/img/popup/popup-join.png')}
					alt='join'
				/>
			</div>
			<div className='mt-3.5 w-full lg:mt-2.5'>
				<Input
					register={register('phoneNo')}
					type='number'
					placeholder={t('Label_General_Phone') || ''}
					title={AREA_CODE_BY_CURRENCY[currencyId]}
					icon='icon-phone'
					error={!!errors['phoneNo']}
					errorMessage={errors['phoneNo']?.message as string}
					dirty={!!dirtyFields['phoneNo']}
				/>
			</div>
			<Button
				htmlType='button'
				type='secondary'
				className='h-12 w-full'
				onClick={handleGetOTP}
			>
				{t('Label_General_Confirm')}
			</Button>
		</>
	)
}

export { Step1 }
