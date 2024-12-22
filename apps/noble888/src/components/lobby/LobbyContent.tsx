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
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'>
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
                  'transition ease-in-out group-hover:scale-105': !isTpMaintain,
                })}
              />
              {isTpMaintain ? (
                <div className='absolute inset-0 grid w-full cursor-not-allowed place-items-center rounded-xl backdrop-grayscale'>
                  <div className='w-full rounded-md bg-neutral-300 py-1 text-center text-neutral-500'>
                    {t('Label_General_UnderMaintenance')}
                  </div>
                </div>
              ) : (
                <div
                  className={cn(
                    'absolute inset-0 grid place-items-center rounded-xl bg-gradient-to-t from-neutral-500 to-neutral-500/10 opacity-0 transition ease-in-out group-hover:scale-105 group-hover:hover:opacity-100'
                  )}
                >
                  <div className='truncate text-center text-sm font-medium leading-8 text-neutral-100'>
                    {t(productName)}
                  </div>
                </div>
              )}
            </div>
            <p className='mt-2 text-center text-sm font-medium text-neutral-700'>
              {t(productName)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
