import { getHotEventList } from 'JF-api/hotEvent/server'
import { getPromotionListOnServer } from 'JF-api/promotion/server'
import Announcement from './Announcement'
import Banner from './Banner'
import PromotionSwiper from './PromotionSwiper'
import WelcomeInfo from './WelcomeInfo'
import HotMatch from './hotMatch'

const Home: React.FC = async () => {
	const [promotionList, hotEventList] = await Promise.all([
		getPromotionListOnServer(),
		getHotEventList(),
	])
	return (
		<>
			<Announcement />
			<Banner />
			<WelcomeInfo />
			<PromotionSwiper promotionList={promotionList} />
			<HotMatch hotEventList={hotEventList} />
		</>
	)
}

export default Home
