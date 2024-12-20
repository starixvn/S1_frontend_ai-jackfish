import { cn, imageUrl } from 'JF-core'
import {
	useAuthStore,
	useGetBankInfo,
	useSocialChannelStore,
} from 'JF-operations'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SyncLoader } from 'react-spinners'
import ChangePasswordInput from './ChangePasswordInput'

const AccountInfo = () => {
	const { t } = useTranslation()
	const [showChangePassword, setShowChangePassword] = useState(false)
	const { lineChannel } = useSocialChannelStore()

	const {
		userInfo,
		userInfo: { userName },
	} = useAuthStore()

	const { bankInfo, isLoading } = useGetBankInfo()

	const {
		accountName,
		bankInfoDetail: [{ bankLogo = '', accountNo = '' } = {}] = [],
	} = bankInfo || {}

	if (isLoading)
		return (
			<div className='flex h-full items-center justify-center'>
				<SyncLoader color='#E1E1E1' />
			</div>
		)

	// 切換狀態以顯示或隱藏密碼變更表單
	const handleToggleChangePassword = () => {
		setShowChangePassword(prev => !prev)
	}

	return (
		<div className='center block h-full w-full justify-center overflow-y-scroll lg:h-[460px]'>
			<div className='flex w-full justify-center pb-3'>
				<h1 className='text-xl'>{t('Label_Profile_AccountInfo')}</h1>
			</div>
			{userInfo && (
				<>
					<div className='flex h-20 w-full cursor-pointer justify-center lg:relative'>
						<img
							className='h-20 w-20'
							src={imageUrl('/desktop/img/user-info.png')}
							alt='profile icon'
						/>
					</div>

					<div className='flex w-full justify-center py-1'>
						<div>
							<p>
								{t('Label_General_Username')}: {userName}
							</p>
						</div>
					</div>

					<div className='text-secondary-300 flex justify-center underline'>
						<div
							className='cursor-pointer'
							onClick={handleToggleChangePassword}
						>
							{t('Label_General_ChangePassword')}
						</div>
					</div>

					<div className='flex justify-center'>
						<div className='flex w-full flex-col justify-center lg:w-[70%] '>
							{/* 密碼變更表單顯示區域 */}
							<div
								className={cn(
									'overflow-hidden transition-all duration-1000',
									showChangePassword ? 'max-h-[400px]' : 'max-h-0',
								)}
							>
								{showChangePassword && (
									<div className='my-4'>
										<ChangePasswordInput />
									</div>
								)}
							</div>

							{bankInfo && (
								<div className='mx-auto flex w-full justify-center rounded p-2'>
									<div className='flex w-full flex-row items-center justify-center rounded-lg bg-white p-7'>
										<img
											className='h-10 w-10'
											src={`${process.env.NEXT_PUBLIC_PAYMENT_HOST}/square/${bankLogo?.toLowerCase()}`}
											alt='Bank Logo'
										/>
										<div className='ml-3 content-center font-semibold text-black'>
											<div className='flex justify-center'> </div>
											<p>{accountName}</p>
											<p>{accountNo}</p>
										</div>
									</div>
								</div>
							)}
						</div>
					</div>

					<div className='mt-7 flex justify-center px-5 pb-4 text-center'>
						<p>
							{t('Label_Profile_WantChangeAccount') +
								t('Label_Profile_Please') +
								' '}
							<a
								href={lineChannel.link}
								className='text-secondary-300 cursor-pointer underline'
								target='_blank'
								rel='noopener noreferrer'
							>
								{t('Label_General_Contact_Service')}
							</a>
						</p>
					</div>
				</>
			)}
		</div>
	)
}

export default AccountInfo
