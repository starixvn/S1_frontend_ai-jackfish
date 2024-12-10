export const paths = {
	home: {
		root: '/',
	},
	promotion: {
		root: '/promotion',
	},
	transferFunds: {
		root: '/transfer-funds',
	},
	join: {
		root: '/join',
	},
	history: {
		root: '/history',
	},
	login: {
		root: '/login',
	},
	statement: {
		root: '/statement',
	},
	bankInfo: {
		root: '/bank-info',
	},
	cryptoWallet: {
		root: '/crypto-wallet',
	},
	changePassword: {
		root: '/change-password',
	},
	message: {
		root: '/message',
	},
	announcement: {
		root: '/announcement',
	},
	forgetPassword: {
		root: '/forget-password',
	},
	deposit: {
		root: '/deposit',
	},
	referralHistory: {
		root: '/referral-history',
	},
	depositHistory: {
		root: '/deposit-history',
	},
	withdrawalHistory: {
		root: '/withdrawal-history',
	},
	transferHistory: {
		root: '/transfer-history',
	},
	financialLog: {
		root: '/financial-log',
	},
	withdrawal: {
		root: '/withdrawal',
	},
	eWalletWithdrawal: {
		root: '/eWallet-withdrawal',
	},
	cryptoWithdrawal: {
		root: '/crypto-withdrawal',
	},
	kycWaiting: {
		root: '/kyc-waiting',
	},
	kyc: {
		root: '/kyc',
	},
	profile: {
		root: '/profile',
	},
	wallet: {
		root: '/wallet',
	},
	eWallet: {
		root: '/eWallet',
	},
	referral: {
		root: '/referral',
	},
	selfExclusion: {
		root: '/self-exclusion',
	},
	appDownload: {
		root: '/app-download',
	},
	vip: {
		root: '/vip',
	},
	sports: {
		root: '/sports',
	},
	eSport: {
		root: '/eSport',
	},
	liveCasino: {
		root: '/live-casino',
	},
	slots: {
		root: '/slots',
	},
	oneGame: {
		root: '/poker',
	},
	fishing: {
		root: '/fishing',
	},
	fourD: {
		root: '/4D',
	},
	game: {
		root: '/game',
	},
	lottery: {
		root: '/lottery',
	},
	numberGame: {
		root: '/numberGame',
	},
	keno: {
		root: '/keno',
	},
	setting: {
		root: '/setting',
	},
	menu: {
		root: '/menu',
	},
	myAccount: {
		root: '/my-account',
	},
	leaderBoard: {
		root: '/leaderBoard',
	},
	rewards: {
		root: '/rewards',
	},
	newsInfo: {
		root: '/news-info',
	},
	luckyWheel: {
		root: '/luckyWheel',
	},
	gameProvider: {
		root: '/game-provider',
	},
	europeCup: {
		root: '/euro-cup',
	},
	milestones: {
		root: '/milestones',
	},
	retention: {
		root: '/retention',
	},
	olympic: {
		root: '/olympic',
	},
	survey: {
		root: '/survey',
	},
	news: {
		root: '/news',
	},
	// slot 專用 page
	slotLobby: {
		root: '/slot-lobby',
	},
	blockIp: {
		root: '/block-ip',
	},
	predictionChallenge: {
		root: '/prediction-challenge',
	},
} as const

export type IRootpath = (typeof paths)[keyof typeof paths]['root']
