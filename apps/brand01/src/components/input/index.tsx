'use client'

import { cn, imageUrl } from 'JF-core'
import { useState, type InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { useCopyToClipboard } from 'usehooks-ts'

interface IInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
	register: UseFormRegisterReturn
	dirty: boolean
	password?: boolean
	copy?: boolean
	divClassName?: string
	icon?: string
	error?: boolean
	loading?: boolean
	isMessagesHide?: boolean
	errorMessage?: string
	successMessage?: string
	infoMessage?: string
	format?: boolean
	formatStr?: string
	showRightIcon?: boolean
	onInfoClick?: () => void
}

/**
 * 整合 Input 元件，搭配 react-hook-form 做使用，必須傳入 register 與 useForm() 綁定，register 所提供的 options 請閱 react-hook-form 官方文件。
 * useForm 觸發模式請選擇 onChange ex: useForm({ mode: 'onChange' })。
 * 若 validate 有 call api 的地方再自己用 debounce 實作 ex: const debounceTrigger = debounce(trigger, 200)。
 * ---
 * @param {UseFormRegisterReturn} register - 必填，傳入 react-hook-form 的 register 綁定元件
 * @param {boolean} dirty - 必填，樣式需透過判斷是否觸發過元件，才可做進一步渲染，傳入 dirtyFields[inputName] 做判斷
 * @param {boolean} [password] - 傳遞 password props 控制是否為 pwd input
 * @param {boolean} [copy] - 傳遞 copy props 控制是否顯示copy icon
 * @param {string} [className] - 傳入 className 加在input，可以手動加入圓角等設定
 * @param {string} [divClassName] - 傳入 className 加在最上層div，可以手動加入寬度等設定
 * @param {string} [icon] - icon's filename
 * @param {string} [title] - Input 開頭，Icon 右側
 * @param {string} [type] - HTMLInputTypeAttribute
 * @param {boolean} [error] - 驗證是否通過
 * @param {boolean} [loading] - 控制 loading state
 * @param {boolean}[isMessagesHide] - 啟用後將會隱藏所有 msg (包含 error, success)，若確定不要 message 要確實傳入此參數，不然會預留高度
 * @param {string} [errorMessage] - 錯誤訊息，由 formState.errors[inputName]?.message 傳遞下來
 * @param {string} [successMessage] - 正確訊息
 * @param {string} [infoMessage] - 有 infoMessage 時會出現 info icon，若有 errorMessage or successMessage 則不顯示
 * @param {boolean} [format] - 控制是否加入 formatStr
 * @param {string} [formatStr] - 用於複寫預設的 formatStr
 * @param {boolean} [showRightIcon] - 是否顯示位於右邊的狀態 icon 及 password 的眼睛 icon
 * @param {boolean} [onInfoClick] - 顯示 info icon 並觸發外部點擊事件
 * @param {*} prop - other html input props
 */
