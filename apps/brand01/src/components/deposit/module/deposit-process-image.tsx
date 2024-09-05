import ModuleWrapper from '@brand01/src/components/deposit/module/moudle-wrapper'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { imageUrl, useGetPathname } from 'JF-core'
import { useDepositStore, useSocialChannelStore } from 'JF-operations'
import { find } from 'lodash-es'
import { parseAsInteger, useQueryStates } from 'nuqs'
import { Trans } from 'react-i18next'

export default function DepositProcessImage() {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { runningDepositRequestList } = useDepositStore()
	const [paymentQuery] = useQueryStates({
		sysId: parseAsInteger,
	})
	const { lineChannel } = useSocialChannelStore()

	const selectedTransId = find(
		runningDepositRequestList,
		item => item.bankInfo.sysId === paymentQuery.sysId,
	)?.transId

	return (
		<ModuleWrapper>
			<div className='bg-tertiary-500 grid grid-flow-row  gap-6 rounded-2xl p-8 text-center'>
				<div className='grid gap-2 '>
					<img
						className='h-24 place-self-center '
						src={imageUrl('/img/icon/financial-transactions/icon-pendding.svg')}
						alt='process-image'
					/>
					<h2 className='text-check-200 text text-2xl font-bold uppercase'>
						{t('Label_Withdrawal_Status1')}
					</h2>
				</div>
			</div>

			<div className='grid grid-flow-row gap-y-3 text-center'>
				<p className='text-xs font-semibold text-neutral-300'>
					{t('Label_History_RefTransId')}
				</p>
				<p className='text-2xl font-semibold'>{selectedTransId}</p>
				<div className='grid grid-flow-row gap-0.5 text-xs text-neutral-300'>
					<p>{t('Label_Processing_Result_Info')}</p>

					<p className=' text-xs font-semibold'>
						<Trans
							i18nKey='Label_Withdrawal_Processing_ContactHint'
							components={{
								Link: <a className='text-check-200' href={lineChannel?.link} />,
							}}
						/>
					</p>
				</div>
			</div>
		</ModuleWrapper>
	)
}
