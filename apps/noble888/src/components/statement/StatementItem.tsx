import { useClientTranslation } from '@noble888/src/i18n/client'
import { CURRENCY_TO_TIMEZONE } from 'JF-constants'
import { cn, numberFormat, revertTimeZone } from 'JF-core'
import { TableTypeEnum, useStatementStore } from 'JF-operations'
import { useMediaQuery } from 'usehooks-ts'

interface IStatementvalueProps {
	settledDate?: string
	settledTime?: string
	turnOver?: number
	validBet?: number
	winlostAmount?: number
	categoryName?: string
	gameTypeName?: string
	categoryId?: number
	gameTypeID?: number
	transId?: string
	bonusId?: number
	bonusCode?: string | null
	index: number
}

const StatementItem = (props: IStatementvalueProps) => {
	const { activeTable, fetchDataByTableType } = useStatementStore()
	const { t } = useClientTranslation()
	const isPad = useMediaQuery('(min-width: 768px)')

	// todo:之後使用 userInfo 資料，先寫死
	const currencyId = 3

	// 手機錯開顏色用
	const isEvenItem = props.index % 2 === 0

	// 平板錯開顏色用
	const rowIndex = Math.floor(props.index / 2)
	const isEvenRow = rowIndex % 2 === 0

	// 渲染單一項目
	const renderValue = (
		label: string,
		value?: string | number | React.ReactNode,
	) => {
		const isNode = typeof value !== 'string' || typeof value !== 'number'

		return (
			<div className='flex flex-col'>
				<span className='text-primary-700 mb-2 text-sm font-bold'>{label}</span>
				{isNode && value}
				{!isNode && (
					<span className='mt-1 text-sm text-gray-700'>{value ?? '-'}</span>
				)}
			</div>
		)
	}

	// 根據 activeTable 回傳不同的內容
	const getStatementData = () => {
		switch (activeTable) {
			case TableTypeEnum.DateRangeStatementTable:
				return (
					<>
						{renderValue(
							`${t('Label_General_SettledDate')} (${CURRENCY_TO_TIMEZONE[currencyId]})`,
							revertTimeZone(props.settledTime ?? '').format(
								'YYYY-MM-DD HH:mm:ss',
							),
						)}
						{renderValue(
							t('Label_General_Turnover'),
							numberFormat(props.turnOver ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_General_ValidBet'),
							numberFormat(props.validBet ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_General_WinlostAmount'),
							numberFormat(props.winlostAmount ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_General_WinlostAmount'),
							numberFormat(props.winlostAmount ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_History_Action'),
							<button
								className='rounded bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600'
								onClick={() => {
									useStatementStore.setState({
										selDate: revertTimeZone(props.settledDate as string).format(
											'YYYY-MM-DD',
										),
									})
									fetchDataByTableType(TableTypeEnum.ByDayStatementTable)
								}}
							>
								{t('Label_General_Details')}
							</button>,
						)}
					</>
				)
			case TableTypeEnum.ByDayStatementTable:
				return (
					<>
						{renderValue(
							`${t('Label_General_SettledDate')} (${CURRENCY_TO_TIMEZONE[currencyId]})`,
							revertTimeZone(props.settledTime ?? '').format(
								'YYYY-MM-DD HH:mm:ss',
							),
						)}
						{renderValue(t('Label_General_CategoryName'), props.categoryName)}
						{renderValue(
							t('Label_General_Turnover'),
							numberFormat(props.turnOver ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_General_ValidBet'),
							numberFormat(props.validBet ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_General_WinlostAmount'),
							numberFormat(props.winlostAmount ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_History_Action'),
							<button
								className='rounded bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600'
								onClick={() => {
									useStatementStore.setState({
										categoryId: props.categoryId,
										selDate: revertTimeZone(props.settledDate as string).format(
											'YYYY-MM-DD',
										),
									})
									fetchDataByTableType(TableTypeEnum.ByCategoryStatementTable)
								}}
							>
								{t('Label_General_Details')}
							</button>,
						)}
					</>
				)

			case TableTypeEnum.ByCategoryStatementTable:
				return (
					<>
						{renderValue(
							`${t('Label_General_SettledDate')} (${CURRENCY_TO_TIMEZONE[currencyId]})`,
							revertTimeZone(props.settledTime ?? '').format(
								'YYYY-MM-DD HH:mm:ss',
							),
						)}
						{renderValue(t('Label_General_GameTypeName'), props.gameTypeName)}
						{renderValue(
							t('Label_General_Turnover'),
							numberFormat(props.turnOver ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_General_ValidBet'),
							numberFormat(props.validBet ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_General_WinlostAmount'),
							numberFormat(props.winlostAmount ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_History_Action'),
							<button
								className='rounded bg-orange-500 px-4 py-2 text-sm font-bold text-white hover:bg-orange-600'
								onClick={() => {
									useStatementStore.setState({
										gameTypeID: props.gameTypeID,
										selDate: revertTimeZone(props.settledDate as string).format(
											'YYYY-MM-DD',
										),
									})
									fetchDataByTableType(TableTypeEnum.ByDetailStatementTable)
								}}
							>
								{t('Label_General_Details')}
							</button>,
						)}
					</>
				)

			case TableTypeEnum.ByDetailStatementTable:
				return (
					<>
						{renderValue(
							`${t('Label_General_SettledDate')} (${CURRENCY_TO_TIMEZONE[currencyId]})`,
							revertTimeZone(props.settledTime ?? '').format(
								'YYYY-MM-DD HH:mm:ss',
							),
						)}
						{renderValue(
							t('Label_General_Turnover'),
							numberFormat(props.turnOver ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_General_ValidBet'),
							numberFormat(props.validBet ?? 0, currencyId, 2),
						)}
						{renderValue(
							t('Label_General_WinlostAmount'),
							numberFormat(props.winlostAmount ?? 0, currencyId, 2),
						)}
						{renderValue(t('Label_General_BonusCode'), props.bonusCode)}
						{renderValue(t('Label_General_BonusId'), props.bonusId)}
						{renderValue(t('Label_General_TransId'), props.transId)}
					</>
				)
		}
	}

	return isPad ? (
		<div
			className={cn(' grid grid-cols-2 gap-4 rounded-md p-4 shadow', {
				'bg-primary-50': isEvenRow,
				'bg-primary-100': !isEvenRow,
			})}
		>
			{getStatementData()}
		</div>
	) : (
		<div
			className={cn(' grid grid-cols-2 gap-4 rounded-md p-4 shadow', {
				'bg-primary-50': isEvenItem,
				'bg-primary-100': !isEvenItem,
			})}
		>
			{getStatementData()}
		</div>
	)
}

export default StatementItem
