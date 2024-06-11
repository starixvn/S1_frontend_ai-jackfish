const { composePlugins, withNx } = require('@nx/next')


/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
	nx: {
		// Set this to true if you would like to use SVGR
		// See: https://github.com/gregberge/svgr
		svgr: false
	},
	images: {
		// 因為存在太多外部連結，先全打開
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**'
			}
		]
	},
	async rewrites() {
		const rewrites = [
			{
				source: '/api/:path*',
				destination: `${process.env.NEXT_PUBLIC_ENV_DB_HOST}/api/:path*`,
				locale: false
			},
			{
				source: '/:langId/Cashier/:path*',
				destination: `${process.env.NEXT_PUBLIC_ENV_DB_HOST}/:langId/Cashier/:path*`,
				locale: false
			},
			{
				source: '/health',
				destination: '/api/health'
			}
		]
		return {
			beforeFiles: [],
			afterFiles: [],
			fallback: rewrites
		}
	}
}

const plugins = [
	// Add more Next.js plugins to this list if needed.
	withNx
]

module.exports = composePlugins(...plugins)(nextConfig)
