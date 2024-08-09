import Button from '@brand01/src/components/button'
import { getFinancialLog } from 'JF-api/payment/client'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { SyncLoader } from 'react-spinners'


interface IFinancialLogItem {
	createTime: string;
	refTransId: string;
	typeName: string;
	beforeAmount: number;
	changeAmount: number;
	afterAmount: number;
  }

const FinancialLog = () => {
	const { t } = useTranslation()
	const [hasSearched, setHasSearched] = useState<boolean>(false)
	const [startDate, setStartDate] = useState<Date | null>(new Date())
	const [endDate, setEndDate] = useState<Date | null>(new Date())
	const [financialLogs, setFinancialLogs] = useState<IFinancialLogItem[]>([]) 
	const [loading, setLoading] = useState<boolean>(false)

	const handleStartDate = (date: Date | null) => {
		setStartDate(date)
	}

	const handleEndDate = (date: Date | null) => {
		setEndDate(date)
	}

	const handleQuickPick = (type: string) => {
		let tempEndDate = new Date();
		let tempStartDate = new Date();
		switch (type) {
			case 'today':
				// No changes to startDate or endDate as both will be today
				break;
			case 'yesterday':
				tempStartDate.setDate(tempEndDate.getDate() - 1);
				tempEndDate.setDate(tempEndDate.getDate() - 1);
				break;
			case 'thisWeek':
				{
					const currentDay = tempEndDate.getDay(); // 取得今天是星期幾
					tempStartDate.setDate(tempEndDate.getDate() - currentDay); // 本週一
					// End date remains today, so we cover till the end of today
				}
				break;
			case 'lastWeek':
				{
					const dayOfWeek = tempEndDate.getDay(); // 取得今天是星期幾
					tempStartDate.setDate(tempEndDate.getDate() - dayOfWeek - 7); // 上週一
					tempEndDate.setDate(tempEndDate.getDate() - dayOfWeek - 1); // 上週日
				}
				break;
			case 'thisMonth':
				tempStartDate = new Date(tempEndDate.getFullYear(), tempEndDate.getMonth(), 1); // 本月第一天
				// End date remains today, to include all of this month until today
				break;
			case 'lastMonth':
				tempStartDate = new Date(tempEndDate.getFullYear(), tempEndDate.getMonth() - 1, 1); // 上月第一天
				tempEndDate = new Date(tempEndDate.getFullYear(), tempEndDate.getMonth(), 0); // 上月最後一天
				break;
			default:
				return; // 如果選項不符合任何已知類型，則不進行操作
		}
		setStartDate(tempStartDate);
		setEndDate(tempEndDate);
	}

	const handleQuickPickChange = (
		event: React.ChangeEvent<HTMLSelectElement>,
	) => {
		const value = event.target.value
		if (value) {
			handleQuickPick(value)
		}
	}

	const handleSearch = async () => {
		if (startDate && endDate) {
			setLoading(true) // 開始加載資料
			setHasSearched(false) // 重置搜尋狀態
			try {
				const startDateString = startDate.toISOString().split('T')[0]
				const endDateString = endDate.toISOString().split('T')[0]
				// 使用 getFinancialLog 函數傳遞日期參數
				const financialLog = await getFinancialLog(
					startDateString,
					endDateString,
				)
				setFinancialLogs(financialLog)
			} catch (error) {
				console.error('Error fetching financial log:', error)
			} finally {
				setLoading(false)
				setHasSearched(true)
			}
		} else {
			alert('Please select both start and end dates.')
		}
	}

	return (
		<div className='block h-full w-full overflow-auto'>
			<div className='flex w-full justify-center pb-3'>
				<h1 className='text-xl'>{t('Label_General_FinancialLog')}</h1>
			</div>
			<div className='relative flex flex-col space-y-4'>
				<div className=' relative flex w-full space-x-2 px-3'>
					<div className='flex w-full flex-col gap-2 lg:flex-row'>
						<div className='flex w-full flex-row gap-2'>
							<div className='flex w-full items-center lg:mr-2'>
								<select
									onChange={handleQuickPickChange}
									className='bg-primary-200 text-tertiary-300 w-full rounded-lg px-2 py-2'
								>
									<option value='today'>{t('Label_History_Today')}</option>
									<option value='yesterday'>
										{t('Label_History_Yesterday')}
									</option>
									<option value='thisWeek'>
										{t('Label_History_ThisWeek')}
									</option>
									<option value='lastWeek'>
										{t('Label_History_LastWeek')}
									</option>
									<option value='thisMonth'>
										{t('Label_History_ThisMonth')}
									</option>
									<option value='lastMonth'>
										{t('Label_History_LastMonth')}
									</option>
								</select>
							</div>

							<div className='w-full'>
								<DatePicker
									showMonthDropdown
									showYearDropdown
									dropdownMode='select'
									selected={startDate}
									onChange={handleStartDate}
									className='bg-primary-200 text-tertiary-300  w-full rounded-lg  px-3  py-2 lg:w-[130px]'
									calendarClassName='bg-white border border-gray-300 rounded-lg shadow-lg'
									popperClassName='absolute z-50'
									todayButton='Today'
									popperPlacement='bottom-start'
								/>
							</div>

							<div className='w-full'>
								<DatePicker
									showMonthDropdown
									showYearDropdown
									dropdownMode='select'
									selected={endDate}
									onChange={handleEndDate}
									className='bg-primary-200 text-tertiary-300  w-full rounded-lg  px-2   py-2 lg:w-[130px]'
									calendarClassName='bg-white border border-gray-300 rounded-lg shadow-lg'
									popperClassName='absolute z-50'
									todayButton='Today'
									popperPlacement='bottom-start'
								/>
							</div>
						</div>
						<Button
							type='secondary'
							onClick={handleSearch}
							className='relative block'
						>
							{t('Label_General_Submit')}
						</Button>
					</div>
				</div>

				{loading && (
					<div className='absolute top-[30vh] left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center lg:top-[13vh]'>
						<SyncLoader color='#E1E1E1' />
					</div>
				)}

				{/* 如果搜尋沒結果就顯示對應字串 */}

				{!loading && hasSearched && financialLogs.length === 0 && (
					<div className='absolute top-[30vh] left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center lg:top-[13vh]'>
						<span className='text-gray-500'>{t('Label_General_NoData')}</span>
					</div>
				)}

				<div className='lg:h-[385px] space-y-4 pb-6 overflow-y-scroll'>
					{!loading && financialLogs.length > 0 && (
						<div>
							{financialLogs.map(log => (
								// wrapper
								<div
									className='mx-2 mt-4 rounded-xl bg-white pl-2 pr-4 text-black text-sm lg:text-base leading-3 lg:leading-0 '
									key={log.createTime}
								>
									{/* 1 */}
									<div className='flex justify-between '>
										<div className='text-tertiary-500 text-md px-2 py-2'>
											{new Date(log.createTime)
												.toLocaleString('en-US', {
													year: 'numeric',
													month: '2-digit',
													day: '2-digit',
													hour: '2-digit',
													minute: '2-digit',
													second: '2-digit',
													hour12: true, // 使用 12 小時制 (AM/PM)
												})
												.replace(',', '')}{' '}
											{/* 使用 replace 去掉逗號 */}
										</div>
										<div className='flex flex-row items-center'>
											<div className='text-neutral-300'>{t('Label_General_TransId')}</div>
											<div className='text-tertiary-500 px-2 py-2 font-bold'>
												{log.refTransId}
											</div>
										</div>
									</div>
									{/* 2 */}
									<div className='div'>
										<div className='px-2 text-neutral-300'>{t('Label_History_TypeName')}</div>
										<div className='px-2 py-2 text-lg font-bold  text-neutral-500 '>
											{log.typeName}
										</div>
									</div>
									{/* 3 */}
									<div className='bg-red flex justify-between'>
										<div className='flex flex-row space-x-5'>
											<div>
												<div className='px-2 text-neutral-300'>
													{t('Label_History_BeforeAmount')}
												</div>
												<div className='text-tertiary-500 px-2 py-2 font-bold'>
													{log.beforeAmount}
												</div>
											</div>
											<div>
												<div className='text-neutral-300'>{t('Label_History_ChangeAmount')}</div>
												<div className='text-tertiary-500 px-2 py-2 font-bold'>
													{log.changeAmount}
												</div>
											</div>
										</div>
										<div>
											<div className='text-neutral-300'>{t('Label_History_AfterAmount')}</div>
											<div className='text-secondary-300 px-2 py-2 font-bold'>
												{log.afterAmount}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default FinancialLog
