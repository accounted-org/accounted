'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import {
  Menu,
  MenuGroup,
  MenuGroupLabel,
  MenuItem,
  MenuPopup,
  MenuTrigger,
} from '@/components/ui/menu'
import { useCallback } from 'react'
import { usePathname, useRouter } from '@/lib'
import { Locales } from '@/constants'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import { ChevronDown } from 'lucide-react'
import {TypingAnimation} from "@/components/ui/typing-animation";

export function Header() {
  const t = useTranslations('home.header')
  const l = useTranslations('language_selector')
  const pathname = usePathname()
  const router = useRouter()
  const locale = useLocale()

  const handleChangeLanguage = useCallback(
    (locale: string) => {
      router.replace(pathname, { locale })
    },
    [pathname, router]
  )

  const logoTexts = [
    'Accounted',
    t('logoTexts.finances'),
    t('logoTexts.control'),
    t('logoTexts.future'),
    t('logoTexts.forecast'),
    t('logoTexts.economy'),
  ]

  return (
    <header className="flex w-full py-7 h-22 justify-between items-center">
      <div className="flex items-end space-x-2 w-45">
        <motion.img className="w-14 h-10" src="/logo.png" alt="Carregando..." />
        <TypingAnimation
          words={logoTexts}
          loop
          className="select-none text-sub-foreground font-bold text-xl tracking-tighter"
        />
      </div>

      <div className="flex items-end space-x-6">
        <span className="p-1 text-sm">Pricing</span>
        <span className="p-1 text-sm">Sobre</span>
        <span className="p-1 text-sm">Suporte</span>

        <Menu>
          <MenuTrigger className="text-sm flex text-center text-main-foreground cursor-pointer font-bold">
            {locale === Locales.PT_BR ? l('pt') : l('en')} <ChevronDown />
          </MenuTrigger>

          <MenuPopup align="center" sideOffset={4}>
            <MenuGroup>
              <MenuGroupLabel>{l('title')} </MenuGroupLabel>
              <MenuItem
                onClick={() => handleChangeLanguage(Locales.PT_BR)}
                className={cn(
                  'text-xs',
                  locale === Locales.PT_BR && 'bg-gray-100'
                )}
                disabled={locale === Locales.PT_BR}
              >
                {l('pt')}
              </MenuItem>
              <MenuItem
                onClick={() => handleChangeLanguage(Locales.EN_US)}
                className={cn(
                  'text-xs',
                  locale === Locales.EN_US && 'bg-gray-100'
                )}
                disabled={locale === Locales.EN_US}
              >
                {l('en')}
              </MenuItem>
            </MenuGroup>
          </MenuPopup>
        </Menu>
        <Button className="ml-5 bg-white text-sub font-bold shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] cursor-pointer hover:bg-main/5 hover:text-sub-foreground transition-all ease-in-out duration-200">
          {t('sessionButton')}
        </Button>
      </div>
    </header>
  )
}
