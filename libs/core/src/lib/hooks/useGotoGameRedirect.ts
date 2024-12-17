'use client'
import { IAxiosError } from 'JF-api/baseApi'
import { useGoToGame } from 'JF-api/tp/client'
import { LoginGameTypeEnum, PRODUCTS } from 'JF-constants'
import { some } from 'lodash-es'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { getDeviceType } from '../utils/client'

export const useGotoGameRedirect = () => {
	const pathname = usePathname()
	const router = useRouter()

	// const { modal } = useGlobalModal()

	useEffect(() => {
		const searchParams = new URLSearchParams(window.location.search)
		const launch = async () => {
			try {
				// 使用 searchParams.get() 來獲取參數
				const tpId = searchParams.get('tpId')
				const langId = searchParams.get('langId')
				const gameId = searchParams.get('gameId')
				const tpGameType = searchParams.get('tpGameType')
				const loginGameType = searchParams.get('loginGameType')
				const fun = searchParams.get('fun')
				const gameType = searchParams.get('gameType')

				const isParamsMissing = some(
					[tpId, langId, gameId, tpGameType, loginGameType],
					param => param === undefined,
				)
				if (isParamsMissing) throw new Error('Missing parameters')

				const { message } = await useGoToGame({
					appType: getDeviceType(),
					tpId: Number(tpId),
					langId: String(langId),
					inputs: {
						fun: Number(fun) ? '1' : '0',
						gameType: String(gameType),
						gameId: String(gameId),
						tpGameType: String(tpGameType),
						loginGameType: String(loginGameType),
					},
				})

				if (message) {
					if (Number(tpId) === PRODUCTS.Nova88Exchange.tpId) {
						const { url, userId, key } = JSON.parse(message) ?? {}
						const form = document.createElement('form')
						form.setAttribute('method', 'post')
						form.setAttribute('action', url)

						const addIptField = ({
							name,
							value,
						}: {
							name: string
							value: string
						}) => {
							const hiddenField = document.createElement('input')
							hiddenField.setAttribute('type', 'hidden')
							hiddenField.setAttribute('name', name)
							hiddenField.setAttribute('value', value)
							form.appendChild(hiddenField)
						}

						addIptField({ name: 'userId', value: userId })
						addIptField({ name: 'key', value: decodeURIComponent(key) })
						document.body.appendChild(form)
						form.submit()
						form.remove()
					} else if (loginGameType !== '') {
						if (Number(loginGameType) === LoginGameTypeEnum.returnHtml) {
							const newDocument = document.open('text/html', 'replace')
							newDocument.write(message)
							newDocument.close()
						} else {
							document.open(message)
						}
					} else {
						window.open(
							message,
							'Under Maintenance',
							'toolbar=no, menubar=no,scrollbars=no,resizable=no,location=no,directories=no,status=no, top=0, left=0',
						)
					}
				} else throw new Error()
			} catch (error) {
				const { errorCode } = error as IAxiosError
				if (errorCode === 3000) {
					// eslint-disable-next-line no-console
					console.error('Under Maintenance')
				} else {
					router.push('/')
				}
			}
		}

		if (pathname) launch()
	}, [pathname, router])
}
