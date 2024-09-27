import axios from 'axios'
import { GetServerSidePropsContext } from 'next'

declare module 'axios' {
	interface AxiosRequestConfig {
		log?: boolean
	}
}

export interface IAxiosResponse<T> {
	data: T
	totalPages?: number
	pageNumber?: number
	rowCount?: number
	errorCode: number
	message: string
	rawErrorCode?: string
	rawMessage?: string
}

export interface IAxiosError extends globalThis.Error {
	status?: number
	statusText?: string
	errorCode?: number
	data?: unknown
	rawMessage?: string
}

export interface CustomHeaders {
	[key: string]: string | undefined // Allow additional headers
}

const isServer = typeof window === 'undefined'

export const baseUrl = '/api/'

const preHeaders = {
	'ai-host': `${process.env['NEXT_PUBLIC_REFERER_HOST']}`,
	// 'origin-host':
	// 	typeof window !== 'undefined' ? window?.location?.origin : undefined,
}

export const baseAxios = axios.create({
	withCredentials: true,
	baseURL: isServer
		? `${process.env['NEXT_PUBLIC_ENV_DB_HOST']}${baseUrl}`
		: baseUrl,
	headers: {
		common: {
			'ai-host': `${process.env['NEXT_PUBLIC_REFERER_HOST']}`,
			// 'origin-host':
			// 	typeof window !== 'undefined' ? window?.location?.origin : undefined,
		},
	},
})

export const fetcher = async <Response = undefined, Data = any, Params = any>(
	url: string,
	data?: Data,
	method: 'GET' | 'POST' = 'POST',
	params?: Params,
	headers?: CustomHeaders,
): Promise<IAxiosResponse<Response>> => {
	const isClient = typeof window !== 'undefined'

	const finalHeaders = {
		'ai-host': `${process.env['NEXT_PUBLIC_REFERER_HOST']}`,
		...headers,
	}

	if (isClient) {
		finalHeaders['origin-host'] = window.location.origin
	} else {
		finalHeaders['origin-host'] = 'https://membersiteservice.nova88dev.com'
	}

	// Remove 'host' header if it's set
	delete finalHeaders['host']

	// Remove unnecessary headers that might cause conflicts
	delete finalHeaders['referer']
	delete finalHeaders['origin']
	delete finalHeaders['x-forwarded-host']
	delete finalHeaders['x-forwarded-port']
	delete finalHeaders['x-forwarded-proto']
	delete finalHeaders['x-forwarded-for']

	try {
		const response = await baseAxios({
			url,
			method,
			headers: {
				...preHeaders,
				...headers,
			},
			...(data && { data }),
			...(params && { params }),
		})
		const axiosData: IAxiosResponse<Response> = response.data

		// 非 0 就視為錯誤
		if (axiosData?.errorCode !== 0) {
			const error: IAxiosError = new Error()
			error.message = axiosData?.message
			error.status = response.status
			error.statusText = response.statusText
			error.errorCode = axiosData?.errorCode
			error.data = axiosData?.data
			error.rawMessage = axiosData?.rawMessage

			throw error
		}

		return axiosData
	} catch (axiosError) {
		throw axiosError as IAxiosError
	}
}

export function setServerSideHeaders(context: GetServerSidePropsContext): void {
	// 從 context 物件中解構出 req
	const { req } = context

	const ipHeaders = {
		'x-forwarded-for':
			req.headers['x-forwarded-for'] || req.socket?.remoteAddress,
		'X-Client-IP': req.headers['x-client-ip'],
		'cloudfront-viewer-address': req.headers['cloudfront-viewer-address'],
	}

	// 為 baseAxios 實例設置預設 headers
	baseAxios.defaults.headers.common = {
		...baseAxios.defaults.headers.common,
		...ipHeaders,
	}
}

// 在 serverSideProps api request 添加 log ,在 serverSide api 中添加 {log : true} 屬性即可將 request 添加在 server log 中
baseAxios.interceptors.request.use(
	config => {
		if (config.log) {
			console.log('Sending request:', config)
		}
		return config
	},
	error => {
		return Promise.reject(error)
	},
)

export default baseAxios
