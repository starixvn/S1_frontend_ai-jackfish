interface IReferralSteps {
	name: string
	subjectLabel: string
	contentLabel: string
}

interface ISocialMedia {
	name: string
	url: string
}

export const referralSteps: IReferralSteps[] = [
	{
		name: 'share',
		subjectLabel: 'Label_General_Share',
		contentLabel: 'Label_Referral_ShareDescription',
	},
	{
		name: 'recharge',
		subjectLabel: 'Label_General_Recharge',
		contentLabel: 'Label_Referral_Recharge',
	},
	{
		name: 'reward',
		subjectLabel: 'Label_General_Rewards',
		contentLabel: 'Label_Referral_RewardsDescription',
	},
]

export const socialMedias: ISocialMedia[] = [
	{
		name: 'facebook',
		url: `https://www.facebook.com/sharer/sharer.php?u={{ref_url}}&quote={{text}}`,
	},
	{
		name: 'whatsapp',
		url: `https://wa.me/?text={{text}} {{ref_url}}`,
	},
	{
		name: 'telegram',
		url: `https://t.me/share/url?url={{ref_url}}&text={{text}}`,
	},
	{
		name: 'line',
		url: `http://line.naver.jp/R/msg/text/?{{text}}%0D%0A{{ref_url}}`,
	},
]
