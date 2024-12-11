'use client'

import { useClientTranslation } from '@noble888/src/i18n/client'
import {
	PromotionCategory,
	PromotionType,
	PromotionWalletType,
} from 'JF-api/promotion/type'
import { usePromotionList } from 'JF-operations'
import { includes } from 'lodash-es'
import { parseAsStringEnum, useQueryState } from 'nuqs'
import { useMemo } from 'react'
import { ImGift } from 'react-icons/im'
import { PiCopy } from 'react-icons/pi'
import { DashboardTag } from '../common'
import PromotionList from './PromotionList'
import PromotionTabs, { ITab } from './PromotionTabs'

const tabs: Record<string, ITab> = {
	all: { label: 'Label_General_All', Icon: PiCopy },
	'new-member': { label: 'Label_General_NewMember' },
	special: { label: 'Label_General_Special' },
	'sports-book': { label: 'Label_General_SportBook' },
	casino: { label: 'Label_General_LiveCasino' },
	slots: { label: 'Label_General_Slots' },
	promocode: { label: 'Label_Promotions_PromoCode' },
}

export default function Promotion() {
	const { t } = useClientTranslation()
	const [activeTab, setActiveTab] = useQueryState(
		'type',
		parseAsStringEnum<keyof typeof tabs>(Object.keys(tabs)).withDefault('all'),
	)

	const { data = [] } = usePromotionList()

	const list = useMemo(
		() =>
			data.filter(({ promotionType, categoryId, walletType }) => {
				switch (activeTab) {
					case 'all':
						return true

					case 'new-member':
						return includes(
							[PromotionType.FirstDeposit, PromotionType.WalletBonus],
							promotionType,
						)

					case 'special':
						return includes([PromotionType.SpecialBonus], promotionType)

					case 'sports-book':
						return includes(
							[PromotionCategory.SabaSports, PromotionCategory.SBSW],
							categoryId,
						)

					case 'casino':
						return (
							categoryId === PromotionCategory.PtLiveCasino ||
							(walletType === PromotionWalletType.Seamless &&
								categoryId === PromotionCategory.LiveCasino)
						)
					case 'slots':
						return (
							includes(
								[
									PromotionCategory.PtSlots,
									PromotionCategory.Mega888SlotRNGFishing,
								],
								categoryId,
							) ||
							(walletType === PromotionWalletType.Seamless &&
								categoryId === PromotionCategory.Slots)
						)

					default:
						return false
				}
			}),
		[activeTab, data],
	)

	const translatedTabs = useMemo(() => {
		const newTabs = { ...tabs }
		for (const tab in newTabs) {
			newTabs[tab].label = t(newTabs[tab].label)
		}
		return newTabs
	}, [t])

	return (
		<div className='bg-primary-50 mx-auto flex max-w-[1400px] flex-col gap-6 px-5 pb-5'>
			<div className='max-lg:hidden'>
				<div className='mb-10'>
					<DashboardTag Icon={ImGift} title={t('Label_General_Promotion')} />
				</div>
				<PromotionTabs
					tabs={translatedTabs}
					selected={activeTab}
					onChange={setActiveTab}
				/>
			</div>
			<PromotionList list={list} />
		</div>
	)
}
