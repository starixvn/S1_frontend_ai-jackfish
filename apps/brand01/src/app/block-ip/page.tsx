'use client'

import { useClientTranslation } from '@brand01/src/i18n/client'
import { useGetIpCountry } from 'JF-api/site/client'
import { paths } from 'JF-constants'
import { useGetPathname } from 'JF-core'
import { redirect } from 'next/navigation'

// 這頁不用 i18n 放在外層感覺比較適合
export default function BlockIPPage() {
	const { locale } = useGetPathname()
	const { t } = useClientTranslation(locale)
	const { ipCountryData, isLoading } = useGetIpCountry()
	const { isAccess } = ipCountryData || {}

	// fetching 完成且可進入導回首頁
	if (!isLoading && isAccess) {
		redirect(paths.home.root)
	}

	// 底下是各國語言，不用翻譯，加上翻譯會變成預設英文
	return (
		<main className='bg-tertiary-500 flex min-h-screen items-center justify-center'>
			<div className='grid max-w-screen-2xl grid-cols-1 items-center gap-1 p-4 sm:gap-2 sm:p-5 md:grid-cols-5 md:gap-4 md:p-8'>
				{/* State Group */}
				<div className='flex w-full flex-1 flex-col items-center gap-4 text-center md:col-span-3'>
					<div className="h-[20rem] w-full bg-[url('/img/errorpage/lock.png')] bg-contain bg-center bg-no-repeat sm:h-[25rem] md:h-[30rem] lg:h-[35rem]"></div>
					<div className='flex flex-col items-center'>
						<h1 className='-mt-[6rem] mb-4 text-5xl font-black text-neutral-100 sm:-mt-[8rem] md:-mt-[12rem] lg:text-6xl xl:text-7xl'>
							{t('Label_Access')}
							<br />
							{t('Label_Restricted')}
						</h1>
					</div>
				</div>

				{/* Message Group */}
				<div className='w-6/7 flex flex-none flex-col gap-4 md:col-span-2'>
					{/* Message EN */}
					<div className='text-tertiary-500 flex items-start gap-4 rounded-lg bg-neutral-100 px-4 py-6 sm:p-6'>
						<div className="h-12 w-12 rounded-full bg-[url('/img/errorpage/en.jpg')] bg-cover bg-center bg-no-repeat"></div>
						<div className='flex-1'>
							<div className='text-xl font-extrabold'>
								{t('Label_Static_Maintenance_Dear_Valued_Customers')}:
							</div>
							<p className='mt-2 text-base'>
								The page that you are trying to access has been restricted in
								this location. We apologize for the inconvenience. Please
								contact customer support for more details. Thank you for your
								utmost understanding.
							</p>
						</div>
					</div>

					{/* Message TH */}
					<div className='text-tertiary-500 flex items-start gap-4 rounded-lg bg-neutral-100 px-4 py-6 sm:p-6'>
						<div className="h-12 w-12 rounded-full bg-[url('/img/errorpage/th.jpg')] bg-cover bg-center bg-no-repeat"></div>
						<div className='flex-1'>
							<div className='text-xl font-extrabold'>
								เรียน สมาชิกผู้มีอุปการคุณทุกท่าน:
							</div>
							<p className='mt-2 text-base'>
								หน้าที่คุณเชื่อมต่อได้ถูกจำกัดไว้ ขออภัยในความไม่สะดวก
								หากมีข้อสงสัย กรุณาติดต่อฝ่ายบริการลูกค้า แชทสด
							</p>
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}
