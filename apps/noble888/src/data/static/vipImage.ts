import { DeviceTypeEnum, TVipImageData } from 'JF-constants'

export enum VipLevelEnum {
	VINTAGE = 1,
	SILVER = 2,
	GOLD = 3,
	TITANIUM = 4,
	DIAMOND = 5,
	Highest = 6,
}

const deviceType = DeviceTypeEnum.Desktop

export const VIP_CLUB_IMAGES: TVipImageData[] = [
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip1.png`,
		displayKey: 'Label_Vip_Vintage_Club',
		settingDisplayKey: 'Label_VIP_Vintage',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-vintage.png`,
		levelTabsName: 'vintage',
		level: VipLevelEnum.VINTAGE,
		alt: 'vip01',
		levelColor: 'bg-[#c8600b]',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip2.png`,
		displayKey: 'Label_Vip_Silver_Club',
		settingDisplayKey: 'Label_VIP_Silver',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-silver.png`,
		levelTabsName: 'silver',
		level: VipLevelEnum.SILVER,
		alt: 'vip02',
		levelColor: 'bg-[#cacaca]',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip3.png`,
		displayKey: 'Label_Vip_Gold_Club',
		settingDisplayKey: 'Label_VIP_Gold',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-gold.png`,
		levelTabsName: 'gold',
		level: VipLevelEnum.GOLD,
		alt: 'vip03',
		levelColor: 'bg-[#ce9b0a]',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip4.png`,
		displayKey: 'Label_Vip_Titanium_Club',
		settingDisplayKey: 'Label_VIP_Titanium',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-titanium.png`,
		levelTabsName: 'titanium',
		level: VipLevelEnum.TITANIUM,
		alt: 'vip04',
		levelColor: 'bg-[#828282]',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip5.png`,
		displayKey: 'Label_Vip_Diamond_Club',
		settingDisplayKey: 'Label_VIP_Diamond',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-diamond.png`,
		levelTabsName: 'diamond',
		level: VipLevelEnum.DIAMOND,
		alt: 'vip05',
		levelColor: 'bg-[#63cde0]',
	},
	{
		url: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/${
			deviceType === DeviceTypeEnum.Desktop ? 'desktop' : 'h5'
		}/img/vip6.png`,
		displayKey: 'Label_Nova_Club',
		settingDisplayKey: 'Label_VIP_Nova88',
		headerUrl: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/header-nova.png`,
		levelTabsName: 'nova',
		level: VipLevelEnum.Highest,
		alt: 'vip06',
		levelColor: 'bg-[#d4d4d4]',
	},
]
