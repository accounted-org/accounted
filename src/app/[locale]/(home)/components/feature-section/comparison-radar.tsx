import React, { useMemo, useState } from 'react'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { baseChartData } from '@/app/[locale]/(home)/components/hero-section/data'
import { Legend, PolarAngleAxis, PolarGrid, Radar, RadarChart } from 'recharts'
import { Marquee } from '@/components/ui/marquee'
import { cn } from '@/lib/utils'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { compareCategoriesMonthOverMonth } from '@/app/[locale]/(home)/components/utils'
import { useTranslations } from 'next-intl'

export default function ComparisonRadar() {
  const d = useTranslations()
  const t = useTranslations('home.feature_section.real_time_monitoring.comparison_radar')
  {
    const [paused, setPaused] = useState(false)
    const chartConfig = {
      current: {
        label: t('chart_config.current_month'),
        color: 'var(--sub)',
      },
      last: {
        label: t('chart_config.last_month'),
        color: 'var(--main-foreground)',
      },
    } satisfies ChartConfig

    const { currentMonth, lastMonth } = useMemo(() => {
      const current = new Date()
      const last = new Date()
      last.setMonth(last.getMonth() - 1)
      return { currentMonth: current, lastMonth: last }
    }, [])

    const radarData = useMemo(() => {
      const sumByCategory = (monthRef: Date) => {
        return baseChartData
          .filter(
            (item) =>
              item.month.getMonth() === monthRef.getMonth() &&
              item.month.getFullYear() === monthRef.getFullYear()
          )
          .reduce<Record<string, number>>((acc, item) => {
            acc[d(item.category)] = (acc[d(item.category)] ?? 0) + item.spend
            return acc
          }, {})
      }

      const currentTotals = sumByCategory(currentMonth)
      const lastTotals = sumByCategory(lastMonth)

      const categories = Array.from(
        new Set([...Object.keys(currentTotals), ...Object.keys(lastTotals)])
      )

      return categories.map((category) => ({
        category,
        current: currentTotals[category] ?? 0,
        last: lastTotals[category] ?? 0,
      }))
    }, [currentMonth, lastMonth])

    const diffs = compareCategoriesMonthOverMonth(
      baseChartData,
      currentMonth,
      lastMonth
    )

    return (
      <div className="flex h-full p-4">
        <div className="w-full max-w-[420px] aspect-square flex flex-col items-center">
          <div className="mb-2 text-center">
            <h3 className="text-lg font-semibold">{t('title')}</h3>
            <p className="text-sm text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
          <ChartContainer className="w-full h-full" config={chartConfig}>
            <RadarChart
              data={radarData}
              margin={{ top: 24, right: 24, bottom: 24, left: 24 }}
            >
              <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
              <PolarAngleAxis dataKey="category" />
              <PolarGrid />

              <Radar
                dataKey="current"
                fill="var(--color-current)"
                stroke="var(--color-current)"
                fillOpacity={0.35}
              />
              <Radar
                dataKey="last"
                fill="var(--color-last)"
                stroke="var(--color-last)"
                fillOpacity={0.25}
              />

              <Legend
                formatter={(value) =>
                  value === 'current' ? t('chart_config.current_month') : t('chart_config.last_month')
                }
              />
            </RadarChart>
          </ChartContainer>
          <div
            className="relative overflow-hidden w-2/3 px-3"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <Marquee
              className={cn(
                '[--duration:20s]',
                paused && '[&_*]:[animation-play-state:paused]' // ✅ EDIT
              )}
              data-paused={paused}
            >
              {diffs.map((diff) => (
                <Tooltip key={d(diff.category)}>
                  <TooltipTrigger>
                    <div className="select-none ml-2 flex gap-1 items-center">
                      <span
                        className={cn(
                          'text-xs font-bold',
                          diff.difference > 0
                            ? 'text-red-400'
                            : 'text-main-foreground'
                        )}
                      >
                        {d(diff.category)}
                      </span>
                      <span>
                        {diff.difference > 0 ? (
                          <TrendingUp className="text-red-400 size-5" />
                        ) : (
                          <TrendingDown className="text-main-foreground size-5" />
                        )}
                      </span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="text-neutral-500 bg-white border border-1 border-sub rounded-full [&_svg]:invisible">
                    <span
                      className={cn(
                        'font-black',
                        diff.difference > 0
                          ? 'text-red-400'
                          : 'text-main-foreground'
                      )}
                    >
                      {diff.difference > 0 && '+'}
                      {diff.difference}%
                    </span>{' '}
                    {t('description')}
                  </TooltipContent>
                </Tooltip>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    )
  }
}
