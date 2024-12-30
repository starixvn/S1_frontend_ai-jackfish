import Tippy, { TippyProps } from '@tippyjs/react'
import React, { ReactElement } from 'react'
import 'tippy.js/dist/tippy.css' // 引入 Tippy.js 預設樣式

/**
 * 定義 Tooltip 彈窗的位置選項
 */
export enum TooltipPlacementEnum {
	Top = 'top',
	Bottom = 'bottom',
	Left = 'left',
	Right = 'right',
	TopStart = 'top-start',
	TopEnd = 'top-end',
	BottomStart = 'bottom-start',
	BottomEnd = 'bottom-end',
	LeftStart = 'left-start',
	LeftEnd = 'left-end',
	RightStart = 'right-start',
	RightEnd = 'right-end',
}

/**
 * 定義 Tooltip 的觸發條件選項
 * - Hover: 當滑鼠懸停時觸發 (預設值)
 * - Click: 當用戶點擊目標元素時觸發
 * - Focus: 當目標元素獲得焦點時觸發
 * - Manual: 手動控制觸發條件，需搭配 visible 屬性使用
 */
export enum TooltipTriggerEnum {
	Hover = 'mouseenter',
	Click = 'click',
	Focus = 'focus',
	Manual = 'manual',
}

interface TooltipProps extends Omit<TippyProps, 'children'> {
	children: ReactElement
	content: React.ReactNode
	placement?: TooltipPlacementEnum
	arrow?: boolean
	animation?: TippyProps['animation']
	maxWidth?: TippyProps['maxWidth']
	trigger?: TooltipTriggerEnum
}

/**
 * 共用 Tooltip 組件
 * @param content -彈窗的內容，接收 html 元素
 * @param placement -顯示在哪裡
 * @param arrow -是否顯示箭頭
 * @param maxWidth -自定義寬度
 * @param trigger -觸發條件，包含 hover, click, focus, manual
 */
const Tooltip: React.FC<TooltipProps> = ({
	children,
	content,
	placement = TooltipPlacementEnum.Top,
	arrow = true,
	maxWidth = 'auto',
	trigger = TooltipTriggerEnum.Click,
}) => {
	const triggerProp = trigger === TooltipTriggerEnum.Hover ? "mouseenter" : trigger
	// console.log(triggerProp)

	return (
		<Tippy
			content={content}
			placement={placement}
			animation='fade'
			arrow={arrow}
			maxWidth={maxWidth}
			trigger={triggerProp}
		>
			{children}
		</Tippy>
	)
}

export default Tooltip
