import Button from '@brand01/src/components/button'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { paths } from 'JF-constants'
import { imageUrl, useGetPathname, useLocaleRouter } from 'JF-core'

const Welcome: React.FC = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const router = useLocaleRouter()

	return (
		<>
			<div className='grid place-items-center'>
				<img
					className='h-40 w-40'
					src={imageUrl('/img/popup/popup-successfully.png')}
					alt='successfully'
				/>
			</div>
			<div className='mt-4 text-center text-base'>
				{t('Label_Join_AfterJoinHint')}
			</div>
			<div className='mt-1 text-center text-base'>
				{t('Label_General_Welcome')}
			</div>
			<div className='mt-14 lg:mt-11'>
				<Button
					className='h-12 w-full'
					onClick={() => router.push(paths.home.root)}
				>
					{t('Label_General_Enter')}
				</Button>
			</div>
		</>
	)
}

export default Welcome
