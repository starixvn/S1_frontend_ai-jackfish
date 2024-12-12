import {
	LobbyCategoryEnum,
	MenuActionEnum,
	MenuKeyEnum,
	PRODUCTS,
	TMenuData,
} from 'JF-constants'
import { paths } from 'libs/constants/src/lib/paths'

export const MENU_DATA: TMenuData[] = [
	{
		display: 'all',
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
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Soccer,
				pathname: paths.sports.root,
				query: { provider: 'Soccer' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.SabaSoccer,
				pathname: paths.sports.root,
				query: { provider: 'SabaSoccer' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Basketball,
				pathname: paths.sports.root,
				query: { provider: 'Basketball' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Cricket,
				pathname: paths.sports.root,
				query: { provider: 'Cricket' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Badminton,
				pathname: paths.sports.root,
				query: { provider: 'Badminton' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Volleyball,
				pathname: paths.sports.root,
				query: { provider: 'Volleyball' },
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				pathname: paths.sports.root,
				query: { provider: 'VirtualSports' },
				...PRODUCTS.VirtualSports,
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.Link,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},
	{
		display: 'all',
		displayKey: 'Label_General_Exchange',
		category: MenuKeyEnum.Exchange,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.Exchange,
		desktop: {
			subMenuClassName: 'exchangeList',
		},
		h5: {
			icon: 'exchange',
		},
		subMenu: [
			{
				...PRODUCTS.Nova88Exchange,
				needLogin: true,
				desktop: {
					hasLobby: false,
					menuActionType: MenuActionEnum.UseGoToGame,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.UseGoToGame,
				},
			},
		],
	},
	{
		display: 'all',
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
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.IMESports,
				pathname: paths.eSport.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.TFGaming,
				pathname: paths.eSport.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
	},
	{
		display: 'all',
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
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.WonCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},

			{
				...PRODUCTS.BigGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.YeebetCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.SkywindCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.MicrogamingCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.EvolutionGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.NewPlayTechCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.UseGoToGame,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.UseGoToGame,
				},
			},
			{
				...PRODUCTS.n2LIVE,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.WMCasino,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Allbet,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.WE,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.SAGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AESexy,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.DreamGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AsiaGaming,
				pathname: paths.liveCasino.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
	},
	{
		display: 'all',
		h5: {
			icon: 'slots',
		},
		desktop: {
			subMenuClassName: 'livecasinoList',
		},
		category: MenuKeyEnum.Slot,
		displayKey: 'Label_General_Slots',
		pathname: paths.slots.root,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.SLOTS,
		subMenu: [
			{
				...PRODUCTS.PragmaticPlaySlot,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PragmaticPlaySlot.tpId,
				},
			},
			{
				...PRODUCTS.Spadegaming,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Spadegaming.tpId,
				},
			},
			{
				...PRODUCTS.AdvantPlay,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AdvantPlay.tpId,
				},
			},
			{
				...PRODUCTS.AmigoGaming,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AmigoGaming.tpId,
				},
			},
			{
				...PRODUCTS.ES,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.ES.tpId,
				},
			},
			{
				...PRODUCTS.Nextspin,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Nextspin.tpId,
				},
			},
			{
				...PRODUCTS.PGSoft,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PGSoft.tpId,
				},
			},
			{
				...PRODUCTS.BNG,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.BNG.tpId,
				},
			},
			{
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.FaChai.tpId,
				},
				...PRODUCTS.FaChai,
			},
			{
				...PRODUCTS.MicrogamingSlot,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.MicrogamingSlot.tpId,
				},
			},
			{
				...PRODUCTS.JILI,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.JILI.tpId,
				},
			},
			{
				...PRODUCTS.SPRIBE,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.SPRIBE.tpId,
				},
			},
			{
				...PRODUCTS.Joker,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Joker.tpId,
				},
			},
			{
				...PRODUCTS.DragonGaming,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.DragonGaming.tpId,
				},
			},
			{
				...PRODUCTS.Pegasus,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Pegasus.tpId,
				},
			},
			{
				...PRODUCTS.NoLimitCity,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: {
					hasLobby: true,
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
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.RedTiger.tpId,
				},
			},
			{
				...PRODUCTS.NetEnt,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.NetEnt.tpId,
				},
			},
			{
				...PRODUCTS.CQ9,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.CQ9.tpId,
				},
			},
			{
				...PRODUCTS.PlaynGO,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.PlaynGO.tpId,
				},
			},
			{
				...PRODUCTS.GamePlay,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.GamePlay.tpId,
				},
			},
			{
				...PRODUCTS.YGGDrassil,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.YGGDrassil.tpId,
				},
			},
			{
				...PRODUCTS.AMBPoker,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AMBPoker.tpId,
				},
			},
			{
				...PRODUCTS.Habanero,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Habanero.tpId,
				},
			},
			{
				...PRODUCTS.SimplePlay,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.SimplePlay.tpId,
				},
			},
			{
				...PRODUCTS.SkywindSlot,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.SkywindSlot.tpId,
				},
			},
			{
				...PRODUCTS.NewPlayTechSlot,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.NewPlayTechSlot.tpId,
				},
			},
			{
				...PRODUCTS.AskmeSlot,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.AskmeSlot.tpId,
				},
			},
			{
				...PRODUCTS.UuSlots,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.UuSlots.tpId,
				},
			},
			{
				...PRODUCTS.Live22,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.Live22.tpId,
				},
			},
			{
				...PRODUCTS.FastSpin,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.Link,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
				pathname: paths.slots.root,
				query: {
					tpId: PRODUCTS.FastSpin.tpId,
				},
			},
		],
	},
	{
		display: 'all',
		h5: {
			icon: 'games',
		},
		desktop: { subMenuClassName: 'tableList' },
		category: MenuKeyEnum.Game,
		displayKey: 'Label_General_Games',
		pathname: paths.game.root,
		subMenuAllowCurrenciesWithAuth: false,
		lobbyCategoryId: LobbyCategoryEnum.Game,
		subMenu: [
			{
				...PRODUCTS.MPPoker,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AMBPoker,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Vgaming,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.KingMaker,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.V8Poker,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Aviator,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Mines,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Goal,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Dice,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Spaceman,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Crash,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.GoRush,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.MaxGame,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS['93Connect'],
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.SabaPlay,
				pathname: paths.game.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
	},
	{
		display: 'all',
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
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.FishingWar,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.ZombieParty,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.AlienHunter,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Paradise,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.FishHaiba,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.HappyFish5,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.MonsterAwaken,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.OneshotFishing,
				pathname: paths.fishing.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},
	{
		display: 'all',
		h5: {
			icon: 'four',
		},
		desktop: {
			subMenuClassName: 'fourList',
		},
		displayKey: 'Label_General_FourD',
		pathname: paths.fourD.root,
		category: MenuKeyEnum.FourD,
		lobbyCategoryId: LobbyCategoryEnum.FourD,
		subMenu: [
			{
				...PRODUCTS.GrandDragon,
				pathname: paths.fourD.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.UseGoToGame,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.UseGoToGame,
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},
	{
		display: 'all',
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
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.ThaiLottery,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Fast3,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.TCG,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Keno,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.Lottery,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
			{
				...PRODUCTS.NumberGame,
				pathname: paths.sports.root,
				query: { provider: 'NumberGame' },
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: { hasLobby: true, menuActionType: MenuActionEnum.Link },
			},
			{
				...PRODUCTS.TableGame,
				pathname: paths.lottery.root,
				h5: {
					hasLobby: false,
					menuActionType: MenuActionEnum.EnterPage,
				},
				desktop: {
					hasLobby: true,
					menuActionType: MenuActionEnum.EnterPage,
				},
			},
		],
		subMenuAllowCurrenciesWithAuth: false,
	},
]
