import React from 'react'
import FooterNav from './FooterNav'
import FooterSign from './FooterSign'
import { imageUrl } from 'JF-core'
import { FOOTER_PAYMENT_ICONS } from '@brand01/src/data/layout/footer'

const Footer = () => {
	return (
		<footer className='mx-auto p-4 text-center max-lg:absolute max-lg:bottom-14'>
			<div className='pt-8 text-neutral-100 max-lg:hidden lg:pb-10'>
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