const Input = ({
	register,
	dirty,
	password,
	copy,
	className,
	divClassName,
	icon,
	title,
	type = 'text',
	error,
	loading,
	isMessagesHide,
	errorMessage,
	successMessage,
	infoMessage,
	format,
	formatStr = "('000)",
	showRightIcon = true,
	onInfoClick,
	...props
}: IInputProps) => {
	const [showPassword, setShowPassword] = useState<boolean>(false)
	const [showInfo, setShowInfo] = useState<boolean>(false)
	const [isCopied, setIsCopied] = useState<boolean>(false)
	const [, copyToClipboard] = useCopyToClipboard()

	// 判斷是否顯示password
	const passwordType = () => {
		return showPassword ? 'text' : 'password'
	}

	// 點選複製icon複製input內的value
	const onCopyClick = async () => {
		const element = document.querySelector(
			`input[name="${register.name}"]`,
		) as HTMLInputElement | null
		if (element?.value) {
			await copyToClipboard(element.value)
			setIsCopied(true)
			setTimeout(() => {
				setIsCopied(false)
			}, 3000)
		}
	}

	// render 右邊狀態icon
	const renderRightIcon = () => {
		// password只顯示眼睛icon，優先判斷
		if (password) {
			return (
				<img
					className='ml-2 h-5 w-5 cursor-pointer'
					src={imageUrl(
						`/img/icon/input/${showPassword ? 'icon-eye' : 'icon-eye-close'}.svg`,
					)}
					alt='eye'
					onClick={() => setShowPassword(prev => !prev)}
				/>
			)
		}
		// copy只顯示複製icon
		if (copy) {
			return isCopied ? (
				<img
					className='ml-2 h-5 w-5 cursor-default'
					src={imageUrl('/img/icon/input/icon-valid.svg')}
					alt='valid'
				/>
			) : (
				<img
					className='ml-2 h-5 w-5 cursor-pointer'
					src={imageUrl(`/img/icon/referral/icon-referral-copy.svg`)}
					alt='copy'
					onClick={onCopyClick}
				/>
			)
		}
		// error次之
		if (error) {
			return (
				<img
					className='ml-2 h-5 w-5 cursor-default'
					src={imageUrl('/img/icon/input/icon-invalid.svg')}
					alt='invalid'
				/>
			)
		}
		// dirty 後顯示 valid icon
		if (dirty && !error && (!!successMessage || error !== undefined)) {
			return (
				<img
					className='ml-2 h-5 w-5 cursor-default'
					src={imageUrl('/img/icon/input/icon-valid.svg')}
					alt='valid'
				/>
			)
		}
		// 無error顯示info icon
		if (infoMessage || onInfoClick) {
			return (
				<img
					className='ml-2 h-5 w-5 cursor-pointer'
					src={imageUrl('/img/icon/financial-transactions/icon-notice.svg')}
					alt='notice'
					onClick={() => {
						setShowInfo(prev => !prev)
						onInfoClick && onInfoClick()
					}}
				/>
			)
		}
		return null
	}
	// render 下方訊息
	const renderMessage = () => {
		// 隱藏就全部不顯示
		if (isMessagesHide) return null

		// errorMessage 權重最高
		if (type !== 'date' && !!errorMessage) {
			return <div className='text-warning-300 text-sm'>{errorMessage}</div>
		}
		// successMessage 權重次之
		if (dirty && !loading && !!successMessage) {
			// 成功 message 應在輸入資料驗證後才會顯示
			return <div className='text-check-300 text-sm'>{successMessage}</div>
		}
		// infoMessage 權重最低，沒驗證 or 尚未驗證過才會觸發
		if (infoMessage && showInfo && (error === undefined || !dirty)) {
			return <div className='text-primary-200 text-sm'>{infoMessage}</div>
		}

		return <div className='my-2.5' />
	}

	return (
		<>
			<div className={cn('grid w-full', divClassName)}>
				<div className='relative grid place-items-center'>
					{/* left - icon & title */}
					<div className='absolute left-6 flex cursor-default items-center'>
						{icon && (
							<img
								className='mr-3.5 h-5 w-5'
								src={imageUrl(`/img/icon/input/${icon}.svg`)}
								alt={icon}
							/>
						)}
						{title && <div className='text-neutral-300'>{title}</div>}
					</div>
					{/* right - icon & formatStr */}
					{showRightIcon && (
						<div className='absolute right-4 flex items-center'>
							{format && (
								<div className='cursor-default text-neutral-300'>
									{formatStr}
								</div>
							)}
							{renderRightIcon()}
						</div>
					)}
					<input
						className={cn(
							'text-tertiary-400 w-full appearance-none rounded-[5px] border-2 border-solid border-transparent py-3 px-12 text-center text-sm',
							'placeholder:text-neutral-300',
							'focus:border-secondary-300 focus:outline-none',
							'disabled:bg-neutral-200',
							{ 'bg-warning-200 border-warning-300': error },
							className,
						)}
						type={password ? passwordType() : type}
						{...register}
						{...props}
					/>
				</div>
				{renderMessage()}
			</div>
		</>
	)
}

export default Input
