'use client'

import { IAxiosError } from 'JF-api/baseApi'
import { useGoToGame } from 'JF-api/tp/client'
import {
	IEnterPageArgs,
	IEnterSlotsPageArgs,
	IGoToGameArgs,
	IOpen9WSportsArgs,
	MenuActionEnum,
	PRODUCTS,
	paths,
	type TDynamicSubMenuItem,
	type TDynamicSubMenuLinkType,
	type TStaticSubMenuItem,
} from 'JF-constants'
import { onWindowOpenProduct, useGetPathname, useLocaleRouter } from 'JF-core'
import { useAuthStore } from 'JF-operations'

type LoginCallbackType = () => void
type MessageCallbackType = (message: string) => void

enum LoginGameTypeEnum {
	returnGameUrl = 1,
	returnHtml,
}

const useMenuOpen = () => {
	const { isLogin } = useAuthStore()
	const { locale } = useGetPathname()
	const router = useLocaleRouter()

	const onDefaultEnterPage = ({
		langId,
		tpId,
		gameId = '',
		matchId = '',
		betType = '',
		tpGameType = null,
	}: IEnterPageArgs) => {
		const host = typeof window === 'undefined' ? null : window.location.origin
		// 實際帶的 host 位置，正式環境帶當前 domain, local環境則帶 api proxy
		const dbHost =
			process.env.NODE_ENV === 'production'
				? host
				: process.env['NEXT_PUBLIC_ENV_DB_HOST']
		const signupUrl = `${host}${paths.join.root}`
		const loginUrl = `${host}${paths.login.root}`
		const errorUrl = `${dbHost}/404/index_${langId}.html`
		const cashierUrl = `${host}${paths.deposit.root}`
		const lobbyUrl = `${host}`

		const searchParams = new URLSearchParams({
			tpId: String(tpId),
			gameId: String(gameId),
			tpGameType: String(tpGameType),
		})
		if (matchId) {
			searchParams.set('matchid', matchId)
		}
		if (betType) {
			searchParams.set('bettype', String(betType))
		}

		return `${dbHost}/${langId}/entPage?homeUrl=${host}&signupUrl=${signupUrl}&LoginUrl=${loginUrl}&errorUrl=${errorUrl}&CashierUrl=${cashierUrl}&lobbyUrl=${lobbyUrl}&${searchParams.toString()}`
	}

	const onEnterPage = (
		{
			langId,
			tpId,
			gameId = '',
			matchId = '',
			betType = '',
			tpGameType = null,
		}: IEnterPageArgs,
		{ loginCallback }: { loginCallback: LoginCallbackType },
	) => {
		const defaultEnterPageArgs: IEnterPageArgs = {
			langId,
			tpId,
			gameId,
			matchId,
			betType,
			tpGameType,
		}
		const entPageUrl = onDefaultEnterPage(defaultEnterPageArgs)

		// * 登入檢查
		if (loginCallback && !isLogin) {
			return loginCallback()
		}

		onWindowOpenProduct({
			pathname: entPageUrl,
			windowKey: `${tpId}_${gameId}`,
		})
	}

	const onGoToGame = async (
		{
			tpId,
			langId,
			inputs: {
				gameId = null,
				fun = '0',
				gameType = '',
				tpGameType = '',
				loginGameType = '',
			},
		}: IGoToGameArgs,
		{
			loginCallback,
			messageCallBack,
		}: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
		},
	) => {
		if (loginCallback && !isLogin) {
			loginCallback()
			return
		}
		try {
			const goToGameArgs: IGoToGameArgs = {
				tpId,
				langId,
				inputs: {
					gameId,
					fun,
					gameType,
					tpGameType: String(tpGameType),
					loginGameType,
				},
			}
			const { message } = await useGoToGame(goToGameArgs)

			if (
				// * SPORT 9W 的開啟方式來自於代理商給的文件，因此需拉出單獨處理
				tpId === PRODUCTS.Nova88Exchange.tpId
			) {
				const result = JSON.parse(message)
				const { url, key, userId } = result ?? {}
				open9WSports({ url, key, userId })
			} else if (loginGameType !== '') {
				if (Number(loginGameType) === LoginGameTypeEnum.returnHtml) {
					const newWindow = window.open()
					newWindow?.document.write(message)
				} else {
					window.open(message)
				}
			} else {
				window.open(
					message,
					`${tpId}_${gameId}`,
					'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0',
				)
			}
		} catch (error) {
			const { message, errorCode } = error as IAxiosError
			if (errorCode === 3000) {
				// eslint-disable-next-line no-console
				console.error('Under Maintenance')
			} else if (messageCallBack) {
				messageCallBack(message)
			}
		}
	}

	// TODO 待確認是否需要留著
	// const onStaticMenuOpen = (
	// 	item: TStaticSubMenuItem | undefined,
	// 	{
	// 		loginCallback,
	// 		underMaintenanceCallback,
	// 		messageCallBack,
	// 	}: {
	// 		loginCallback: () => void
	// 		underMaintenanceCallback: () => void
	// 		messageCallBack: (message: string) => void
	// 	},
	// ) => {
	// 	if (!item) return

	// const isTpMaintain = getIsTpMaintain({
	// 	tpMaintainList,
	// 	tpId: item.tpId,
	// 	tpGameType: item.tpGameType,
	// })

	// 	if (isTpMaintain) {
	// 		underMaintenanceCallback()
	// 	} else {
	// 		onMenuOpen(item, {
	// 			loginCallback,
	// 			messageCallBack,
	// 		})
	// 	}

	// 	onMenuOpen(item, {
	// 		loginCallback,
	// 		messageCallBack,
	// 	})
	// }

	/**
	 * TDynamicSubMenuItem 為動態遊戲產品(lobbyHeader api 來的)
	 * TStaticSubMenuItem 為靜態產品
	 * undefined 是動態遊戲找不到對應的定義檔 (會在這層 return 掉)
	 * 目的是為了減少 find 造成 performance 低落以及明確的把動態靜態區分開，code 看起來可以更乾淨
	 */
	const onMenuOpen = (
		item: TDynamicSubMenuItem | TStaticSubMenuItem | undefined,
		{
			loginCallback,
			messageCallBack,
		}: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
		},
	) => {
		if (!item) return

		// const isDynamic = (
		// 	item: TDynamicSubMenuItem | TStaticSubMenuItem,
		// ): item is TDynamicSubMenuItem => {
		// 	return (item as TDynamicSubMenuItem)?.isTpMaintain !== undefined
		// }
		// // 靜態 (isTpMaintain noPlay 會在 onStaticMenuOpen 擋掉)
		// if (isDynamic(item)) {
		// 	const { isTpMaintain } = item || {}
		// 	if (isTpMaintain) return
		// }

		const { menuActionType, tpId, gameId, tpGameType, betType } = item || {}

		const linkMethod = () => {
			const { pathname = '/', params } = (item as TDynamicSubMenuLinkType) || {}
			router.push(params ? `${pathname}/${params.value}` : pathname)
		}

		const enterPageMethod = () => {
			const enterPageArgs: IEnterPageArgs = {
				langId: locale,
				tpId,
				gameId,
				tpGameType,
				betType: betType,
			}
			onEnterPage(enterPageArgs, { loginCallback })
		}

		const goToGameMethod = () => {
			const goToGameArgs: IGoToGameArgs = {
				tpId,
				langId: locale,
				inputs: {
					gameId,
					fun: '0',
					gameType: tpId === PRODUCTS.NewPlayTechSlot.tpId ? 'slots' : '',
					tpGameType,
				},
			}
			onGoToGame(goToGameArgs, { loginCallback, messageCallBack })
		}

		const windowOpenMethod = () => {
			if (window !== undefined) {
				const { pathname = '/' } = (item as TDynamicSubMenuLinkType) || {}
				window.open(pathname, pathname)
			}
		}

		const switchMethod = {
			[MenuActionEnum.Link]: linkMethod,
			[MenuActionEnum.EnterPage]: enterPageMethod,
			[MenuActionEnum.UseGoToGame]: goToGameMethod,
			[MenuActionEnum.WindowOpen]: windowOpenMethod,
			// * 靜態遊戲 enterPage 走 Default
			[MenuActionEnum.Null]: enterPageMethod,
		}
		return switchMethod[menuActionType ?? MenuActionEnum.Null]()
	}

	/**
	 * 專門打開 Slots 遊戲
	 */
	const onEnterSlotsPage = (
		{ tpId, tpGameType, gameId, isFree = false }: IEnterSlotsPageArgs,
		{ loginCallback }: { loginCallback: LoginCallbackType },
	) => {
		if (loginCallback && !isLogin) {
			loginCallback()
			return
		}

		if (tpId === PRODUCTS.PGSoft.tpId.toString()) {
			const goToGameArgs: IGoToGameArgs = {
				tpId: Number(tpId),
				langId: locale,
				inputs: {
					gameId,
					tpGameType,
					fun: '0',
					gameType: '',
					loginGameType: String(LoginGameTypeEnum.returnHtml),
				},
			}
			onGoToGame(goToGameArgs, { loginCallback })
			return
		}

		const host = typeof window === 'undefined' ? null : window.location.origin
		const dbHost =
			process.env.NODE_ENV === 'production'
				? host
				: process.env['NEXT_PUBLIC_ENV_DB_HOST']
		const signupUrl = `${host}${paths.join.root}`
		const loginUrl = `${host}${paths.login.root}`
		const errorUrl = `${dbHost}/404/index_${locale}.html`

		const searchParams = new URLSearchParams({
			tpId,
			fun: isFree ? '1' : '0',
			gameType: 'slots',
		})
		if (tpGameType) {
			searchParams.set('tpGameType', tpGameType)
		}
		if (gameId) {
			searchParams.set('gameId', String(gameId))
		}

		const entPageUrl = `${dbHost}/${locale}/entPage?homeUrl=${host}&signupUrl=${signupUrl}&LoginUrl=${loginUrl}&errorUrl=${errorUrl}&${searchParams.toString()}`

		onWindowOpenProduct({
			pathname: entPageUrl,
			windowKey: tpId,
		})
	}

	/**
	 * SPORT 9W 的開啟方式來自於代理商給的文件，因此需拉出單獨處理
	 */
	const open9WSports = ({ url, userId, key }: IOpen9WSportsArgs) => {
		const windowName = `w_9WSportsForm`
		const form = document.createElement('form')
		form.setAttribute('method', 'post')
		form.setAttribute('action', url)
		form.setAttribute('target', windowName)

		const addIptField = ({ name, value }: { name: string; value: string }) => {
			const hiddenField = document.createElement('input')
			hiddenField.setAttribute('type', 'hidden')
			hiddenField.setAttribute('name', name)
			hiddenField.setAttribute('value', value)
			form.appendChild(hiddenField)
		}

		addIptField({ name: 'userId', value: userId })
		addIptField({ name: 'key', value: decodeURIComponent(key) })
		document.body.appendChild(form)
		window.open(
			'',
			windowName,
			'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0',
		)
		form.submit()
		form.remove()
	}

	return {
		onMenuOpen,
		// onStaticMenuOpen,
		onEnterPage,
		onGoToGame,
		onEnterSlotsPage,
		// onDefaultEnterPage,
		// isLobbyHeaderError,
	}
}

export { useMenuOpen }
