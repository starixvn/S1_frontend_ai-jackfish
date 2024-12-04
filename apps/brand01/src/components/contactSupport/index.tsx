import React from 'react'
import { useClientTranslation } from '@brand01/src/i18n/client'
import { cn, useGetPathname } from 'JF-core'
import { useSocialChannelStore } from 'JF-operations'

interface IContactSupportProps {
	className?: string
}

const ContactSupport: React.FC<IContactSupportProps> = ({ className }) => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
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
