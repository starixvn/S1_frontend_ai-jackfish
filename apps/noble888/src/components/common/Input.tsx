'use client'

import { cn } from 'JF-core'
import { useState, type InputHTMLAttributes } from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import {
	ImCheckmark,
	ImCopy,
	ImCross,
	ImEye,
	ImEyeBlocked,
	ImNotification,
} from 'react-icons/im'
import { useCopyToClipboard } from 'usehooks-ts'

interface IInputProps
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
	register: UseFormRegisterReturn
	dirty: boolean
	password?: boolean
	copy?: boolean
	divClassName?: string
	icon?: React.ReactNode
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
	formatStr = `('000)`,
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

	// 點選複製 icon 複製 input 內的 value
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

	// render 右邊狀態 icon
	const renderRightIcon = () => {
		// password 只顯示眼睛 icon，優先判斷
		if (password) {
			return showPassword ? (
				<ImEye
					className='text-secondary-500 cursor-pointer'
					onClick={() => setShowPassword(prev => !prev)}
					size={16}
				/>
			) : (
				<ImEyeBlocked
					className='text-secondary-500 cursor-pointer'
					onClick={() => setShowPassword(prev => !prev)}
					size={16}
				/>
			)
		}
		// copy 只顯示複製 icon
		if (copy) {
			return isCopied ? (
				<ImCheckmark className='text-success-500 cursor-default' size={16} />
			) : (
				<ImCopy
					className='hover:text-secondary-500 cursor-pointer'
					size={16}
					onClick={onCopyClick}
				/>
			)
		}
		// error 次之
		if (error) {
			return <ImCross className='text-danger-500 cursor-default' size={16} />
		}
		// dirty 後顯示 valid icon
		if (dirty && !error && (!!successMessage || error !== undefined)) {
			return (
				<ImCheckmark className='text-success-500 cursor-default' size={16} />
			)
		}
		// 無 error 顯示 info icon
		if (infoMessage || onInfoClick) {
			return (
				<ImNotification
					className='text-secondary-500 cursor-pointer'
					onClick={() => {
						setShowInfo(prev => !prev)
						onInfoClick && onInfoClick()
					}}
					size={16}
				/>
			)
		}
		return null
	}
	// render 下方訊息
	const renderMessage = () => {
		// 隱藏就全部不顯示
		if (isMessagesHide) return null

		const baseMessageClass = 'ms-2 py-1 text-xs'

		// errorMessage 權重最高
		if (type !== 'date' && !!errorMessage) {
			return (
				<div className={cn(baseMessageClass, 'text-danger-500')}>
					{errorMessage}
				</div>
			)
		}
		// successMessage 權重次之
		if (dirty && !loading && !!successMessage) {
			// 成功 message 應在輸入資料驗證後才會顯示
			return (
				<div className={cn(baseMessageClass, 'text-primary-500')}>
					{successMessage}
				</div>
			)
		}
		// infoMessage 權重最低，沒驗證 or 尚未驗證過才會觸發
		if (infoMessage && showInfo && (error === undefined || !dirty)) {
			return (
				<div className={cn(baseMessageClass, 'text-primary-500')}>
					{infoMessage}
				</div>
			)
		}
		return <div className='my-3' />
	}

	return (
		<>
			<div className={cn('grid w-full text-sm font-medium', divClassName)}>
				<div
					className={cn(
						'relative flex w-full appearance-none items-center gap-3 rounded px-4 py-2',
						'border-primary-500 border',
						{ 'border-danger-500': error },
					)}
				>
					{/* left - icon & title */}
					<div
						className={cn(
							'text-primary-500 flex cursor-default items-center gap-2',
							{ 'text-danger-500': error },
						)}
					>
						{icon && icon}
						{title && <span>{title}</span>}
					</div>
					<input
						className={cn(
							'w-full bg-black text-start',
							'placeholder:text-primary-700',
							{ 'placeholder:text-danger-500': error },
							'focus:outline-none',
							'read-only:cursor-default',
							className,
						)}
						type={password ? passwordType() : type}
						{...register}
						{...props}
					/>
					{/* right - icon & formatStr */}
					{showRightIcon && (
						<div className='absolute end-4 flex items-center'>
							{format && <div className='cursor-default'>{formatStr}</div>}
							{renderRightIcon()}
						</div>
					)}
				</div>
				{renderMessage()}
			</div>
		</>
	)
}

export default Input
