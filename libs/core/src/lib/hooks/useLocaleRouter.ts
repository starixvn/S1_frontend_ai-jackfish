'use client'

import { useGetPathname } from 'JF-core'
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { useRouter } from 'next/navigation'

interface ILocalePushOptions extends NavigateOptions {
	locale?: string
}

const useLocaleRouter = () => {
	const { locale: pathLocale } = useGetPathname()
	const { push: defaultPush, ...rest } = useRouter()
	const push = (href: string, options?: ILocalePushOptions) => {
		const { locale = pathLocale, ...restOptions } = options ?? {}
		defaultPush(`/${locale}/${href}`, { ...restOptions })
	}

	return { push, ...rest }
}

export { useLocaleRouter }
