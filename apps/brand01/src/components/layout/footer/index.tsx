import { FOOTER_PAYMENT_ICONS } from '@brand01/src/data/layout/footer'
import { imageUrl } from 'JF-core'
import FooterNav from './FooterNav'
import FooterSign from './FooterSign'

const Footer = () => {
	return (
		<footer className='absolute bottom-14 mx-auto p-4 text-center lg:relative lg:bottom-0 lg:p-0'>
			<div className='lg:bg-tertiary-500 hidden pt-8 text-neutral-100 lg:block lg:pb-10'>
				<ul className='mb-6 flex justify-center gap-4'>
					{FOOTER_PAYMENT_ICONS.map(item => {
						const { key, icon } = item
						return (
							<li key={key}>
								<img src={imageUrl(icon)} alt={key} />
							</li>
						)
					})}
				</ul>

				{/* 隱私權政策側標語和連結 */}
				<FooterSign />
			</div>

			{/* 手機版才會有的底部Nav */}
			<FooterNav />
		</footer>
	)
}

export default Footer
