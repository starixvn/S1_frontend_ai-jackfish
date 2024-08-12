import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { verifyOTP } from 'JF-api/site/client'
import { imageUrl, useGetPathname } from 'JF-core'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

interface IStep2Props {
	goToNextStep: () => void
}

const Step2 = ({ goToNextStep }: IStep2Props) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)

	const {
		formState: { errors, dirtyFields },
		register,
		trigger,
		getValues,
	} = useFormContext()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handleConfirmOTP = async () => {
		const isOtpCodeValid = await trigger('otpCode')
		if (isOtpCodeValid) {
			const { areaCode, phoneNo, otpCode } = getValues()
			try {
				setIsLoading(true)
				await verifyOTP({
					areaCode,
					phoneNo,
					inputOTPcode: otpCode,
				})
				goToNextStep()
			} catch (error) {
				toast.error((error as Error).message ?? t('Label_Profile_OTPInvalid'))
			} finally {
				setIsLoading(false)
			}
		}
	}

	return (
		<>
			<div className='grid place-items-center'>
				<img
					className='h-20 w-20'
					src={imageUrl('/img/popup/popup-sms.png')}
					alt='sms'
				/>
			</div>
			<div className='mt-3.5 w-full lg:mt-2.5'>
				<Input
					register={register('otpCode')}
					placeholder={t('Label_OTP') || ''}
					icon='icon-phone'
					error={!!errors['otpCode']}
					errorMessage={errors['otpCode']?.message as string}
					dirty={!!dirtyFields['otpCode']}
				/>
			</div>
			<Button
				htmlType='button'
				type='secondary'
				className='h-12 w-full'
				loading={isLoading}
				onClick={handleConfirmOTP}
			>
				{t('Label_General_Confirm')}
			</Button>
		</>
	)
}

export { Step2 }
