import Button from '@brand01/src/components/button'
import React from 'react'

//   - 尺寸說明：
//     - `xs`: 適用於 `play now`, `submit` 按鈕。
//     - `sm`: 適用於 `deposit`, `withdrawal` 按鈕。
//     - `md`: 適用於 h5 `Submit`, `Cancel` 按鈕。
//     - `lg`: 適用於 desktop `Submit`, `Cancel` 按鈕。
//     - `xl`: 適用於 Universal Popup `Submit`, `Cancel` 按鈕。
//     - `2xl`: 適用於 `h5 Financial-Transactions 的 submit` 按鈕。
//     - `3xl`: 適用於 `login`,`join now`, `confirm` 按鈕。
//     - `4xl`: 適用於 `Financial Transaction (desktop) Submit` 按鈕。

// | 尺寸  | 適用場景                                     |  裝置        |
// |-------|---------------------------------------------|----------------|
// | `xs`  | `play now`, `submit`                        | 適用於所有設備  |
// | `sm`  | `deposit`, `withdrawal`                     | 適用於所有設備  |
// | `md`  | `Submit`, `Cancel`                          | 適用於 h5      |
// | `lg`  | `Submit`, `Cancel`                          | 適用於 desktop |
// | `xl`  | `Submit`, `Cancel`                          | 適用於所有設備 |
// | `2xl` | `Financial-Transactions 的 submit`          | 適用於 h5      |
// | `3xl` | `login`, `join now`, `confirm`              | 適用於所有設備  |
// | `4xl` | `Financial Transaction Submit`              | 適用於 desktop |

const page = () => {
	const buttonData = [
		{ size: 'sm', scenarios: 'deposit, withdrawal', device: '所有設備' },
		{ size: 'md', scenarios: 'Submit, Cancel (h5)', device: 'h5' },
		{ size: 'lg', scenarios: 'Submit, Cancel (desktop)', device: 'desktop' },
		{
			size: 'xl',
			scenarios: 'Submit, Cancel (Universal Popup)',
			device: '所有設備',
		},
		{
			size: '2xl',
			scenarios: 'Financial-Transactions 的 submit (h5)',
			device: 'h5',
		},
		{ size: '3xl', scenarios: 'login, join now, confirm', device: '所有設備' },
		{
			size: '4xl',
			scenarios: 'Financial Transaction Submit (desktop)',
			device: 'desktop',
		},
	]

	return (
		<>
			<div className='mx-2 mt-2 flex flex-col items-start gap-4'>
				<p className='text-white'>
					md,lg,2xl,3xl,4xl尺寸都支援rwd，使用時先以桌機尺寸開發為主，小尺寸時會自動縮小，會比較符合props的邏輯
				</p>
				<div>
					<p className='text-white'>
						尺寸 sm: 適用於 play now, submit - 適用於所有設備
					</p>
					<Button>Play Now</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸 3xl, 變體 ghost: 適用於所有設備 支持rwd
					</p>
					<Button type='ghost' size='3xl'>
						Demo
					</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸 sm, 變體 demo: 示範按鈕 - 適用於所有設備
					</p>
					<Button type='secondary'>Demo</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸 sm, 變體 demo: 示範按鈕 - 適用於所有設備
					</p>
					<Button type='cancel'>Demo</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸 sm: 適用於 deposit, withdrawal - 適用於所有設備
					</p>
					<Button size='sm'>Deposit</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸隨意: 適用於 disabled, pending - 適用於所有設備
					</p>
					<Button className='mr-2' size='sm' isDisabled={true}>
						Pending
					</Button>
					<Button size='sm' isDisabled={true}>
						Disabled
					</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸 md: 適用於 h5 Submit, Cancel - 適用於 h5
					</p>
					<Button className='mr-2' size='md'>
						Submit (H5)
					</Button>
					<Button size='md'>Cancel (H5)</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸 lg: 適用於 desktop Submit, Cancel - 適用於 desktop
					</p>
					<Button className='mr-2' size='lg'>
						Submit (Desktop)
					</Button>
					<Button size='lg'>Cancel (Desktop)</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸 xl: 適用於 Universal Popup Submit, Cancel - 適用於所有設備
					</p>
					<Button size='xl'>Submit (Universal Popup)</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸 2xl: 適用於 h5 Financial-Transactions 的 submit - 適用於 h5
					</p>
					<Button size='2xl' type='secondary'>
						Financial Transactions Submit (H5)
					</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸 3xl: 適用於 login, join now, confirm - 適用於所有設備
					</p>
					<Button className='mr-2' size='3xl'>
						Login
					</Button>
					<Button size='3xl' type='cancel'>
						Cancel
					</Button>
				</div>

				<div>
					<p className='text-white'>
						尺寸 4xl: 適用於 Financial Transaction (desktop) Submit - 適用於
						desktop，支援rwd
					</p>
					<Button size='4xl' type='primary'>
						Submit (Desktop) 縮小就是(h5)
					</Button>

					<Button size='4xl' type='cancel'>
						Cancel
					</Button>
				</div>
			</div>

			<div className='relative ml-2 mt-8 w-[500px] overflow-x-auto shadow-md sm:rounded-lg'>
				<p className=' text-gray-200'>隨手做表格</p>
				<table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>
					<thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>
						<tr>
							<th scope='col' className='py-3 px-6'>
								尺寸
							</th>
							<th scope='col' className='py-3 px-6'>
								適用場景
							</th>
							<th scope='col' className='py-3 px-6'>
								裝置
							</th>
						</tr>
					</thead>
					<tbody>
						{buttonData.map((data, index) => (
							<tr
								key={index}
								className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'
							>
								<td className='py-4 px-6'>{data.size}</td>
								<td className='py-4 px-6'>{data.scenarios}</td>
								<td className='py-4 px-6'>{data.device}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default page
