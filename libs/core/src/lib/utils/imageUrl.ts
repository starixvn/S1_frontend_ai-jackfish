// 由於使用環境變數的關係，導致在server side & client side資料取得不同步時，會導致url前綴變成undefiend
// 參數src範例：”/img/jackfish-logo.png“
export const imageUrl = (src: string) => {
	const imgUrl =
		process.env.NEXT_PUBLIC_SITE_ID === '1'
			? !process.env.NEXT_PUBLIC_BANNER_HOST
				? src
				: `${process.env.NEXT_PUBLIC_BANNER_HOST}${src}`
			: !process.env.NEXT_PUBLIC_IMAGE_HOST
				? src
				: `${process.env.NEXT_PUBLIC_IMAGE_HOST}${src}`
	return imgUrl
}
