import { MainTabMenu } from '@noble888/src/components/common'
import { MAIN_TAGS } from '@noble888/src/data/static/index'
import { AddressEdit } from './AddressEdit'
import { Info } from './Info'
import { InfoEdit } from './InfoEdit'
import { Verification } from './Verification'

const Profile = () => {
	return (
		<div className='block lg:hidden '>
			{/* Profile & Financial-log 頁切換 */}
			<MainTabMenu tagsData={MAIN_TAGS.profile} />
			<div className='px-5'>
				<Verification />
				<hr />
				<Info />
				<hr />
				<InfoEdit />
				<hr />
				<AddressEdit />
			</div>
		</div>
	)
}

export default Profile
