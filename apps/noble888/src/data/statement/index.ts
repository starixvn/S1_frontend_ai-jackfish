export enum DateOptionEnum {
	Today,
	Yesterday,
	ThisWeek,
	LastWeek,
	ThisMonth,
	LastMonth,
}

/** 小螢幕日期選擇選項 */
export const dateOptions = [
	{ i18nKey: 'Label_History_Today' },
	{ i18nKey: 'Label_History_Yesterday' },
	{ i18nKey: 'Label_History_ThisWeek' },
	{ i18nKey: 'Label_History_LastWeek' },
	{ i18nKey: 'Label_History_ThisMonth' },
	{ i18nKey: 'Label_History_LastMonth' },
]

/** 快速選擇的選項 */
export const initQuickPickOptions = [
	'Label_History_QuickPick',
	'Label_History_ThisWeek',
	'Label_General_ByDay',
	'Label_General_ByCategory',
	'Label_General_ByDetail',
]

/** 大螢幕日期選擇選項 */
export const lgDateSelectOptions = [
	{ value: DateOptionEnum.Today, label: 'Label_History_Today' },
	{ value: DateOptionEnum.Yesterday, label: 'Label_History_Yesterday' },
	{ value: DateOptionEnum.ThisWeek, label: 'Label_History_ThisWeek' },
	{ value: DateOptionEnum.LastWeek, label: 'Label_History_LastWeek' },
	{ value: DateOptionEnum.ThisMonth, label: 'Label_History_ThisMonth' },
	{ value: DateOptionEnum.LastMonth, label: 'Label_History_LastMonth' },
]
