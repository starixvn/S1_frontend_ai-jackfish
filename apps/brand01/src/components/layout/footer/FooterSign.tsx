import dayjs from 'dayjs'

const FooterSign = () => {
	return (
		<span className='mt-1 block w-full text-center text-xs opacity-80 lg:text-sm'>
			{`Copyright © ${dayjs().year()} TUK555. All Rights Reserved.`}
		</span>
	)
}

export default FooterSign
