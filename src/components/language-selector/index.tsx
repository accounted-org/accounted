'use client'

import { Locales } from '@/src/constants'
import { usePathname, useRouter } from '@/src/lib/i18n'
import { useTranslations } from 'next-intl'
import { useCallback } from 'react'

export function LanguageSelector() {
  const t = useTranslations('language_selector')
  const pathname = usePathname()
  const router = useRouter()

  const handleChangeLanguage = useCallback(
    (locale: string) => {
      router.replace(pathname, { locale })
    },
    [pathname, router]
  )

  return (
    <div className="space-y-5">
      <span>{t('title')}</span>
      <div className="flex space-x-2">
        <button
          className="cursor-pointer"
          onClick={() => handleChangeLanguage(Locales.PT_BR)}
        >
          {t('pt')}
        </button>
        <button
          className="cursor-pointer"
          onClick={() => handleChangeLanguage(Locales.EN_US)}
        >
          {t('en')}
        </button>
      </div>
    </div>
  )
}
