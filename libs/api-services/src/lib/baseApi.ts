import axios from 'axios'
import { GetServerSidePropsContext } from 'next'

declare module 'axios' {
	interface AxiosRequestConfig {
		log?: boolean
	}
}

export const baseUrl = '/api/'

// use in serverSide
export const baseAxios = axios.create({
	withCredentials: true,
	baseURL: `${process.env['NEXT_PUBLIC_ENV_DB_HOST']}${baseUrl}`,
	headers: {
		common: {
			'ai-host': `${process.env['NEXT_PUBLIC_REFERER_HOST']}`, // 預設 referrer
			'origin-host':
				typeof window !== 'undefined' ? window?.location?.origin : undefined,
		},
	},
})

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
	}
)

export default baseAxios
