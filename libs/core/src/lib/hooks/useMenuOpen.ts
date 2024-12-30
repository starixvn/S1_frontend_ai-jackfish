'use client'

import {
	IEnterPageArgs,
	IEnterSlotsPageArgs,
	IGoToGameArgs,
	ISubMenu,
	MenuActionEnum,
	PRODUCTS,
	paths,
	type TDynamicSubMenuItem,
	type TDynamicSubMenuLinkType,
	type TStaticSubMenuItem,
} from 'JF-constants'
import { onWindowOpenProduct, useGetPathname, useLocaleRouter } from 'JF-core'
import { useAuthStore } from 'JF-operations'
import { NewRouterPush } from '../utils/routerQuery'

type LoginCallbackType = () => void
type MessageCallbackType = (message: string) => void
interface ICallbackProps {
	loginCallback?: LoginCallbackType
	messageCallBack?: MessageCallbackType
}

enum LoginGameTypeEnum {
	returnGameUrl = 1,
	returnHtml,
}

interface IUseMenuOpenProps {
	isPathParams?: boolean
}

const useMenuOpen = ({ isPathParams = false }: IUseMenuOpenProps) => {
	const { isLogin } = useAuthStore()
	const { locale } = useGetPathname()
	const router = useLocaleRouter()
	/* 共用function區域------
	/**
	 * 獲取當前網站的 host
	 * @returns {string|null} 返回當前網站的 origin，如果在伺服器端則返回 null
	 */
	const getHost = () => {
		return typeof window === 'undefined' ? null : window.location.origin
	}

	/**
	 * 根據環境獲取數據庫 host
	 * @returns {string|null} 返回數據庫 host
	 */
	const getDbHost = () => {
		const host = getHost()
		return process.env.NODE_ENV === 'production'
			? host
			: process.env['NEXT_PUBLIC_ENV_DB_HOST']
	}

	/**
	 * 構建基礎 URL 集合
	 * @param {string|null} host - 網站 host
	 * @returns {Object|null} 返回包含各種 URL 的對象
	 */
	const buildBaseUrls = (host: string | null) => {
		if (!host) return null
		return {
			signupUrl: `${host}${paths.join.root}`,
			loginUrl: `${host}${paths.login.root}`,
			errorUrl: `${getDbHost()}/404/index_${locale}.html`,
			cashierUrl: `${host}${paths.deposit.root}`,
			lobbyUrl: `${host}`,
		}
	}

	/**
	 * 構建 URL 查詢參數
	 * @param {Record<string, string>} params - 參數鍵值對
	 * @returns {URLSearchParams} 返回 URLSearchParams 實例
	 */
	const buildSearchParams = (params: Record<string, string>) => {
		const searchParams = new URLSearchParams()
		Object.entries(params).forEach(([key, value]) => {
			if (value) searchParams.set(key, value)
		})
		return searchParams
	}
	// ------  */

	/**
	 * 生成默認的遊戲進入頁面 URL
	 * @param {IEnterPageArgs} params - 進入頁面所需參數
	 * @returns {string} 返回完整的進入頁面 URL
	 */
	const onDefaultEnterPage = ({
		langId,
		tpId,
		gameId = '',
		matchId = '',
		betType = '',
		tpGameType = null,
	}: IEnterPageArgs) => {
		const host = getHost()
		// 實際帶的 host 位置，正式環境帶當前 domain, local環境則帶 api proxy
		const urls = buildBaseUrls(host)
		if (!urls) return ''

		const searchParams = buildSearchParams({
			tpId: String(tpId),
			gameId: String(gameId),
			tpGameType: String(tpGameType),
			matchid: matchId,
			bettype: String(betType),
		})
		const { signupUrl, loginUrl, errorUrl, cashierUrl, lobbyUrl } = urls
		return `${getDbHost()}/${langId}/entPage?homeUrl=${host}&signupUrl=${signupUrl}&LoginUrl=${loginUrl}&errorUrl=${errorUrl}&CashierUrl=${cashierUrl}&lobbyUrl=${lobbyUrl}&${searchParams.toString()}`
	}

	/**
	 * 開啟遊戲進入頁面
	 * @param {IEnterPageArgs} args - 進入頁面參數
	 */
	const onEnterPage = (args: IEnterPageArgs, callbacks?: ICallbackProps) => {
		const entPageUrl = onDefaultEnterPage(args)
		const { tpId, gameId } = args
		const { loginCallback } = callbacks || {}

		// * TODO: 登入檢查
		if (loginCallback && !isLogin) {
			return loginCallback()
		}

		onWindowOpenProduct({
			pathname: entPageUrl,
			windowKey: `${tpId}_${gameId}`,
		})
	}

	/**
	 * GotoGame的遊戲打開時會因為加載時間偏長，讓使用者以為沒反應
	 * 所以多做launcher來開新頁面讓UX更直覺（Nova88已改）
	 * @param {IGoToGameArgs} args - 遊戲參數
	 * @param {Object} callbacks - callback函數集合
	 * @param {LoginCallbackType} callbacks.loginCallback - 登入callback
	 * @param {MessageCallbackType} [callbacks.messageCallBack] - 消息callback
	 */
	const onGoToGame = async (
		args: IGoToGameArgs,
		callbacks: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
		},
	) => {
		const { loginCallback } = callbacks
		if (loginCallback && !isLogin) {
			loginCallback()
			return
		}

		const { tpId, langId, inputs } = args
		const {
			gameId = null,
			fun = '0',
			gameType = '',
			tpGameType = '',
			loginGameType = '',
		} = inputs

		const params = buildSearchParams({
			tpId: String(tpId),
			langId: String(langId),
			gameId: String(gameId),
			gameType,
			tpGameType: String(tpGameType),
			loginGameType,
			fun,
		})

		window.open(`/launcher?${params}`, 'launcher')
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
	 * 處理選單項目重新導向
	 * @param {TDynamicSubMenuItem & TStaticSubMenuItem | ISubMenu} item - 選單項目
	 * @param {Object} callbacks - callback函數集合
	 */
	const handleRedirectAction = (
		item: (TDynamicSubMenuItem & TStaticSubMenuItem) | ISubMenu,
		callbacks: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
		},
	) => {
		const {
			tpId,
			gameId,
			tpGameType,
			betType,
			desktop,
			lobbyCategory,
			pathname = '/',
			query,
		} = item

		const actions = {
			[MenuActionEnum.Link]: () => {
				if (lobbyCategory === 'slots' && isPathParams) {
					window.open(`${pathname}/${tpId}`, '_blank')
				} else if (process.env.NEXT_PUBLIC_SITE_ID === '7') {
					// nova88 如果menuActionType是link的話會導轉頁面，不過TUK555需求是都另開分頁，所以像sports就另開
					actions[MenuActionEnum.EnterPage]()
				} else {
					// 如果不是TUK的站，ex: nova88, noble888就用此link導轉頁面
					const path = pathname.replace(/^\//, '')
					router.push(NewRouterPush(path, query))
				}
			},
			[MenuActionEnum.EnterPage]: () => {
				onEnterPage(
					{ langId: locale, tpId, gameId, tpGameType, betType },
					callbacks,
				)
			},
			[MenuActionEnum.UseGoToGame]: () => {
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
				onGoToGame(goToGameArgs, callbacks)
			},
			[MenuActionEnum.WindowOpen]: () => {
				const { pathname = '/' } = item as TDynamicSubMenuLinkType
				window.open(pathname, pathname)
			},
			// * 靜態遊戲 enterPage 走 Default
			[MenuActionEnum.Null]: () => actions[MenuActionEnum.EnterPage](),
		}

		const menuActionType = desktop?.menuActionType ?? MenuActionEnum.Null
		actions[menuActionType]()
	}

	/**
	 * TDynamicSubMenuItem 為動態遊戲產品(lobbyHeader api 來的)
	 * TStaticSubMenuItem 為靜態產品
	 * undefined 是動態遊戲找不到對應的定義檔 (會在這層 return 掉)
	 * 目的是為了減少 find 造成 performance 低落以及明確的把動態靜態區分開，code 看起來可以更乾淨
	 * @param {TDynamicSubMenuItem & TStaticSubMenuItem | ISubMenu} item - 選單項目
	 * @param {Object} callbacks - callback函數集合
	 */
	const onMenuOpen = (
		item: (TDynamicSubMenuItem & TStaticSubMenuItem) | ISubMenu,
		callbacks: {
			loginCallback: LoginCallbackType
			messageCallBack?: MessageCallbackType
		},
	) => {
		if (!item) return

		const isDynamic = (
			item: TDynamicSubMenuItem | TStaticSubMenuItem | ISubMenu,
		): item is TDynamicSubMenuItem => {
			return (item as TDynamicSubMenuItem)?.isTpMaintain !== undefined
		}

		// isTpMaintain的遊戲會無法點擊，而靜態 (isTpMaintain noPlay 會在 onStaticMenuOpen 擋掉)
		if (isDynamic(item) && item.isTpMaintain) return

		handleRedirectAction(item, callbacks)
	}

	/**
	 * 專門打開 Slots 遊戲
	 * @param {IEnterSlotsPageArgs} params - 老虎機遊戲參數
	 * @param {Object} callbacks - callback函數集合
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

		const host = getHost()
		const urls = buildBaseUrls(host)
		if (!urls) return

		const searchParams = buildSearchParams({
			tpId,
			fun: isFree ? '1' : '0',
			gameType: 'slots',
			tpGameType: tpGameType || '',
			gameId: gameId ? String(gameId) : '',
			LobbyUrl:
				Number(tpId) === PRODUCTS.PragmaticPlaySlot.tpId
					? `${host}${paths.slots.root}?tpId=${tpId}`
					: '',
		})

		const { signupUrl, loginUrl, errorUrl } = urls
		const entPageUrl = `${getDbHost()}/${locale}/entPage?homeUrl=${host}&signupUrl=${signupUrl}&LoginUrl=${loginUrl}&errorUrl=${errorUrl}&${searchParams.toString()}`

		onWindowOpenProduct({
			pathname: entPageUrl,
			windowKey: tpId,
		})
	}

	/**
	 * SPORT 9W 的開啟方式來自於代理商給的文件，因此需拉出單獨處理
	 */
	// const open9WSports = ({ url, userId, key }: IOpen9WSportsArgs) => {
	// 	const windowName = `w_9WSportsForm`
	// 	const form = document.createElement('form')
	// 	form.setAttribute('method', 'post')
	// 	form.setAttribute('action', url)
	// 	form.setAttribute('target', windowName)

	// 	const addIptField = ({ name, value }: { name: string; value: string }) => {
	// 		const hiddenField = document.createElement('input')
	// 		hiddenField.setAttribute('type', 'hidden')
	// 		hiddenField.setAttribute('name', name)
	// 		hiddenField.setAttribute('value', value)
	// 		form.appendChild(hiddenField)
	// 	}

	// 	addIptField({ name: 'userId', value: userId })
	// 	addIptField({ name: 'key', value: decodeURIComponent(key) })
	// 	document.body.appendChild(form)
	// 	window.open(
	// 		'',
	// 		windowName,
	// 		'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0',
	// 	)
	// 	form.submit()
	// 	form.remove()
	// }

	return {
		onMenuOpen,
		onEnterPage,
		onGoToGame,
		onEnterSlotsPage,
	}
}

export { useMenuOpen }

/**
 * 使用 launcher開遊戲以前的 goToGame 方法:
 * 
 * const onGoToGame = async (
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
 */
