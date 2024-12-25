import { cn } from 'JF-core'
import React, { ReactNode } from 'react'

export interface ITableColumns<T> {
	title: string | React.ReactNode
	dataIndex: keyof T
	key: string
	render?: ({ item, index }: { item: T; index: number }) => React.ReactNode
}

export interface ITableProps<T> {
	dataSource: T[]
	columns: ITableColumns<T>[]
	footer?: () => ReactNode
}

/**
 * Table - 通用表格組件
 *
 * 此組件根據傳入的數據 (`dataSource`) 和欄位定義 (`columns`) 動態渲染表格內容。
 * 支援客製化渲染單元格內容（`render`）和表格底部（`footer`）。
 *
 * @param dataSource 表格的數據來源，必須是物件陣列。
 * @param columns 表格的欄位結構，包含標題、數據索引和自定義渲染邏輯。
 * @param footer （可選）表格底部的自定義內容。
 *
 * @example
 * import Table, { ITableColumns } from './Table'
 *
 * interface IUser {
 *   name: string
 *   age: number
 * }
 *
 * const data: IUser[] = [
 *   { name: "Alice", age: 30 },
 *   { name: "Bob", age: 25 }
 * ]
 *
 * const columns: ITableColumns<IUser>[] = [
 *   { title: "Name", dataIndex: "name", key: "name" },
 *   { title: "Age", dataIndex: "age", key: "age" },
 *   {
 *     title: "Custom",
 *     key: "custom",
 *     render: ({ item }) => <span>{item.name} is {item.age} years old</span>
 *   }
 * ]
 *
 * <Table dataSource={data} columns={columns} footer={() => <div>Total: 2 Users</div>} />
 */
const Table = <T,>({ dataSource, columns, footer }: ITableProps<T>) => {
	const isOddRecordCount = dataSource.length % 2 === 1
	/**
	 * 渲染表格的直行
	 *
	 * @param item - 當前直行
	 * @param rowIndex - 當橫列的索引值  */
	const renderColumns = (item: T, rowIndex: number) =>
		columns.map((column, colIndex) => {
			// 判斷是否為最後一直行
			const isLastColumn = colIndex === columns.length - 1

			return (
				<td
					key={column.key}
					className={cn(
						'border-gray-300 px-4 py-5 text-center text-sm text-black ',
						{
							// 若不是最後一直行，則添加右邊框
							'border-e': !isLastColumn,
						},
					)}
				>
					{/**
					 * 判斷當前直行是否有自定義 render 函數:
					 * - 如果有，調用 render 方法，並傳入當前橫列的資料與 index 。
					 * - 如果沒有，顯示 item 中 dataIndex 所對應的數據。 */}
					{column.render
						? column.render({ item, index: rowIndex })
						: (item[column.dataIndex] as ReactNode)}
				</td>
			)
		})

	return (
		<div className='max-w-full overflow-x-auto rounded-lg'>
			<table className='w-full border-separate border-spacing-0'>
				{/* 表格標題 */}
				<thead>
					<tr className='bg-secondary-500 text-white'>
						{columns.map(column => (
							<th
								key={column.key}
								className='px-4 py-3 text-center text-sm font-medium'
							>
								{column.title}
							</th>
						))}
					</tr>
				</thead>

				{/* 表格內容 */}
				<tbody>
					{dataSource.map((item, index) => (
						<tr
							key={index}
							className={
								index % 2 === 0 ? 'bg-white' : 'bg-gray-200' // 偶數行不同背景顏色
							}
						>
							{renderColumns(item, index)}
						</tr>
					))}
				</tbody>
			</table>
			{/* 表格底部 */}
			{footer && (
				<div
					className={cn(
						'flex justify-end bg-gray-50 px-4 py-3 text-right text-sm font-bold',
						{
							'bg-white': !isOddRecordCount,
						},
					)}
				>
					{footer()}
				</div>
			)}
		</div>
	)
}

export default Table
