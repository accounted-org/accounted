'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { ChevronDown, LucideAlertCircle } from 'lucide-react'
import { BudgetDetailsHover } from './budget-details-hover'
import type { AvatarBudget } from './data'
import { Locales } from '@/constants'
import Totals from '@/app/[locale]/(home)/components/hero-section/totals'
import { useLocale } from 'next-intl'

type Props = {
  avatars: AvatarBudget[]
  colors: readonly string[]
}

export function BudgetCard({ avatars, colors }: Props) {
  const locale = useLocale()
  return (
    <Card className="border-main/40 relative">
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <span className="text-sm font-semibold">Your space</span>

          <div className="flex justify-between items-center">
            <section className="flex items-center gap-3">
              <Avatar className="rounded-sm w-14 h-14">
                <AvatarImage
                  src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-5.png"
                  alt="Hallie Richards"
                  className="rounded-sm"
                />
                <AvatarFallback className="text-xs">HR</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-xl font-medium">Mark</span>

                <div className="flex items-center gap-2">
                  <span className="flex text-xs items-center gap-2 text-muted-foreground truncate">
                    Space-ID: 15-1238901-12
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <LucideAlertCircle className="size-4 text-yellow-600 animate-pulse" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Uso do orçamento chegou a 100%
                      </TooltipContent>
                    </Tooltip>
                  </span>

                  <HoverCard openDelay={0} closeDelay={0}>
                    <HoverCardTrigger asChild>
                      <ChevronDown className="h-5 cursor-pointer" />
                    </HoverCardTrigger>

                    <HoverCardContent className="w-85">
                      <BudgetDetailsHover avatars={avatars} colors={colors} />
                    </HoverCardContent>
                  </HoverCard>
                </div>
              </div>
            </section>
            <section className="flex flex-col text-2xl">
              <span className="text-sm text-muted-foreground">Seu gasto</span>
              <div>
                {new Intl.NumberFormat(locale, {
                  style: 'currency',
                  currency: locale === Locales.PT_BR ? 'BRL' : 'USD',
                }).format(locale === Locales.PT_BR ? 2500 : 2500 / 5.2)}
                <sub>
                  <span className="text-xs text-yellow-500">/50%</span>
                </sub>
              </div>
            </section>
          </div>
        </div>
        <Totals />
      </CardContent>
    </Card>
  )
}
