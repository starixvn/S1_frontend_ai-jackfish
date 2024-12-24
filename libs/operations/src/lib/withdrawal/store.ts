import { create } from 'zustand'
import { IWithdrawalStoreAction, IWithdrawalStoreState } from './type'

// store 用來記錄 UI 層交互資料 or UI 層 global data
const useWithdrawalStore = create<
	IWithdrawalStoreState & IWithdrawalStoreAction
>(set => ({
	selectedBankItem: undefined,
	setSelectedBankItem: item => {
		set({ selectedBankItem: item })
	},
}))

export { useWithdrawalStore }
