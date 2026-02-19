'use client'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { AlertCircle, CalendarDays, TrendingUpIcon, Wallet } from 'lucide-react'
import { Locales } from '@/constants'
import { HoverCard, HoverCardTrigger } from '@/components/ui/hover-card'
import BudgetCardChart from '@/app/[locale]/(home)/components/hero-section/budget-card-chart'
import { useLocale } from 'next-intl'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'

export default function Totals() {
  const locale = useLocale()
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const MetricsData = [
    {
      icons: <TrendingUpIcon className="size-4.5 text-red-500" />,
      title: 'Spent change',
      value: (
        <span className="text-red-500 select-text">
          {new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: locale === Locales.PT_BR ? 'BRL' : 'USD',
          }).format(locale === Locales.PT_BR ? 300 : 300 / 5.2)}
          <sub>/6,38%</sub>
        </span>
      ),
      hoverContent: <BudgetCardChart />,
    },
    {
      icons: <Wallet className="size-4.5 text-sub-foreground" />,
      title: 'Remaining budget',
      value: (
        <>
          <span className="select-text text-sub-foreground font-medium">
            {new Intl.NumberFormat(locale, {
              style: 'currency',
              currency: locale === Locales.PT_BR ? 'BRL' : 'USD',
            }).format(locale === Locales.PT_BR ? 0 : 0 / 5.2)} /{' '}
          </span>
          <span className="text-muted-foreground">
            {new Intl.NumberFormat(locale, {
              style: 'currency',
              currency: locale === Locales.PT_BR ? 'BRL' : 'USD',
            }).format(locale === Locales.PT_BR ? 5000 : 5000 / 5.2)}
          </span>
        </>
      ),
    },
    {
      icons: <CalendarDays className="size-4.5" />,
      title: 'Daily Spend',
      value: (
        <span className="select-text">
          {new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: locale === Locales.PT_BR ? 'BRL' : 'USD',
          }).format(locale === Locales.PT_BR ? 161.29 : 161.29 / 5.2)}
        </span>
      ),
    },
  ]

  return (
    <div className="space-y-3">
      <Carousel
        setApi={setApi}
        opts={{
          align: 'start',
        }}
        className="w-full select-none"
      >
        <CarouselContent>
          {MetricsData.map((metric) => {
            const content = (
              <Card className="relative">
                {metric.hoverContent && (
                  <AlertCircle className="absolute size-4 text-red-500 animate-pulse right-2 top-2" />
                )}

                <CardContent>
                  <span className="text-xs text-muted-foreground">
                    {metric.title}
                  </span>
                  <div className="flex items-center gap-2">
                    {metric.icons}
                    <span>{metric.value}</span>
                  </div>
                </CardContent>
              </Card>
            )

            return (
              <CarouselItem key={metric.title} className="basis-1/2">
                {metric.hoverContent ? (
                  <HoverCard closeDelay={0} openDelay={0}>
                    <HoverCardTrigger className="border-red-500" asChild>
                      {content}
                    </HoverCardTrigger>
                    {metric.hoverContent}
                  </HoverCard>
                ) : (
                  content
                )}
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'h-1.5 rounded-full transition-all duration-300',
              current === index
                ? 'w-6 bg-sub-foreground'
                : 'w-1.5 bg-main-foreground/30 hover:bg-main-foreground/50'
            )}
            aria-label={`Ir para slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
