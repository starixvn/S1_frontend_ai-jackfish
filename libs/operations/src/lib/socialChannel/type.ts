import { TSocialChannelData } from 'JF-api/site/type'

export interface ISocialChannelState {
	socialChannels: TSocialChannelData[]
	lineChannel: TSocialChannelData
}

export interface ISocialChannelAction {
	getSocialChannels: ({
		currencyId,
		langId,
	}: {
		currencyId: number
		langId: string
	}) => Promise<void>
}
