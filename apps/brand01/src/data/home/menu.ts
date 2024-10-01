import {
	LobbyCategoryEnum,
	MenuActionEnum,
	MenuKeyEnum,
	PRODUCTS,
	TProductProps,
	paths,
} from 'JF-constants'

export interface ISubMenu extends TProductProps {
	currencyGameName?: string | null
	iconEndTime?: string
	iconStartTime?: string
	iconType?: number
	lobbyCategory?: string
	pcHeaderPicUrl?: string
	pcLobbyPicUrl?: string
	mobileHeaderPicUrl?: string
	mobileLobbyPicUrl?: string
	productName?: string
	rwdHeaderPicUrl?: string
	rwdLobbyPicUrl?: string
	sort?: number
	tpName?: string
	h5: {
		menuActionType: keyof typeof MenuActionEnum
		hasDesktopLink?: boolean
	}
	desktop: {
		menuActionType: keyof typeof MenuActionEnum
		subMenuImageClassName?: string
	}
	pathname?: string
	query?: {
		provider?: string
		type?: string
		tpId?: string | number
	}
	// needLogin?: boolean
}

export type IMenuData = {
	category: MenuKeyEnum
	desktop: {
		subMenuClassName: string
		menuType?: 'menu' | 'banner'
	}
	displayKey?: string
	h5: {
		icon: string
		subMenuClassName?: string
	}
	iconUrl?: string
	lobbyCategoryId: number
	pathname?: string
	query?: { provider: string }
	subMenu: ISubMenu[]
	subMenuAllowCurrenciesWithAuth: boolean // * 決定是否需要登入後才過濾(暫時沒有用到)
}

