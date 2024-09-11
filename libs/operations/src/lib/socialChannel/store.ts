// socialChannelStore.ts
import { getSocialChannel } from 'JF-api/site/client'
import { TSocialChannelData } from 'JF-api/site/type'
import { find } from 'lodash-es'
import { create } from 'zustand'
import { ISocialChannelAction, ISocialChannelState } from './type'

const defaultSocialChannel: TSocialChannelData = {
	id: 0,
	channelName: '',
	title: '',
	link: '',
	linkType: 2,
	scheme: {
		ios: '',
		android: '',
	},
}

const useSocialChannelStore = create<
	ISocialChannelState & ISocialChannelAction
>(set => ({
	socialChannels: [],
	lineChannel: defaultSocialChannel,
	getSocialChannels: async ({ langId, currencyId }) => {
		const data = await getSocialChannel({
			langId,
			currencyId,
			displayPage: 1,
		})
		set({ socialChannels: data })
		set({
			lineChannel:
				find(data, channel => channel.channelName === 'LINE') ??
				defaultSocialChannel,
		})
	},
}))

export { useSocialChannelStore }
