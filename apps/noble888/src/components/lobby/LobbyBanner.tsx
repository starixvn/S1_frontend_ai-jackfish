interface ILobbyBannerArgs {
	bannerImgSrc: string
}

const LobbyBanner = ({bannerImgSrc}:ILobbyBannerArgs) => {
	return (
		<div className='lobby-banner'>
			<div className='swiper-container'>
				<div className='swiper-wrapper'>
					<div className='swiper-slide'>
						<img alt='banner-img' src={bannerImgSrc} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default LobbyBanner
