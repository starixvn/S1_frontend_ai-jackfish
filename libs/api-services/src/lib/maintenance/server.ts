'use server'

export async function getStaticMaintenance(site = 'NOVA88'): Promise<{
	Maintain: boolean
	UTCTimeStart: string
	UTCTimeEnd: string
	DateTimeStart: string
	DateTimeEnd: string
	ExcludeDomain: string[]
} | null> {
	const isProduction = process.env.NODE_ENV === 'production'
	try {
		const response = await fetch(
			isProduction
				? `https://error.0814media.net/${site}/maintain.json`
				: `https://error.0814media.net/${site}/maintain_test.json`,
			{
				// next: {
				//   revalidate: 60,
				// },
			},
		)

		return response.json()
	} catch (error) {
		return null
	}
}
