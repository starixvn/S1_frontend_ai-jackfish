'use client'

import { imageUrl } from 'JF-core'
import { ISeoData } from 'libs/operations/src/lib/seo/type'
import { includes } from 'lodash-es'
import Script from 'next/script'
import { useEffect, useState } from 'react'

interface LicenseProps {
	seoData: ISeoData
	defaultScript: string
}

const License = ({ seoData, defaultScript }: LicenseProps) => {
	const [currentDomain, setCurrentDomain] = useState('')

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setCurrentDomain(window.location.href)
		}
	}, [])
	const showLicenseLogo = true
	// TODO:
	// const showLicenseLogo = seoData?.activeDomain ?? false
	const tobiqueSealId = seoData?.script ?? defaultScript

	return (
		<>
			<div className='flex flex-col justify-center pb-4 lg:justify-start lg:pb-0'>
				<h3 className='mx-auto font-bold lg:mx-0 lg:mb-2'>Gaming License</h3>
				{/* Add gaming license icons here */}
				{showLicenseLogo && (
					<div className='flex items-center justify-center gap-x-2 lg:justify-start'>
						{/* PM hotfix 需求，此 license 需排除 kr site */}
						{typeof window !== 'undefined' &&
							!includes(currentDomain, 'nova88kr.com') && (
								<div
									className='w-12 lg:w-16'
									id={`dlag-${tobiqueSealId}`}
									data-dlag-seal-id={tobiqueSealId}
									data-dlag-image-size='128'
									data-dlag-image-type='basic-small'
								/>
							)}

						<a
							href='https://www.begambleaware.org/'
							target='_blank'
							rel='noreferrer'
						>
							<img
								src={imageUrl('/desktop/img/aware.png')}
								alt=''
								style={{ width: '115px', height: '23px' }}
							/>
						</a>
					</div>
				)}
			</div>
			<Script
				src={`https://${tobiqueSealId}.seals.dlagglobal.com/dlag-seal.js`}
				strategy='lazyOnload'
			/>
		</>
	)
}

export default License
