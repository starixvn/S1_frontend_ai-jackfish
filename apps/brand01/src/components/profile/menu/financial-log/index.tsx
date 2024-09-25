import Button from '@brand01/src/components/button'
import dayjs from 'dayjs'
import { getFinancialLog } from 'JF-api/payment/client'
import { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useTranslation } from 'react-i18next'
import { SyncLoader } from 'react-spinners'
import { toast } from 'react-toastify'

interface IFinancialLogItem {
	createTime: string
	refTransId: string
	typeName: string
	beforeAmount: number
	changeAmount: number
	afterAmount: number
}

const FinancialLog = () => {
	const { t } = useTranslation()
	const [hasSearched, setHasSearched] = useState<boolean>(false)
	const [startDate, setStartDate] = useState<Date | null>(new Date())
	const [endDate, setEndDate] = useState<Date | null>(new Date())
	const [financialLogs, setFinancialLogs] = useState<IFinancialLogItem[]>([])
	const [isInitialLoading, setIsInitialLoading] = useState<boolean>(false)
	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
	const [pageNumber, setPageNumber] = useState<number>(1)
	const [hasMoreData, setHasMoreData] = useState<boolean>(true) // 是否有更多資料
	const logContainerRef = useRef<HTMLDivElement>(null)

	const handleStartDate = (date: Date | null) => {
		setStartDate(date)
	}

	const handleEndDate = (date: Date | null) => {
		setEndDate(date)
	}

	const handleQuickPick = (type: string) => {
		let tempEndDate = dayjs()
		let tempStartDate = dayjs()

		switch (type) {
			case 'today':
				break
			case 'yesterday':
				tempStartDate = tempEndDate.subtract(1, 'day')
				tempEndDate = tempStartDate
				break
			case 'thisWeek':
				tempStartDate = tempEndDate.startOf('week')
				break
			case 'lastWeek':
				tempStartDate = tempEndDate.subtract(1, 'week').startOf('week')
				tempEndDate = tempStartDate.endOf('week')
				break
			case 'thisMonth':
				tempStartDate = tempEndDate.startOf('month')
				break
			case 'lastMonth':
				tempStartDate = tempEndDate.subtract(1, 'month').startOf('month')
				tempEndDate = tempStartDate.endOf('month')
				break
			default:
				return // 如果選項不符合任何已知類型，則不進行操作
		}

		setStartDate(tempStartDate.toDate())
		setEndDate(tempEndDate.endOf('day').toDate())
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
			setFinancialLogs([]) // 清空現有資料
			setIsInitialLoading(true)
			setHasSearched(false)
			setPageNumber(1) // 搜尋時將頁碼重置為 1
			setHasMoreData(true) // 重置是否有更多資料的狀態

			try {
				const startDateString = dayjs(startDate).format('YYYY-MM-DD')
				const endDateString = dayjs(endDate)
					.endOf('day')
					.format('YYYY-MM-DD HH:mm:ss')
				const financialLog = await getFinancialLog(
					startDateString,
					endDateString,
					1, // 頁碼為 1
				)
				setFinancialLogs(financialLog)
				setPageNumber(2) // 設定下一頁為 2
				if (financialLog.length === 0) {
					setHasMoreData(false)
				}
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('Error fetching financial log:', error)
			} finally {
				setIsInitialLoading(false)
				setHasSearched(true)
			}
		} else {
			toast.error('Please select both start and end dates.')
		}
	}

	useEffect(() => {
		const container = logContainerRef.current
		if (!container) return

		const handleScroll = async () => {
			if (isInitialLoading || isLoadingMore || !hasMoreData) return

			const { scrollTop, scrollHeight, clientHeight } = container
			if (scrollTop + clientHeight >= scrollHeight - 50) {
				setIsLoadingMore(true)
				try {
					if (startDate && endDate) {
						const startDateString = dayjs(startDate).format('YYYY-MM-DD')
						const endDateString = dayjs(endDate)
							.endOf('day')
							.format('YYYY-MM-DD HH:mm:ss')
						const financialLogResponse = await getFinancialLog(
							startDateString,
							endDateString,
							pageNumber,
						)
						if (financialLogResponse.length > 0) {
							setFinancialLogs(prevLogs => [
								...prevLogs,
								...financialLogResponse,
							])
							setPageNumber(prevPage => prevPage + 1)
						} else {
							setHasMoreData(false)
						}
					}
				} catch (error) {
					// eslint-disable-next-line no-console
					console.error('Error fetching financial log:', error)
					toast.error('Error fetching financial log.')
				} finally {
					setIsLoadingMore(false)
				}
			}
		}

		container.addEventListener('scroll', handleScroll)

		return () => {
			container.removeEventListener('scroll', handleScroll)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [startDate, endDate, pageNumber, isLoadingMore, hasMoreData])

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

				{/* 初始搜尋的 Loading 指示器 */}
				{isInitialLoading && (
					<div className='absolute top-[30vh] left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center lg:top-[13vh]'>
						<SyncLoader color='#E1E1E1' />
					</div>
				)}

				{/* 如果搜尋沒結果就顯示對應字串 */}
				{!isInitialLoading && hasSearched && financialLogs.length === 0 && (
					<div className='absolute top-[30vh] left-1/2 flex w-full -translate-x-1/2 -translate-y-1/2 transform items-center justify-center lg:top-[13vh]'>
						<span className='text-gray-500'>{t('Label_General_NoData')}</span>
					</div>
				)}

				<div
					className='h-[650px] space-y-4 overflow-y-scroll pb-6 lg:h-[385px]'
					ref={logContainerRef}
				>
					{financialLogs.length > 0 && (
						<div>
							{financialLogs.map(log => (
								// wrapper
								<div
									className='lg:leading-0 mx-2 mt-4 rounded-xl bg-white pl-2 pr-4 text-sm leading-3 text-black lg:text-base '
									key={log.refTransId} // 確保唯一 key
								>
									{/* 1 */}
									<div className='flex justify-between '>
										<div className='text-tertiary-500 text-md px-2 py-2'>
											{dayjs(log.createTime).format('MM/DD/YYYY hh:mm:ss A')}
										</div>
										<div className='flex flex-row items-center'>
											<div className='text-neutral-300'>
												{t('Label_General_TransId')}
											</div>
											<div className='text-tertiary-500 px-2 py-2 font-bold'>
												{log.refTransId}
											</div>
										</div>
									</div>
									{/* 2 */}
									<div className='div'>
										<div className='px-2 text-neutral-300'>
											{t('Label_History_TypeName')}
										</div>
										<div className='px-2 py-2 text-lg font-bold  text-neutral-500 '>
											{log.typeName}
										</div>
									</div>
									{/* 3 */}
									<div className='flex justify-between'>
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
												<div className='text-neutral-300'>
													{t('Label_History_ChangeAmount')}
												</div>
												<div className='text-tertiary-500 px-2 py-2 font-bold'>
													{log.changeAmount}
												</div>
											</div>
										</div>
										<div>
											<div className='text-neutral-300'>
												{t('Label_History_AfterAmount')}
											</div>
											<div className='text-secondary-300 px-2 py-2 font-bold'>
												{log.afterAmount}
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					)}

					{/* 後續加載的 Loading 指示器 */}
					{isLoadingMore && (
						<div className='flex items-center justify-center py-4'>
							<SyncLoader color='#E1E1E1' />
						</div>
					)}

					{/* 無更多數據的提示 */}
					{hasMoreData === false &&
						!isInitialLoading &&
						financialLogs.length > 0 && (
							<div className='flex items-center justify-center py-4'>
								<span className='text-gray-500'>
									{t('This is the end of the result')}
								</span>
							</div>
						)}
				</div>
			</div>
		</div>
	)
}

export default FinancialLog
