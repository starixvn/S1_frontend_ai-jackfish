import Link from 'next/link'
import { useServerTranslation } from '../../../i18n'

export default async function Page({
	params: { locale },
}: {
	params: {
		locale: string
	}
}) {
	const { t } = await useServerTranslation(locale)
	return (
		<div className='grid grid-rows-3 place-items-center bg-primary min-h-full text-warning'>
			<Link href={`/${locale}`}>{t('Label_General_Home')}</Link>
			<img
				alt='test'
				className='w-24'
				src={`${
					process.env.NEXT_PUBLIC_IMAGE_HOST || ''
				}/img/sidebar/common-icon-casino.svg`}
			/>
		</div>
	)
}
