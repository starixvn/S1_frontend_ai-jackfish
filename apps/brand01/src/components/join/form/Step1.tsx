import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { TFunction } from 'i18next'
import { existsPhoneNo } from 'JF-api/site/client'
import { AREA_CODE_BY_CURRENCY } from 'JF-constants'
import { imageUrl } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { toast } from 'react-toastify'

interface IStep1Props {
	goToNextStep: () => void
	t: TFunction<string, undefined>
}

const Step1: React.FC<IStep1Props> = ({ goToNextStep, t }) => {
	const {
		userInfo: { currencyId },
	} = useAuthStore()
	const {
		formState: { errors, dirtyFields },
		register,
		trigger,
		setError,
		getValues,
		clearErrors,
	} = useFormContext()

	const [isLoading, setIsLoading] = useState<boolean>(false)

	const handlePhoneConfirm = async () => {
		const isPhoneVaild = await trigger('phoneNo')
		if (isPhoneVaild) {
			const { areaCode, phoneNo } = getValues()
			try {
				setIsLoading(true)
				const isExistsPhoneNo = await existsPhoneNo({
					areaCode,
					phoneNo,
				})
				if (isExistsPhoneNo) {
					setError('phoneNo', {
						type: 'duplicate',
						message: t('Label_Join_Phone_Exists'),
					})
				} else {
					clearErrors('phoneNo')
					goToNextStep()
				}
			} catch (error) {
				toast.error((error as Error).message)
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
				loading={isLoading}
				onClick={handlePhoneConfirm}
			>
				{t('Label_General_Confirm')}
			</Button>
		</>
	)
}

export { Step1 }
