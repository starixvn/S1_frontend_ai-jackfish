import { find } from 'lodash-es'
import { useWithdrawalBasicQueries } from '../queries'
import { IWithdrawalTypeEnum } from '../type'

// 用於轉換可顯示的錢包資訊，因手機版分散於三個不同頁面，故獨立寫成 Hooks 方便管理
const useWalletAllowed = () => {
	const { blockSettingQuery } = useWithdrawalBasicQueries()
	const { data: { data: withdrawalBlockSetting = [] } = {} } = blockSettingQuery
	/* <-- 判斷能否顯示該 wallet --> */
	const bankCardAllowed = !!find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.BankCard,
	)?.status

	const eWalletCardAllowed = !!find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.EWallet,
	)?.status

	const cryptoCardAllowed = !!find(
		withdrawalBlockSetting,
		({ type }) => type === IWithdrawalTypeEnum.Crypto,
	)?.status

	const cardAllowed = {
		bankCardAllowed,
		eWalletCardAllowed,
		cryptoCardAllowed,
	}
	return { cardAllowed }
}

export { useWalletAllowed }
