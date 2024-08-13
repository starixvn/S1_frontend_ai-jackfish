'use client'
import { LocaleLink } from 'JF-core'

export default function NotFound() {
	return (
		<div className='text-white'>
			<h2>Not Found</h2>
			<p>Could not find requested resource</p>
			<LocaleLink href='/'>Return Home</LocaleLink>
		</div>
	)
}
