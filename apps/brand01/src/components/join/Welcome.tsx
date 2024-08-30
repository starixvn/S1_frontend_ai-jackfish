import Button from '@brand01/src/components/button'
import { TFunction } from 'i18next'
import { paths } from 'JF-constants'
import { imageUrl, useLocaleRouter } from 'JF-core'

interface IWelcomeProps {
	t: TFunction<string, undefined>
}

const Welcome: React.FC<IWelcomeProps> = ({ t }) => {
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
