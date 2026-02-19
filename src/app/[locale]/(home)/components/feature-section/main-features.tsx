import { motion } from 'motion/react'
import {
  ArrowDownWideNarrowIcon,
  BanknoteArrowUp,
  Check,
  CheckCircle2,
  Goal,
  TrendingUpIcon,
} from 'lucide-react'
import { Locales } from '@/constants'
import CircularProgress from '@/components/ui/circular-progress'
import React, { useEffect, useState } from 'react'
import { fadeInUp } from '@/app/[locale]/(home)/components/utils'
import { useLocale } from 'next-intl'
import { cn } from '@/lib/utils'
import FeatureItem from '@/app/[locale]/(home)/components/feature-section/feature-item'

const SpotlightFeature = ({ items }: { items: string[] }) => (
  <ul className="mt-2 space-y-1.5">
    {items.map((item, index) => (
      <motion.li
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: -10 }}
        key={`spotlight-${item.toLowerCase().replace(/\s+/g, '-')}`}
        transition={{ delay: 0.1 * index }}
      >
        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-emerald-500 dark:text-emerald-400" />
        <span className="text-neutral-700 text-sm dark:text-neutral-300">
          {item}
        </span>
      </motion.li>
    ))}
  </ul>
)

const CounterAnimation = ({
  start,
  end,
  suffix = '',
  className,
}: {
  start: number
  end: number
  suffix?: string
  className?: string
}) => {
  const [count, setCount] = useState(start)

  useEffect(() => {
    const duration = 2000
    const frameRate = 1000 / 60
    const totalFrames = Math.round(duration / frameRate)

    let currentFrame = 0
    const counter = setInterval(() => {
      currentFrame++
      const progress = currentFrame / totalFrames
      const easedProgress = 1 - (1 - progress) ** 3
      const current = start + (end - start) * easedProgress

      setCount(Math.min(current, end))

      if (currentFrame === totalFrames) {
        clearInterval(counter)
      }
    }, frameRate)

    return () => clearInterval(counter)
  }, [start, end])

  return (
    <div className={cn('flex items-baseline gap-0.5', className)}>
      <span className="font-bold text-2xl">
        {count.toFixed(1).replace(/\.0$/, '')}
      </span>
      <span className="font-medium text-lg">{suffix}</span>
    </div>
  )
}

export default function MainFeatures() {
  const locale = useLocale()
  const featureSpotlight: string[] = [
    'Previsão de saldo',
    'Alertas de gastos',
    'Categorias automáticas',
    'Metas financeiras',
    'Relatórios claros',
  ]

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <motion.div className="md:col-span-1" variants={fadeInUp}>
        <FeatureItem>
          <div className="flex flex-1 flex-col space-y-2">
            <h3 className="font-semibold text-neutral-900 text-xl tracking-tight transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
              Principais features
            </h3>
          </div>

          <p className="text-neutral-600 text-sm tracking-tight dark:text-neutral-400">
            Nossos serviços minimos garantidos
          </p>

          <SpotlightFeature items={featureSpotlight} />
        </FeatureItem>
      </motion.div>

      <motion.div className="md:col-span-2" variants={fadeInUp}>
        <FeatureItem>
          <div className="flex h-full z-10 gap-3 w-full justify-between pr-10">
            <div className="z-10 flex h-full flex-col gap-3 justify-center">
              <span className="text-lg font-bold flex items-center gap-1">
                <Check className="text-main size-8" />
                Veja <b className="text-sub ">gastos</b> e{' '}
                <b className="text-main-foreground">previsões</b> em um único
                lugar.
              </span>

              <div className="flex items-center gap-2">
                <span className="text-lg font-bold flex items-center gap-1">
                  <Check className="text-main size-8" />
                  Aumento da sua saúde financeira
                </span>
                <CounterAnimation
                  start={0}
                  end={83.91}
                  suffix="%"
                  className="text-main-foreground"
                />
                <TrendingUpIcon className="text-main-foreground size-5" />
              </div>

              <div className="flex items-center gap-2 font-bold">
                <Check className="text-main size-8" />
                <span className="text-main-foreground flex items-center gap-1 text-lg">
                  {new Intl.NumberFormat(locale, {
                    style: 'currency',
                    currency: locale === Locales.PT_BR ? 'BRL' : 'USD',
                  }).format(locale === Locales.PT_BR ? 300 : 300 / 5.2)}
                  <span className="text-main-foreground">+</span>
                </span>
                <span>economizados no último mês</span>
              </div>

              <span className="text-lg font-bold flex items-center gap-1">
                <Check className="text-main size-8" />
                Entenda sua vida financeira em{' '}
                <b className="text-sub">segundos</b>
              </span>
            </div>
            <div className="relative flex flex-col items-center">
              <span className="flex absolute right-0 top-4 text-green-600">
                <span className="absolute top-1 right-5">7%</span>
                <BanknoteArrowUp size={20} />
              </span>
              <span className="flex absolute -right-2 bottom-8 text-red-600">
                <span className="absolute top-1 right-5">7%</span>
                <ArrowDownWideNarrowIcon size={20} />
              </span>
              <span className="absolute left-1/2 top-2/6 translate-x-1/6 -translate-y-1/2">
                <Goal />
              </span>
              <CircularProgress
                labelClassName="text-xl font-bold"
                progressClassName="stroke-main-foreground"
                renderLabel={(progress) => `${progress}%`}
                showLabel
                size={200}
                strokeWidth={10}
                value={83.9}
              />
              <span className="absolute left-1/2 bottom-1/4 -translate-x-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                Meta
              </span>
            </div>
          </div>
        </FeatureItem>
      </motion.div>
    </div>
  )
}
