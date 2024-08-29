import { cn } from 'JF-core'
import { useSocialChannelStore } from 'JF-operations'
import { TFunction } from 'i18next'
import React from 'react'

interface IContactSupportProps {
	t: TFunction<string, undefined>
	className?: string
}

const ContactSupport: React.FC<IContactSupportProps> = ({ t, className }) => {
	// 取得 Line 資料
	const { lineChannel } = useSocialChannelStore()

	return (
		<div className={cn('mt-8 text-center', className)}>
			<span className='mr-1 cursor-default'>
				{t('Label_General_Found_Problem')}
			</span>
			<a
				className='text-secondary-300 underline underline-offset-1'
				href={lineChannel.link}
				target='_blank'
				rel='noopener noreferrer'
			>
				{t('Label_General_Contact_Service')}
			</a>
		</div>
	)
}

export default ContactSupport
