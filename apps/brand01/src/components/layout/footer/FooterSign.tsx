import dayjs from 'dayjs'

const FooterSign = () => {
	return (
		<>
			<span className='text-body-sm mt-1 block w-full text-center text-xs text-neutral-100 opacity-80'>
				{`Copyright © ${dayjs().year()} TUK555. All Rights Reserved.`}
			</span>
		</>
	)
}

export default FooterSign
