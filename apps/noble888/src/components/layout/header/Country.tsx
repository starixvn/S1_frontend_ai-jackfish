'use client'

import { LANG_GROUP_COUNTRY } from 'JF-constants'
import { cn, imageUrl, useLanguageGroup } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { useRef } from 'react'
import { useBoolean, useOnClickOutside } from 'usehooks-ts'

const Country = () => {
	const ref = useRef<HTMLDivElement>(null)
	const { value: isActive, toggle, setFalse } = useBoolean(false)
	const { isLogin } = useAuthStore()
	const { icon, languageGroup, onSetLanguage } = useLanguageGroup(['cs'])

	useOnClickOutside(ref, setFalse)
	return (
		<div className='relative'>
			<div className='flex items-center gap-2'>
				<button
					className='h-10 w-10 overflow-hidden rounded-full border-2 border-white'
					onClick={toggle}
				>
					<img
						className='h-full w-full'
						src={imageUrl(`/desktop/img/flag/${icon}.jpg`)}
						alt='Language'
					/>
				</button>
			</div>

			{/* 點了國家button才會跳出來的 */}
			{isActive && (
				<div
					ref={ref}
					className='absolute top-full z-30 mt-2 w-64 rounded-lg bg-gray-100 p-2 shadow-lg ltr:right-0 rtl:left-0'
				>
					{/* 目前國家和語系 */}
					<div className='flex items-center gap-2 rounded-2xl bg-white p-5'>
						<div className='h-9 w-9 overflow-hidden rounded-full'>
							<img
								className='h-full w-full'
								src={imageUrl(`/desktop/img/flag/${icon}.jpg`)}
								alt='flag'
							/>
						</div>

						<div>
							<div className='text-sm font-semibold'>
								{LANG_GROUP_COUNTRY[icon || 'ch']}
							</div>
							<div className='flex gap-2'>
								{languageGroup[icon || 'ch']?.map(
									({ displayText, currencyId, value }, index) => {
										return (
											<button
												className={cn('hover:text-secondary-500 text-xs', {
													'border-r-solid border-r-[1px] border-r-gray-600 pe-2':
														index !== languageGroup[icon || 'ch'].length - 1,
												})}
												key={displayText}
												type='button'
												onClick={() => {
													onSetLanguage({
														langCode: value,
														currencyId,
													})
													toggle()
												}}
											>
												{displayText}
											</button>
										)
									},
								)}
							</div>
						</div>
					</div>

					{/* 登入前可以選所有語系 */}
					{!isLogin && (
						<div
							className='mt-2 h-80 overflow-scroll rounded-2xl bg-white p-5'
							// 隱藏scroll bar
							style={{
								msOverflowStyle: 'none',
								scrollbarWidth: 'none',
							}}
						>
							{Object.entries(languageGroup).map(([lang, item], index) => (
								<div
									key={lang}
									className={cn('flex items-center gap-2', {
										'mb-4': index !== Object.entries(languageGroup).length - 1,
									})}
								>
									<div className='h-6 w-6 overflow-hidden rounded-full border-[1px] border-gray-100'>
										<img
											className='h-full w-full'
											src={imageUrl(`/desktop/img/flag/${lang}.jpg`)}
											alt='flag'
										/>
									</div>

									{item?.map(
										({ value, currencyId, displayText, mainLanguage }) => {
											if (!mainLanguage) return
											return (
												<button
													className='hover:text-secondary-500 text-xs font-semibold'
													key={`${lang}_${value}`}
													type='button'
													onClick={() => {
														onSetLanguage({
															langCode: value,
															currencyId,
														})
														toggle()
													}}
												>
													{displayText}
												</button>
											)
										},
									)}
								</div>
							))}
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Country