export const HOME_MENU_DATA: IMenuData[] = [
	// sports
	{
		iconUrl: '/desktop/img/sport.png',
		lobbyCategoryId: LobbyCategoryEnum.Sports,
		category: MenuKeyEnum.Sports,
		displayKey: 'Label_General_Sports',
		pathname: paths.sports.root,
		query: { provider: 'Soccer' },
		desktop: {
			subMenuClassName: 'sportsList',
		},
		h5: {
			icon: 'sports',
			subMenuClassName: 'sports',
		},
		subMenu: [
			{
				...PRODUCTS.CryptoSports,
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Soccer,
				pathname: paths.sports.root,
				query: { provider: 'Soccer' },
				desktop: {
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.SabaSoccer,
				pathname: paths.sports.root,
				query: { provider: 'SabaSoccer' },
				desktop: {
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Basketball,
				pathname: paths.sports.root,
				query: { provider: 'Basketball' },
				desktop: {
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Cricket,
				pathname: paths.sports.root,
				query: { provider: 'Cricket' },
				desktop: {
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Badminton,
				pathname: paths.sports.root,
				query: { provider: 'Badminton' },
				desktop: {
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Volleyball,
				pathname: paths.sports.root,
				query: { provider: 'Volleyball' },
				desktop: {
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				pathname: paths.sports.root,
				query: { provider: 'VirtualSports' },
				...PRODUCTS.VirtualSports,
				desktop: {
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},

	// esports
	{
		iconUrl: '/desktop/img/esport.png',
		displayKey: 'Label_General_ESports',
		category: MenuKeyEnum.ESports,
		pathname: paths.eSport.root,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.ESports,
		desktop: {
			subMenuClassName: 'eSportsList',
		},
		h5: {
			icon: 'esports',
		},
		subMenu: [
			{
				...PRODUCTS.ESportALL,
				pathname: paths.eSport.root,
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.IMESports,
				pathname: paths.eSport.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.TFGaming,
				pathname: paths.eSport.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
	},

	// casinos
	{
		iconUrl: '/desktop/img/casino.png',
		h5: {
			icon: 'casino',
		},
		desktop: {
			subMenuClassName: 'casinoList',
		},
		category: MenuKeyEnum.Casino,
		displayKey: 'Label_General_LiveCasino',
		pathname: paths.liveCasino.root,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.Casino,
		subMenu: [
			{
				...PRODUCTS.PragmaticPlayCasino,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.WonCasino,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},

			{
				...PRODUCTS.BigGaming,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.YeebetCasino,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.SkywindCasino,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.MicrogamingCasino,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.EvolutionGaming,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.NewPlayTechCasino,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.UseGoToGame,
				},
				desktop: {
					menuActionType: MenuActionEnum.UseGoToGame,
				},
			},
			{
				...PRODUCTS.n2LIVE,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.WMCasino,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Allbet,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.WE,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.SAGaming,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AESexy,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.DreamGaming,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AsiaGaming,
				pathname: paths.liveCasino.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
	},

	// slots
	{
		iconUrl: '/desktop/img/slot.png',
		h5: {
			icon: 'slots',
		},
		desktop: {
			subMenuClassName: 'livecasinoList',
		},
		category: MenuKeyEnum.Slots,
		displayKey: 'Label_General_Slots',
		pathname: paths.slots.root,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.SLOTS,
		subMenu: [
			{
				...PRODUCTS.PragmaticPlaySlot,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PragmaticPlaySlot.tpId,
				},
			},
			{
				...PRODUCTS.Spadegaming,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Spadegaming.tpId,
				},
			},
			{
				...PRODUCTS.AdvantPlay,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AdvantPlay.tpId,
				},
			},
			{
				...PRODUCTS.AmigoGaming,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AmigoGaming.tpId,
				},
			},
			{
				...PRODUCTS.ES,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.ES.tpId,
				},
			},
			{
				...PRODUCTS.Nextspin,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Nextspin.tpId,
				},
			},
			{
				...PRODUCTS.PGSoft,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PGSoft.tpId,
				},
			},
			{
				...PRODUCTS.BNG,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.BNG.tpId,
				},
			},
			{
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.FaChai.tpId,
				},
				...PRODUCTS.FaChai,
			},
			{
				...PRODUCTS.MicrogamingSlot,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.MicrogamingSlot.tpId,
				},
			},
			{
				...PRODUCTS.JILI,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.JILI.tpId,
				},
			},
			{
				...PRODUCTS.SPRIBE,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.SPRIBE.tpId,
				},
			},
			{
				...PRODUCTS.Joker,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Joker.tpId,
				},
			},
			{
				...PRODUCTS.Pegasus,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Pegasus.tpId,
				},
			},
			{
				...PRODUCTS.NoLimitCity,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: {
					menuActionType: MenuActionEnum.Link,
				},
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.NoLimitCity.tpId,
				},
			},
			{
				...PRODUCTS.RedTiger,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.RedTiger.tpId,
				},
			},
			{
				...PRODUCTS.NetEnt,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.NetEnt.tpId,
				},
			},
			{
				...PRODUCTS.CQ9,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.CQ9.tpId,
				},
			},
			{
				...PRODUCTS.PlaynGO,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PlaynGO.tpId,
				},
			},
			{
				...PRODUCTS.GamePlay,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.GamePlay.tpId,
				},
			},
			{
				...PRODUCTS.YGGDrassil,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.YGGDrassil.tpId,
				},
			},
			{
				...PRODUCTS.AMBPoker,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AMBPoker.tpId,
				},
			},
			{
				...PRODUCTS.Habanero,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Habanero.tpId,
				},
			},
			{
				...PRODUCTS.SimplePlay,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.SimplePlay.tpId,
				},
			},
			{
				...PRODUCTS.SkywindSlot,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.SkywindSlot.tpId,
				},
			},
			{
				...PRODUCTS.NewPlayTechSlot,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.NewPlayTechSlot.tpId,
				},
			},
			{
				...PRODUCTS.AskmeSlot,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AskmeSlot.tpId,
				},
			},
			{
				...PRODUCTS.PG,
				h5: {
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PG.tpId,
				},
			},
		],
	},

	// games
	{
		iconUrl: '/desktop/img/games.png',
		h5: {
			icon: 'games',
		},
		desktop: { subMenuClassName: 'tableList' },
		category: MenuKeyEnum.Games,
		displayKey: 'Label_General_Games',
		pathname: paths.game.root,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.Game,
		subMenu: [
			{
				...PRODUCTS.MPPoker,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AMBPoker,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Vgaming,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.KingMaker,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.V8Poker,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Aviator,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Mines,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Goal,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Dice,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Spaceman,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Crash,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.GoRush,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.MaxGame,
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS['93Connect'],
				pathname: paths.game.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
	},

	// fishings
	{
		iconUrl: '/desktop/img/fishing.png',
		h5: {
			icon: 'fishing',
		},
		desktop: {
			subMenuClassName: 'fishList',
		},
		category: MenuKeyEnum.Fishing,
		displayKey: 'Label_General_Fishing',
		pathname: paths.fishing.root,
		lobbyCategoryId: LobbyCategoryEnum.Fishing,
		subMenu: [
			{
				...PRODUCTS.FishingGod,
				pathname: paths.fishing.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.FishingWar,
				pathname: paths.fishing.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.ZombieParty,
				pathname: paths.fishing.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AlienHunter,
				pathname: paths.fishing.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Paradise,
				pathname: paths.fishing.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.FishHaiba,
				pathname: paths.fishing.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.HappyFish5,
				pathname: paths.fishing.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.MonsterAwaken,
				pathname: paths.fishing.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.OneshotFishing,
				pathname: paths.fishing.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},

	// lotteries
	{
		iconUrl: '/desktop/img/lottery.png',
		h5: {
			icon: 'lottery',
		},
		desktop: { subMenuClassName: 'gameList' },
		displayKey: 'Label_General_Lottery',
		pathname: paths.lottery.root,
		category: MenuKeyEnum.Lottery,
		lobbyCategoryId: LobbyCategoryEnum.Lottery,
		subMenu: [
			{
				...PRODUCTS.GPIKeno,
				pathname: paths.lottery.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.ThaiLottery,
				pathname: paths.lottery.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Fast3,
				pathname: paths.lottery.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.TCG,
				pathname: paths.lottery.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Keno,
				pathname: paths.lottery.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Lottery,
				pathname: paths.lottery.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.NumberGame,
				pathname: paths.sports.root,
				query: { provider: 'NumberGame' },
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: { menuActionType: MenuActionEnum.Link },
			},
			{
				...PRODUCTS.TableGame,
				pathname: paths.lottery.root,
				h5: {
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},
]
