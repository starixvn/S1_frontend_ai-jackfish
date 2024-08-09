import { fetcher } from '../baseApi'
import { ISetChangePasswordArgs } from './type'
import { accountApiUrl } from './url'

export const changePassword = async (data: ISetChangePasswordArgs) => {
	return await fetcher(accountApiUrl.changePassword, data)
}
