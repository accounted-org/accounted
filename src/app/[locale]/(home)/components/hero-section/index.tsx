'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { BudgetCard } from '@/app/[locale]/(home)/components/hero-section/budget-card'
import {
  avatars,
  categoryColors,
} from '@/app/[locale]/(home)/components/hero-section/data'
import {useTranslations} from "next-intl";
import React from "react";

export function HeroSection() {
  const t = useTranslations('home.hero_section')
  
  return (
    <section className="flex h-full items-center gap-5 relative">
      <div className="flex flex-col space-y-2 h-full w-2/3">
        <h1 className="tracking-wide text text-3xl flex flex-col">
          {t.rich('title', {
            g: (chunks) => (
              <span className="text-main-foreground font-black">{chunks}</span>
            ),
          })}

        </h1>
        <p className="text-muted-foreground">
          {t('subtitle')}
        </p>

        <Button className="w-2/4 bg-sub text-white cursor-pointer font-bold shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)] hover:bg-main transition-all ease-in-out duration-200 h-12">
          {t('button')} <ArrowRight />
        </Button>
      </div>

      <div className="w-full">
        <BudgetCard avatars={avatars} colors={categoryColors} />
      </div>
    </section>
  )
}
