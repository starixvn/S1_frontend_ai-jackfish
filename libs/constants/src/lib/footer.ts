import { CurrenciesEnum, IFooterData, PRODUCTS } from 'JF-constants'
import { GET_AFFILIATE_LINK } from './affiliate'

export const FOOTER_DATA = ({
	langId,
	currencyId,
}: {
	langId: string
	currencyId: number
}): IFooterData => {
	// * 根據幣別決定路徑，每間品牌不同
	return {
		// * platformList 須經過 useMenu(已包含 排序、tpIds、allowCurrencies) 過濾
		platformList: [
			{
				...PRODUCTS['Soccer'],
				imgName: 'saba',
			},
			{
				...PRODUCTS['Allbet'],
				imgName: 'all',
			},
			{
				...PRODUCTS['DreamGaming'],
				imgName: 'dg',
			},
			{
				...PRODUCTS['AsiaGaming'],
				imgName: 'ag',
			},
			{
				...PRODUCTS['AESexy'],
				imgName: 'sexy',
			},
			{
				...PRODUCTS['SAGaming'],
				imgName: 'sa',
			},
			{
				...PRODUCTS['PragmaticPlayCasino'],
				imgName: 'pp',
			},
			{
				...PRODUCTS['BigGaming'],
				imgName: 'bg',
			},
			{
				// ??
				...PRODUCTS['YeebetCasino'],
				imgName: 'yb',
			},
			{
				...PRODUCTS['MicrogamingSlot'],
				imgName: 'mic',
			},
			{
				...PRODUCTS['NewPlayTechSlot'],
				imgName: 'pt',
			},
			{
				...PRODUCTS['YGGDrassil'],
				imgName: 'ygg',
			},
			{
				...PRODUCTS['Joker'],
				imgName: 'joker',
			},
			{
				...PRODUCTS['Spadegaming'],
				imgName: 'spad',
			},
			{
				...PRODUCTS['JILI'],
				imgName: 'jili',
			},
			{
				...PRODUCTS['TCGaming'],
				imgName: 'tc',
			},
			{
				...PRODUCTS['RedTiger'],
				imgName: 'red',
			},
			{
				...PRODUCTS['NetEnt'],
				imgName: 'net',
			},
			{
				...PRODUCTS['AdvantPlay'],
				imgName: 'ap',
			},
			{
				...PRODUCTS['EvolutionGaming'],
				imgName: 'evo',
			},
			{
				...PRODUCTS['Habanero'],
				imgName: 'ha',
			},
			{
				...PRODUCTS['SimplePlay'],
				imgName: 'simple',
			},
			{
				...PRODUCTS['SkywindSlot'],
				imgName: 'sky',
			},
			{
				...PRODUCTS['Nextspin'],
				imgName: 'next',
			},
			{
				...PRODUCTS['IMESports'],
				imgName: 'im-esports',
			},
			{
				...PRODUCTS['SPRIBE'],
				imgName: 'spribe',
			},
			{
				...PRODUCTS['PlaynGO'],
				imgName: 'png',
			},
			{
				...PRODUCTS['ES'],
				imgName: 'es',
			},
			{
				...PRODUCTS['WE'],
				imgName: 'we',
			},
			{
				...PRODUCTS['AskmeSlot'],
				imgName: 'askme',
			},
			{
				...PRODUCTS['FaChai'],
				imgName: 'fachai',
			},
			{
				...PRODUCTS['BNG'],
				imgName: 'bng',
			},
			{
				...PRODUCTS['Pegasus'],
				imgName: 'pegasus',
			},
			{
				...PRODUCTS['V8Poker'],
				imgName: 'v8',
			},
			{
				...PRODUCTS['TFGaming'],
				imgName: 'tfg',
			},
			{
				...PRODUCTS['NoLimitCity'],
				imgName: 'nlc',
			},
			{
				...PRODUCTS['AmigoGaming'],
				imgName: 'amigo',
			},
			{
				...PRODUCTS['MPPoker'],
				imgName: 'mp',
			},
			{
				...PRODUCTS['GrandDragon'],
				imgName: 'haolong',
			},
			{
				...PRODUCTS['WonCasino'],
				imgName: 'woncasino',
			},
			{
				...PRODUCTS['DragonGaming'],
				imgName: 'dragongaming',
			},
		],
		quickLinks: [
			// =====  以下 desktop footer 顯示使用 ( 照 footer 順序排列 )  =====
			{
				displayKey: 'Label_AboutUs',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AboutUs.html`,
			},
			{
				displayKey: 'Label_General_Terms',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/Terms.html`,
			},
			{
				displayKey: 'Label_Responsible_Gaming',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ResposibleGaming.html`,
			},
			{
				displayKey: 'Label_Complaints_And_Arbitration',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ComplaintsArbitration.html`,
			},
			{
				displayKey: 'Label_TermsConditions',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/TermsConditions.html`,
			},
			{
				displayKey: 'Label_AmlKycConditions',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/AmlKycPolicy.html`,
			},
			{
				displayKey: 'Label_PaymentPolicys',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/PaymentPolicy.html`,
			},
			{
				displayKey: 'Label_General_PrivacyPolicy',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/PrivacyPolicy.html`,
			},

			// =====  以下 HomeProvider 使用  =====
			{
				displayKey: 'Label_Affiliate_Program',
				href: GET_AFFILIATE_LINK({ currencyId, langId }),
			},
			{
				displayKey: 'Label_ContactUs',
				href: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/Static/${langId}/ContactUs.html`,
			},
			{
				displayKey: 'Label_General_Milestone',
				href: `/${langId}/milestones`,
			},
		],
		promotionTextList: [
			{
				title: 'Label_Soccer_Betting_Live_Betting',
				content: 'Label_Soccer_Betting_Live_Betting_desc',
			},
			{
				title: 'Label_Sports_Betting_In_Play_Betting',
				content: 'Label_Sports_Betting_In_Play_Betting_desc',
			},
			{
				title: 'Label_Online_Casino_Live_Casino',
				content: 'Label_Online_Casino_Live_Casino_desc',
			},
			{
				title: 'Label_Keno_Lottery_Betting',
				content: 'Label_Keno_Lottery_Betting_desc',
			},
			{
				title: 'Label_Virtual_Sports',
				content: 'Label_Virtual_Sports_desc',
			},
			{
				title: 'Label_Fishing_in_footer',
				content: 'Label_Fishing_desc',
			},
			{
				title: 'Label_ESports',
				content: 'Label_ESport_desc',
			},
			{
				title: 'Label_Mobile_Betting',
				content: 'Label_Mobile_Betting_desc',
			},
			{
				title: 'Label_Open_An_Account',
				content: 'Label_Open_An_Account_desc',
			},
			{
				title: 'Label_Payment_Options',
				content: 'Label_Payment_Options_desc',
			},
			{
				title: 'Label_Affiliates_in_footer',
				content: 'Label_Affiliates_desc',
			},
			{
				title: 'Label_Responsible_Gaming',
				content: 'Label_Responsible_Gaming_desc',
			},
			{
				title: 'Label_Security',
				content: 'Label_Security_desc',
			},
		],
		licenseData: {
			defaultScript: '0ab77fde-ce97-42f7-9906-bdd3ca1162dd',
			defaultXCMScript: '226e4de2-30aa-4077-951b-d440012994f3',
		},
		suggestedBrowser: [
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/chrome.png`,
				alt: 'chrome',
				width: 30,
				height: 30,
			},
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/firefox.png`,
				alt: 'firefox',
				width: 30,
				height: 30,
			},
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/edge.png`,
				alt: 'edge',
				width: 30,
				height: 30,
			},
			{
				imageSrc: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/4.0/safari.png`,
				alt: 'safari',
				width: 30,
				height: 30,
			},
		],
		paymentMethodsByCurrencyId: {
			[CurrenciesEnum.MYR]: [
				{
					name: 'Maybank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/maybank.jpg`,
				},
				{
					name: 'OCBC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ocbc.jpg`,
				},

				{
					name: 'tngqr',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ambank.jpg`,
				},
				{
					name: 'CIMB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/cimb.jpg`,
				},
				{
					name: 'RHB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/rhb.jpg`,
				},
				{
					name: 'AFFIN',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/affin.jpg`,
				},
				{
					name: 'HLB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/hlb.jpg`,
				},
				{
					name: 'PBB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/pbb.jpg`,
				},
				{
					name: 'Duitnow',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/duitnow.jpg`,
				},
				{
					name: 'TnG',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/tng.jpg`,
				},
				{
					name: 'Boost',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/boost.jpg`,
				},
				{
					name: 'Grabpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/grabpay.jpg`,
				},
				{
					name: 'Shopeepay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/shopeepay.jpg`,
				},

				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'BNB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bnb.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
			],
			[CurrenciesEnum.THB]: [
				{
					name: 'Kasikorn Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/kasikornbank.jpg`,
				},
				{
					name: 'Krung Thai Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ktb.jpg`,
				},
				{
					name: 'Siam Commercial Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/scb.jpg`,
				},
				{
					name: 'Bangkok Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bangkokbank.jpg`,
				},
				{
					name: 'Bank of Ayudhya',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ayudhya.jpg`,
				},
				{
					name: 'Promtpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/promptpay.jpg`,
				},
				{
					name: 'TrueMoney',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/truemoney.jpg`,
				},

				{
					name: 'BigPayz',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bigpayz.jpg`,
				},
				{
					name: 'RapidPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/rapidpay.jpg`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.jpg`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.jpg`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
			],
			[CurrenciesEnum.IDR]: [
				{
					name: 'BCA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bca.jpg`,
				},
				{
					name: 'MANDIRI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/mandiri.jpg`,
				},
				{
					name: 'BRI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bri.jpg`,
				},
				{
					name: 'PERMATA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/permata.jpg`,
				},
				{
					name: 'CIMB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/cimb.jpg`,
				},
				{
					name: 'BNI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bni.jpg`,
				},
				{
					name: 'QRIS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/qris.jpg`,
				},
				{
					name: 'GOPAY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/gopay.jpg`,
				},
				{
					name: 'OVO',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ovo.jpg`,
				},
				{
					name: 'DANA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dana.jpg`,
				},
				{
					name: 'SAKUKU',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/sakuku.jpg`,
				},
				{
					name: 'LINKAJA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/linkaja.jpg`,
				},
				{
					name: 'SHOPEEPAY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/shopeepay.jpg`,
				},
				{
					name: 'DOKU',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doku.jpg`,
				},

				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'BNB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bnb.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
			],
			[CurrenciesEnum.INR]: [
				{
					name: 'Federeal Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/federealbank.jpg`,
				},
				{
					name: 'ICICI Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/icici.jpg`,
				},
				{
					name: 'IDFC Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/idfc.jpg`,
				},
				{
					name: 'Indian Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/indian.jpg`,
				},
				{
					name: 'IndusInd Bank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/indusind.jpg`,
				},
				{
					name: 'Kotak Mahindra',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/kotak.jpg`,
				},
				{
					name: 'UPI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/upi.jpg`,
				},

				{
					name: 'Tenpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/tenpay.jpg`,
				},
				{
					name: 'VaderPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vaderpay.jpg`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.jpg`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.jpg`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
			],
			[CurrenciesEnum.BDT]: [
				{
					name: 'Bkash',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bkash.jpg`,
				},
				{
					name: 'Rocket',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/rocket.jpg`,
				},
				{
					name: 'Upay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/upay.jpg`,
				},
				{
					name: 'Nagad',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/nagad.jpg`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.jpg`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.jpg`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
			],
			[CurrenciesEnum.KHM]: [
				{
					name: 'ABA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/aba.jpg`,
				},
				{
					name: 'ACLEDA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/acleda.jpg`,
				},
				{
					name: 'WING',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/wing.jpg`,
				},
				{
					name: 'TRUEMONEY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/truemoney.jpg`,
				},
				{
					name: 'PIPAY',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/pipay.jpg`,
				},
				// 2024.10.30 需求拿掉
				// {
				// 	name: 'ACLEDA_Bank',
				// 	img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/acledabank.jpg`,
				// },
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.jpg`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.jpg`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
			],
			[CurrenciesEnum.VND]: [
				{
					name: 'ACB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/acb.jpg`,
				},
				{
					name: 'DAB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dab.jpg`,
				},
				{
					name: 'Eximbank',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/exim.jpg`,
				},
				{
					name: 'VTB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vtb.jpg`,
				},
				{
					name: 'BIDV',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/bidv.jpg`,
				},
				{
					name: 'MB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/mb.jpg`,
				},
				{
					name: 'TCB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/tcb.jpg`,
				},
				{
					name: 'VCB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vcb.jpg`,
				},
				{
					name: 'VIB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/vib.jpg`,
				},
				{
					name: 'HDB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/hdb.jpg`,
				},
				{
					name: 'MSB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/msb.jpg`,
				},
				{
					name: 'SACOM',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/sacom.jpg`,
				},
				{
					name: 'MOMO',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/momo.jpg`,
				},
				{
					name: 'ZALO',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/zalo.jpg`,
				},

				{
					name: 'YuiPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/yuipay.jpg`,
				},
				{
					name: 'HonorPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/honorpay.jpg`,
				},
				{
					name: 'Wpay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/wpay.jpg`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.jpg`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.jpg`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
			],
			[CurrenciesEnum.CNY]: [
				{
					name: '广西省农村信用社',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/kwangsi.jpg`,
				},

				{
					name: 'ChangChenPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/changchenpay.jpg`,
				},
				{
					name: 'TenglongPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/tenglongpay.jpg`,
				},
				{
					name: 'Alipay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/alipay.jpg`,
				},
				{
					name: 'QQPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/qqpay.jpg`,
				},
				{
					name: 'UnionPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/unionpay.jpg`,
				},
				{
					name: 'WechatPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/wechatpay.jpg`,
				},
				{
					name: 'DouDouPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doudoupay.jpg`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.jpg`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.jpg`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
			],
			[CurrenciesEnum.USD]: [
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'BUSD',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/busd.jpg`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.jpg`,
				},
				{
					name: 'SHIB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/shib.jpg`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
			],
			[CurrenciesEnum.KRW]: [
				{
					name: 'HonorPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/honorpay.jpg`,
				},
				{
					name: 'SojuPay',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/sojupay.jpg`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.jpg`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.jpg`,
				},
				{
					name: 'ADA',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/ada.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
			],
			[CurrenciesEnum.BRL]: [
				{
					name: 'PIX',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/pix.jpg`,
				},
				{
					name: 'BTC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/btc.jpg`,
				},
				{
					name: 'ETH',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eth.jpg`,
				},
				{
					name: 'USDT',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdt.jpg`,
				},
				{
					name: 'USDC',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/usdc.jpg`,
				},
				{
					name: 'EOS',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/eos.jpg`,
				},
				{
					name: 'DAI',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/dai.jpg`,
				},
				{
					name: 'DOGE',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/doge.jpg`,
				},
				{
					name: 'SHIB',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/shib.jpg`,
				},
				{
					name: 'BUSD',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/busd.jpg`,
				},
				{
					name: 'XRP',
					img: `${process.env['NEXT_PUBLIC_BANNER_HOST']}/desktop/img/footer/square/xrp.jpg`,
				},
			],
		},
	}
}
