import { ITableColumns, Table } from '@noble888/src/components/common'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { type ICustTpBetRecordListbyCategoryIdData } from 'JF-api/payment/type'
import { CURRENCY_TO_TIMEZONE } from 'JF-constants'
import { numberFormat, revertTimeZone } from 'JF-core'
import { TableTypeEnum, useAuthStore, useStatementStore } from 'JF-operations'

const ByCategoryStatementTable = () => {
	const { t } = useClientTranslation()
	const { categoryStatementData, fetchDataByTableType } = useStatementStore()
	const {
		userInfo: { currencyId },
	} = useAuthStore()

	const columns = [
		{
			title: `${t('Label_General_SettledDate')} (${
				CURRENCY_TO_TIMEZONE[currencyId]
			})`,
			dataIndex: 'settledDate',
			key: 'settledDate',
			render: ({ item: { settledDate } }: { item: { settledDate: string } }) =>
				revertTimeZone(settledDate).format('YYYY-MM-DD'),
		},
		{
			title: t('Label_General_GameTypeName'),
			dataIndex: 'gameTypeName',
			key: 'gameTypeName',
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
			title: t('Label_History_Action'),
			key: 'action',
			render: ({
				item: { settledDate, gameTypeID },
			}: {
				item: { settledDate: string; gameTypeID: number }
			}) => (
				<button
					onClick={() => {
						useStatementStore.setState({
							gameTypeID,
							selDate: revertTimeZone(settledDate).format('YYYY-MM-DD'),
						})
						fetchDataByTableType(TableTypeEnum.ByDetailStatementTable)
					}}
					className=' bg-secondary-500 rounded px-5 py-1 text-sm font-bold text-white'
				>
					{t('Label_General_Details')}
				</button>
			),
		},
	]

	return (
		<Table
			dataSource={categoryStatementData}
			columns={columns as ITableColumns<ICustTpBetRecordListbyCategoryIdData>[]}
		/>
	)
}

export default ByCategoryStatementTable
