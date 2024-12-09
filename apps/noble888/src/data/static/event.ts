import { paths, TEventData } from 'JF-constants'
import { ALLOWED_CURRENCIES } from './allowedCurrencies'

export const EVENT_DATA: TEventData[] = [
	{
		name: 'leaderBoard',
		path: paths.leaderBoard.root,
		desktopPicUrl: '/desktop/img/4.0/dropdown/event/leaderboard.png',
		h5PicUrl: '/h5/img/4.0/dropdown/event/leaderboard.png',
		label: 'Label_LeaderBoard',
		allowedCurrencies: ALLOWED_CURRENCIES.LEADER_BOARD,
		isNew: false,
		underMaintenance: false,
	},
	{
		name: 'predictionChallenge',
		path: paths.predictionChallenge.root,
		desktopPicUrl: '/desktop/img/4.0/dropdown/event/prediction-challenge.png',
		h5PicUrl: '/h5/img/4.0/dropdown/event/prediction-challenge.png',
		label: 'Label_Event_Prediction_Challenge',
		allowedCurrencies: ALLOWED_CURRENCIES.PREDICTION_CHALLENGE,
		isNew: false,
		underMaintenance: false,
	},
]
