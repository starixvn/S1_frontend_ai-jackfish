// 由於使用環境變數的關係，導致在server side & client side資料取得不同步時，會導致url前綴變成undefined

// NEXT_PUBLIC_IMAGE_HOST (https://img.0814media.net)
// 參數src範例：”/img/jackfish-logo.png“
export const imageUrl = (src: string) => {
	const imgUrl = !process.env.NEXT_PUBLIC_IMAGE_HOST
		? src
		: `${process.env.NEXT_PUBLIC_IMAGE_HOST}${src}`
	return imgUrl
}

// Nova的圖片吃的env大多是NEXT_PUBLIC_BANNER_HOST（https://banner.0814media.net）
export const bannerUrl = (src: string) => {
	const imgUrl = !process.env.NEXT_PUBLIC_BANNER_HOST
		? src
		: `${process.env.NEXT_PUBLIC_BANNER_HOST}${src}`
	return imgUrl
}
