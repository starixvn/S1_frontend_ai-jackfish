'use client'

import { MENU_DATA } from '@noble888/src/data/static/menu'
import { useClientTranslation } from '@noble888/src/i18n/client'
import { cn, useGetPathname, useMenuOpen } from 'JF-core'
import useMenu from 'libs/core/src/lib/hooks/useMenu'

export default function LobbyContent({ category }: { category: string }) {
  const { menuList } = useMenu({ homeMenuData: MENU_DATA })
  // i18n
  const { locale } = useGetPathname()
  const { t } = useClientTranslation(locale)
  const { onMenuOpen } = useMenuOpen({})

  const subMenu = menuList.find(item => item.category === category)?.subMenu

  const handleMenuOpen = (item: any) => {
    onMenuOpen(item, {
      loginCallback: () => {
        console.log('尚未登入 => 開啟登入彈窗 (示例)')
      },
    })
  }


  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-5'>
      {subMenu?.map(item => {
        const { tpGameIdNo, isTpMaintain, productName = '', pcLobbyPicUrl } = item
        let imgUrl = ''
        if (pcLobbyPicUrl) {
          try {
            imgUrl = JSON.parse(pcLobbyPicUrl)[0]
          } catch (e) {
            console.error('Failed to parse pcLobbyPicUrl', e)
          }
        }
        return (
          <div key={`subMenu-${tpGameIdNo}`}>
            <div
              className='group relative cursor-pointer object-left-top'
              onClick={() => {
                if (!isTpMaintain) {
                  handleMenuOpen(item)
                }
              }}
            >
              <img
                src={imgUrl}
                alt=''
                className={cn('w-full rounded-xl object-cover', {
                  'transition ease-in-out': !isTpMaintain,
                })}
              />
              {isTpMaintain ? (
                <div className='absolute inset-0 grid w-full cursor-not-allowed place-items-center rounded-xl backdrop-grayscale bg-gradient-to-t from-gray-1000 to-gray-900/10 font-bold'>
                    {t('Label_General_UnderMaintenance')}
                </div>
              ) : (
                <div
                  className={cn(
                    'absolute inset-0 grid place-items-center rounded-xl bg-gradient-to-t from-gray-900 to-gray-900/10 opacity-0 transition ease-in-out group-hover:opacity-100'
                  )}
                >
<button
  className='px-4 py-2 text-gray-100 border-2 border-white rounded-full bg-transparent transition-all duration-300 ease-in-out'
>
  Play Now
</button>
                </div>
              )}
            </div>
            <p className='mt-2 text-center text-sm font-medium text-gray-100'>
              {t(productName)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
