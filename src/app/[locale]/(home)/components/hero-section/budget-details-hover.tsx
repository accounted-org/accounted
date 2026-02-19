'use client'

import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import type { AvatarBudget } from './data'
import { Locales } from '@/constants'
import { useLocale } from 'next-intl'
import {Tooltip, TooltipContent, TooltipTrigger} from '@/components/ui/tooltip'

type Props = {
  avatars: AvatarBudget[]
  colors: readonly string[]
}

export function BudgetDetailsHover({ avatars, colors }: Props) {
  const locale = useLocale()
  return (
    <div className="w-80 flex flex-col gap-5">
      {avatars.map((avatar, index) => (
        <div key={avatar.name} className="w-full flex items-center gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Avatar className="ring-background size-10 ring-2 transition-all duration-300 ease-in-out hover:scale-105">
                <AvatarImage src={avatar.src} alt={avatar.name} />
                <AvatarFallback className="text-xs">
                  {avatar.fallback}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>{avatar.name}</TooltipContent>
          </Tooltip>

          <div className="w-full">
            <div className="flex gap-4">
              <div className="flex flex-col gap-1 items-center">
                <span className="text-muted-foreground text-xs">Total (%)</span>
                <span className="text-xs font-medium text-yellow-500">
                  {avatar.total}%
                </span>
              </div>

              <div className="w-1/3 flex flex-col gap-1 items-center">
                <span className="text-muted-foreground text-xs">Gasto</span>
                <span className="text-xs font-medium">
                  {new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: locale === Locales.PT_BR ? 'BRL' : 'USD',
                  }).format(
                    locale === Locales.PT_BR ? avatar.spend : avatar.spend / 5.2
                  )}
                </span>
              </div>

              <div className="w-1/3 flex flex-col gap-1 items-center">
                <span className="text-muted-foreground text-xs">Top Cat.</span>
                <Badge className={cn(colors[colors.length % index])}>
                  {avatar.topCategory}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
