import { ITableColumns, Table } from '@noble888/src/components/common'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { type ICustTpBetRecordDetailListbyGameTypeData } from 'JF-api/payment/type'
import { numberFormat, revertTimeZone } from 'JF-core'
import { useStatementStore } from 'JF-operations'

const ByDetailStatementTable = () => {
	const { t } = useClientTranslation()
	const { gameTypeStatementData } = useStatementStore()
	// todo: currencyId 需要從。userInfo獲取現在先寫死
	const currencyId = 3

	const totalTurnOver = gameTypeStatementData
		.reduce((sum, item) => sum + (item.turnOver || 0), 0)
		.toFixed(2)

	const totalWinlostAmount = gameTypeStatementData
		.reduce((sum, item) => sum + (item.winlostAmount || 0), 0)
		.toFixed(2)

	const columns = [
		{
			title: t('Label_General_TransId'),
			dataIndex: 'transId',
			key: 'transId',
		},
		{
			title: t('Label_General_BonusId'),
			dataIndex: 'bonusId',
			key: 'bonusId',
		},
		{
			title: t('Label_General_BonusCode'),
			dataIndex: 'bonusCode',
			key: 'bonusCode',
		},
		{
			title: t('Label_General_Turnover'),
			dataIndex: 'turnOver',
			key: 'turnOver',
			render: ({ item: { turnOver } }: { item: { turnOver: number } }) =>
				numberFormat(turnOver, currencyId, 2),
		},
		{
			title: t('Label_General_ValidBet'),
			dataIndex: 'validBet',
			key: 'validBet',
			render: ({ item: { validBet } }: { item: { validBet: number } }) =>
				numberFormat(validBet, currencyId, 2),
		},
		{
			title: t('Label_General_WinlostAmount'),
			dataIndex: 'winlostAmount',
			key: 'winlostAmount',
			render: ({
				item: { winlostAmount },
			}: {
				item: { winlostAmount: number }
			}) => numberFormat(winlostAmount, currencyId, 2),
		},
		{
			title: `${t('Label_General_SettledDate')}`,
			dataIndex: 'settledTime',
			key: 'settledTime',
			render: ({ item: { settledTime } }: { item: { settledTime: string } }) =>
				revertTimeZone(settledTime).format('YYYY-MM-DD HH:mm:ss'),
		},
	]

	return (
		<Table
			dataSource={gameTypeStatementData}
			columns={
				columns as ITableColumns<ICustTpBetRecordDetailListbyGameTypeData>[]
			}
			footer={() => (
				<>
					<p className='text-sm font-bold '>
						{t('Label_General_TurnOverTotal')}：<span>{totalTurnOver}</span>
					</p>
					&nbsp;&nbsp;
					<p className='text-sm font-bold'>
						{t('Label_General_WinlostAmountTotal')}：
						<span>{totalWinlostAmount}</span>
					</p>
				</>
			)}
		/>
	)
}

export default ByDetailStatementTable
