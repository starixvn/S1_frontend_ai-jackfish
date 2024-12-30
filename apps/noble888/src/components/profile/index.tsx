import { MainTabMenu } from '@noble888/src/components/common'
import { MAIN_TAGS } from '@noble888/src/data/static/index'
import { Address } from './Address'
import { AddressEdit } from './AddressEdit'
import { Info } from './Info'
import { InfoEdit } from './InfoEdit'
import { Verification } from './Verification'

const Profile = () => {
	return (
		<div>
			{/* Profile & Financial-log 頁切換 */}
			<div className='block lg:hidden '>
				<MainTabMenu tagsData={MAIN_TAGS.profile} />
			</div>

			<div className='grid gap-5 px-5 lg:grid-cols-5  lg:bg-gray-900'>
				{/* 驗證資訊 */}
				<Verification />
				<hr className='block lg:hidden ' />
				{/* 個人資訊 */}
				<Info />
				<hr className='block lg:hidden ' />
				{/* 個人編輯 */}
				<InfoEdit />
				<hr className='block lg:hidden ' />
				{/* 地址編輯 */}
				<AddressEdit />
				<hr className='block lg:hidden ' />
				{/* 地址資訊 */}
				<Address />
			</div>
		</div>
	)
}

export default Profile
