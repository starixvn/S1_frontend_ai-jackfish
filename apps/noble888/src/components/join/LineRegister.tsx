import { useClientTranslation } from '@noble888/src/i18n/client'
import { lineLoginDirect } from 'JF-api/lineLogin/client'
import { LineLoginDirectTypeEnum } from 'JF-api/lineLogin/type'
import { FaLine } from 'react-icons/fa'
import { Button } from '../common'

const LineRegister = () => {
	const { t } = useClientTranslation()

	const handleLineRegister = async () => {
		const lineLoginDirectUrl = await lineLoginDirect({
			type: LineLoginDirectTypeEnum.Register,
		})

		if (lineLoginDirectUrl) {
			window.location.href = lineLoginDirectUrl
		}
	}

	return (
		<>
			<div className='my-5 flex items-center justify-between font-semibold'>
				{t('Label_Join_RegisterWithLine')} ID
				<Button
					className='h-8 bg-green-500 text-white'
					htmlType='button'
					onClick={handleLineRegister}
				>
					<FaLine size={14} />
					<span className='ms-1'>{t('Label_Join_RegisterWithLine')}</span>
				</Button>
			</div>
			<div className='border-primary-700 mb-5 mt-2.5 border-b text-center leading-[.08]'>
				<span className='bg-white px-2.5 py-[5px]'>OR</span>
			</div>
		</>
	)
}

export { LineRegister }
