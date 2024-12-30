'use client'

import { Tooltip, TooltipPlacementEnum } from '@noble888/src/components/common'
import { VIP_CLUB_IMAGES } from '@noble888/src/data/static'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { numberFormat } from 'JF-core'
import { useAuthStore } from 'JF-operations'
// import { useAuthStore } from 'JF-operations'
import { BsCheck } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { FaMobileScreenButton } from 'react-icons/fa6'
import { MdOutlineEmail } from 'react-icons/md'

const Verification = () => {
	const { t } = useClientTranslation()
	const {
		userInfo: {
			userLevel,
			currencyId,
			emailReward,
			phoneReward,
			accountName,
			currencyName,
			phoneVerified,
			emailVerified,
		},
	} = useAuthStore()

	const TipContent = (i18nKeys: string[]) => {
		const enum ContentEnum {
			Title,
			Hint1,
			Hint2,
		}
		return (
			<div className='flex flex-col items-center justify-center p-2'>
				<div className='text-secondary-500 mb-2 text-xs font-bold'>
					{i18nKeys[ContentEnum.Title]}
				</div>
				<div>{i18nKeys[ContentEnum.Hint1]}</div>
				<div>{i18nKeys[ContentEnum.Hint2]}</div>
			</div>
		)
	}

	return (
		<div className='mb-5 mt-5 space-y-4 lg:h-96 lg:flex lg:flex-col lg:justify-center lg:col-span-2 lg:bg-gray-1000'>
			{/* VIP 徽章區 */}
			<div className='flex flex-col items-center'>
				<div className='mb-2 h-28 w-28'>
					<img
						className='h-full w-full object-cover'
						src={VIP_CLUB_IMAGES[0].url}
						alt={VIP_CLUB_IMAGES[0].alt}
					/>
				</div>
				<div className='bg-primary-800 text-primary-100 rounded-3xl px-4 py-1 text-center text-xs font-bold'>
					{t(VIP_CLUB_IMAGES[0].displayKey as string)}
				</div>
			</div>

			{/* 帳戶安全性 */}
			<div className='flex flex-col items-center'>
				<div>
					<span className='text-xs font-bold'>
						{t('Label_Profile_AccountSafety')}
					</span>
					{/* 動態產生字 */}
					<span className='text-primary-900  text-xs'> : Excellent</span>
				</div>
				<div className='mt-7 flex space-x-2'>
					<span className='h-3 w-10  bg-yellow-400' />
					<span className='h-3 w-10  bg-green-500' />
					<span className='h-3 w-10  bg-green-500' />
				</div>
			</div>

			{/* 使用者驗證 */}
			<div className='flex flex-col  items-center'>
				<div className='text-primary-900 text-xs font-bold '>
					{t('Label_Profile_UserVerification')}
				</div>

				<div className='flex gap-4'>
					{/* 使用者驗證狀態 */}
					<Tooltip
						content={TipContent([
							t('Label_Profile_ProfileVerification'),
							t('Label_Profile_ProfileVerificationHint1'),
							t('Label_Profile_ProfileVerificationHint2', {
								currency: currencyName,
								amount: numberFormat(phoneReward ?? 0, currencyId),
							}),
						])}
						placement={TooltipPlacementEnum.Bottom}
					>
						<div className='mt-4 flex cursor-pointer space-x-4'>
							<div className='bg-primary-300 relative flex h-11 w-11 items-center justify-center rounded-full'>
								<FaUser className='text-gray-0-alpha-0' size={25} />
								<div className='bg-primary-700 absolute -bottom-1 -end-1 rounded-full'>
									<BsCheck className='text-gray-0' size={20} />
								</div>
							</div>
						</div>
					</Tooltip>

					{/* 郵件驗證狀態 */}
					<Tooltip
						content={TipContent([
							t('Label_Profile_EmailVerification'),
							t('Label_Profile_EmailVerificationHint1'),
							t('Label_Profile_EmailVerificationHint2', {
								currency: currencyName,
								amount: numberFormat(emailReward ?? 0, currencyId),
							}),
						])}
						placement={TooltipPlacementEnum.Bottom}
					>
						<div className='mt-4 flex cursor-pointer space-x-4'>
							<div className='bg-primary-300 relative flex h-11 w-11 items-center justify-center rounded-full'>
								<MdOutlineEmail className='text-gray-0' size={25} />
								<div className='bg-primary-700 absolute -bottom-1 -end-1 rounded-full'>
									<BsCheck className='text-gray-0' size={20} />
								</div>
							</div>
						</div>
					</Tooltip>

					{/* 電話驗證狀態 */}
					<Tooltip
						content={TipContent([
							t('Label_Profile_PhoneVerification'),
							t('Label_Profile_PhoneVerificationHint1'),
							t('Label_Profile_PhoneVerificationHint2', {
								currency: currencyName,
								amount: numberFormat(phoneReward ?? 0, currencyId),
							}),
						])}
						placement={TooltipPlacementEnum.Bottom}
					>
						<div className='mt-4 flex cursor-pointer space-x-4'>
							<div className='bg-primary-300 relative flex h-11 w-11 items-center justify-center rounded-full'>
								<FaMobileScreenButton
									className='text-gray-0'
									size={25}
								/>
								<div className='bg-primary-700 absolute -bottom-1 -end-1 rounded-full'>
									<BsCheck className='text-gray-0' size={20} />
								</div>
							</div>
						</div>
					</Tooltip>
				</div>
			</div>
		</div>
	)
}

export { Verification }
