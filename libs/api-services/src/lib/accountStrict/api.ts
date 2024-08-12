import { fetcher } from '../baseApi'
import { accountStrictApiUrl } from './url'

export const uploadCustPhoto = async (file: File) => {
	const formData = new FormData()
	formData.append('PhotoId', file)
	await fetcher<null, FormData>(accountStrictApiUrl.uploadCustPhoto, formData)
}
