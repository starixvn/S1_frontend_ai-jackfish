import Button from '@brand01/src/components/button'
import Input from '@brand01/src/components/input'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { imageUrl } from 'JF-core'
import { useSetSpecialCode } from 'JF-operations'
import { MoonLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const PromotionCode: React.FC = () => {
	const { t } = useClientTranslation()
	const { form, handleFormSubmit, isSubmitting } = useSetSpecialCode({
		successCallback: () => toast.success(t('Label_General_Success')),
		errorCallback: message => toast.error(message),
	})

	return (
		<div className='flex h-full flex-col items-center overflow-y-auto'>
			<header className='mb-4 text-center text-xl'>
				{t('Label_Profile_PromoCode')}
			</header>
			<img
				className='mt-4 h-[111px] w-[126px]'
				src={imageUrl('/img/popup/popup-coupon.png')}
				alt='profile icon'
			/>
			<form
				onSubmit={handleFormSubmit}
				className='mt-4 w-full flex-1 flex-col justify-between max-lg:flex lg:w-[288px]'
			>
				<Input
					icon='icon-couponcode'
					register={form.register('specialCode')}
					dirty={!!form.formState.dirtyFields['specialCode']}
					placeholder={t('Label_Profile_PromoCode')}
					required
				/>
				<Button
					htmlType='submit'
					className='mt-16 h-[50px] w-full'
					type='secondary'
					isDisabled={isSubmitting}
				>
					{isSubmitting ? (
						<MoonLoader size={16} className='bg-transparent' />
					) : (
						t('Label_General_Confirm')
					)}
				</Button>
			</form>
		</div>
	)
}

export default PromotionCode
