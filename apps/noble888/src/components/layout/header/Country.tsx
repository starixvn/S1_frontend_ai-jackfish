'use client'
import {
	LANG_GROUP_COUNTRY,
	langLabel,
	languageGroup,
} from '@noble888/src/data/country'
import { CURRENCY_TO_LANG_KEY, CurrenciesEnum } from 'JF-constants'
import { bannerUrl, cn, useLanguageGroup } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { IoIosArrowDown } from 'react-icons/io'

interface ICountryProps {
	toggle: () => void
	isActive: boolean
	selectedText?: string
}

const Country = ({ toggle, isActive, selectedText = '' }: ICountryProps) => {
	const { isLogin } = useAuthStore()
	const { icon, onSetLanguage } = useLanguageGroup()
	return (
		<div className='relative w-full'>
			<div className='flex items-center gap-2' onClick={toggle}>
				<button
					className='h-10 w-10 overflow-hidden rounded-full border-2 border-white'
					type='button'
				>
					<img
						className='h-full w-full'
						src={bannerUrl(`/desktop/img/flag/${icon}.jpg`)}
						alt='Language'
					/>
				</button>
				<span className='text-primary-900'>{selectedText}</span>
				{selectedText && <IoIosArrowDown className='flex h-4 w-4' />}
			</div>

			{/* 點了國家button才會跳出來的 */}
			{isActive && (
				<div
					className={cn(
						'text-primary-900 absolute top-full z-30 mt-2 w-64 rounded-lg bg-gray-100 p-2 shadow-lg ltr:right-0 rtl:left-0',
						{
							'static w-60 bg-white p-0 shadow-none': isLogin,
						},
					)}
				>
					{/* 目前國家和語系 */}
					<div
						className={cn('flex items-center gap-2 rounded-2xl bg-white p-5')}
					>
						<div className='h-9 w-9 overflow-hidden rounded-full'>
							<img
								className='h-full w-full'
								src={bannerUrl(`/desktop/img/flag/${icon}.jpg`)}
								alt='flag'
							/>
						</div>

						<div>
							<div className='text-sm font-semibold'>
								{LANG_GROUP_COUNTRY[icon || 'ch']}
							</div>
							<div className='flex gap-2'>
								{/* TODO: languageGroup[CurrenciesEnum.USD]先寫死currency，之後有登入userInfo再改帶之 */}
								{languageGroup[CurrenciesEnum.USD].map((value, index) => {
									return (
										<button
											className={cn('hover:text-secondary-500 text-xs', {
												'border-e-solid border-e-[1px] border-e-gray-600 pe-2':
													index !==
													languageGroup[CurrenciesEnum.USD].length - 1,
											})}
											key={value}
											type='button'
											onClick={() => {
												onSetLanguage({
													langCode: value,
													currencyId: CurrenciesEnum.USD,
												})
												toggle()
											}}
										>
											{langLabel[value]}
										</button>
									)
								})}
								{/*Old Version
								 {languageGroup[icon || 'en']?.map(
									({ displayText, currencyId, value }, index) => {
										return (
											<button
												className={cn('hover:text-secondary-500 text-xs', {
													'border-r-solid border-r-[1px] border-r-gray-600 pe-2':
														index !== languageGroup[icon || 'en'].length - 1,
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
								)} */}
							</div>
						</div>
					</div>

					{/* 登入前可以選所有語系 */}
					{!isLogin && (
						// TODO: className hidden等如果需要其他語系再打開（noble888只需要global）
						<div
							className='mt-2 hidden h-fit overflow-scroll rounded-2xl bg-white p-5'
							// 隱藏scroll bar
							style={{
								msOverflowStyle: 'none',
								scrollbarWidth: 'none',
							}}
						>
							{Object.entries(languageGroup).map(([key, value], index) => {
								return (
									<div
										key={key}
										className={cn('flex items-center gap-2', {
											'mb-4':
												index !== Object.entries(languageGroup).length - 1,
										})}
									>
										<div className='h-6 w-6 overflow-hidden rounded-full border-[1px] border-gray-100'>
											<img
												className='h-full w-full'
												src={bannerUrl(
													`/desktop/img/flag/${CURRENCY_TO_LANG_KEY[key]}.jpg`,
												)}
												alt='flag'
											/>
										</div>
										{value.map((item, index) => {
											if (index > 0) return
											return (
												<button
													className='hover:text-secondary-500 text-xs font-semibold'
													key={`${value}`}
													type='button'
													onClick={() => {
														onSetLanguage({
															langCode: item,
															currencyId: Number(key),
														})
														toggle()
													}}
												>
													{langLabel[item]}
												</button>
											)
										})}
									</div>
								)
							})}

							{/*Old Version
						 	{Object.entries(languageGroup[CurrenciesEnum.USD]).map(
								([lang, item], index) => {
									return (
										<div
											key={lang}
											className={cn('flex items-center gap-2', {
												'mb-4':
													index !== Object.entries(languageGroup).length - 1,
											})}
										>
											<div className='h-6 w-6 overflow-hidden rounded-full border-[1px] border-gray-100'>
												<img
													className='h-full w-full'
													src={bannerUrl(`/desktop/img/flag/${lang}.jpg`)}
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
									)
								},
							)} */}
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Country
