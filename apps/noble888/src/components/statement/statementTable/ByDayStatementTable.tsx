import { ITableColumns, Table } from '@noble888/src/components/common'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { type ICustTpBetRecordListOneDayData } from 'JF-api/payment/type'
import { numberFormat, revertTimeZone } from 'JF-core'
import { TableTypeEnum, useStatementStore } from 'JF-operations'

const ByDayStatementTable = () => {
	const { t } = useClientTranslation()
	const { oneDayStatementData, fetchDataByTableType } = useStatementStore()

	// todo: currencyId 需要從。userInfo獲取現在先寫死
	const currencyId = 3

	const columns = [
		{
			title: `${t('Label_General_SettledDate')} `,
			dataIndex: 'settledDate',
			key: 'settledDate',
			render: ({ item: { settledDate } }: { item: { settledDate: string } }) =>
				revertTimeZone(settledDate).format('YYYY-MM-DD'),
		},
		{
			title: t('Label_General_CategoryName'),
			dataIndex: 'categoryName',
			key: 'categoryName',
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
				item: { settledDate, categoryId },
			}: {
				item: { settledDate: string; categoryId: number }
			}) => (
				<button
					onClick={() => {
						useStatementStore.setState({
							categoryId,
							selDate: revertTimeZone(settledDate).format('YYYY-MM-DD'),
						})
						fetchDataByTableType(TableTypeEnum.ByCategoryStatementTable)
					}}
					className=' bg-primary-500 rounded px-5 py-1 text-sm font-bold text-white'
				>
					{t('Label_General_Details')}
				</button>
			),
		},
	]

	return (
		<Table
			dataSource={oneDayStatementData}
			columns={columns as ITableColumns<ICustTpBetRecordListOneDayData>[]}
		/>
	)
}

export default ByDayStatementTable
