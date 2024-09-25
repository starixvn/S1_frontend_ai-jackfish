'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { cn } from 'JF-core'
import { usePromotionDetail } from 'JF-operations'
import { FC, useState } from 'react'
import { toast } from 'react-toastify'
import Loading from '../loading'
import Modal from '../modal'
import PromotionClaimForm from './PromotionClaimForm'
import PromotionDetails from './PromotionDetails'

interface PromotionDetailsModalProps {
	bonusCode: string
	onClose: () => void
}

const PromotionDetailsModal: FC<PromotionDetailsModalProps> = ({
	bonusCode,
	onClose,
}) => {
	const { t } = useClientTranslation()
	const [isEnteringAmount, setIsEnteringAmount] = useState(false)

	const { data, isLoading, claimPromotion } = usePromotionDetail({
		bonusCode,
		errorCallback: toast.error,
		amountCallback: () => setIsEnteringAmount(true),
		successCallback: () => {
			toast.success(t('Label_Promotion_SuccessClaimed2'))
			setIsEnteringAmount(false)
		},
	})

	return (
		<Modal
			isOpen
			closeOnOverlayClick
			size='sm'
			onClose={onClose}
			className={cn('flex flex-col pb-4', { 'lg:h-auto': isEnteringAmount })}
		>
			{isLoading ? (
				<Loading className='h-full bg-transparent' />
			) : !data ? (
				<div>{t('Label_General_NoData')}</div>
			) : isEnteringAmount ? (
				<PromotionClaimForm
					data={data}
					onCancel={() => setIsEnteringAmount(false)}
					onSubmit={claimPromotion}
				/>
			) : (
				<PromotionDetails data={data} onClaim={() => claimPromotion()} />
			)}
		</Modal>
	)
}

export default PromotionDetailsModal
