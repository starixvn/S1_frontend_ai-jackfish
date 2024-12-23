import {
	ITableColumns,
	NoInformation,
	Table,
} from '@noble888/src/components/common'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { type ICustTpBetRecordListDateRangeData } from 'JF-api/payment/type'
import { numberFormat, revertTimeZone } from 'JF-core'
import { TableTypeEnum, useStatementStore } from 'JF-operations'

const DateRangeStatementTable = () => {
	const { t } = useClientTranslation()
	const { dateRangeStatementData, fetchDataByTableType } = useStatementStore()

	const hasData = dateRangeStatementData.length > 0

	// todo: currencyId 需要從。userInfo獲取現在先寫死
	const currencyId = 3

	const columns = [
		{
			title: t('Label_General_SettledDate'),
			dataIndex: 'settledDate',
			key: 'settledDate',
			render: ({
				item: { settledDate },
			}: {
				item: { settledDate: string }
			}) => {
				return revertTimeZone(settledDate).format('YYYY-MM-DD')
			},
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
			dataIndex: 'settledDate',
			key: 'action',
			render: ({
				item: { settledDate },
			}: {
				item: { settledDate: string }
			}) => (
				<button
					onClick={() => {
						useStatementStore.setState({
							selDate: revertTimeZone(settledDate).format('YYYY-MM-DD'),
						})
						fetchDataByTableType(TableTypeEnum.ByDayStatementTable)
					}}
					className=' bg-primary-500 rounded px-5 py-1 text-sm font-bold text-white'
				>
					{t('Label_General_Details')}
				</button>
			),
		},
	]

	return (
		<>
			<Table
				dataSource={dateRangeStatementData}
				columns={columns as ITableColumns<ICustTpBetRecordListDateRangeData>[]}
			/>
			{!hasData && <NoInformation />}
		</>
	)
}

export default DateRangeStatementTable
