'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { useGetPathname } from 'JF-core'
import { ChangeEvent, DragEvent, useState } from 'react'

/**
 * @returns 回傳圖片檔案
 */
const useImageFile = () => {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const [imageFile, setImageFile] = useState<File | null>(null)
	const [errorMessage, setErrorMessage] = useState('')

	const onImageFileChange = (
		event: ChangeEvent<HTMLInputElement> | DragEvent<HTMLLabelElement>,
	) => {
		const file =
			(event as DragEvent<HTMLLabelElement>).dataTransfer?.files?.length > 0
				? (event as DragEvent<HTMLLabelElement>).dataTransfer?.files[0]
				: (event as ChangeEvent<HTMLInputElement>).target?.files?.[0]
		if (file && file.type.startsWith('image/')) {
			setImageFile(file)
			setErrorMessage('')
		} else {
			setErrorMessage(
				t('Label_History_File_format_error_please_try_again') as string,
			)
			setImageFile(null)
		}
	}

	return { errorMessage, imageFile, setImageFile, onImageFileChange }
}

export { useImageFile }
