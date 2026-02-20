import { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import { CircleCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import {useLocale, useTranslations} from 'next-intl'
import { Locales } from '@/constants'

interface Plan {
  id: string
  name: string
  monthlyPrice: number
  yearlyPrice: number
  freePlan: boolean
  features: string[]
  description: string
}

const plans: Plan[] = [
  {
    id: '1',
    name: 'Primeiros Passos',
    description: 'Comece a organizar sua vida financeira de forma simples',
    monthlyPrice: 0,
    yearlyPrice: 0,
    freePlan: true,
    features: [
      '1 Espaço para suas finanças e compras',
      '1 Pessoa por espaço criado',
      'Até 1 cartão cadastrado',
      'Registro ilimitado de despesas e receitas',
      'Resumo mensal automático dos gastos',
    ],
  },
  {
    id: '2',
    name: 'Em Controle',
    description: 'Tenha controle real dos seus gastos e decisões do dia a dia',
    monthlyPrice: 2490,
    yearlyPrice: 23900,
    freePlan: false,
    features: [
      'Todos os resumos do plano anterior',
      'Resumo semanal',
      'Até 3 Espaços para suas finanças e compras',
      'Até 2 Pessoas por espaço criado',
      'Até 3 Cartões cadastrados',
      'Registro ilimitado de despesas e receitas',
      'Até 2 Previsões semanais por mês',
      'Salve locais onde comprou'
    ],
  },
  {
    id: '3',
    name: 'Planejador',
    description: 'Planeje o futuro financeiro com mais clareza e organização',
    monthlyPrice: 6590,
    yearlyPrice: 63299,
    freePlan: false,
    features: [
      'Todos os resumos do plano anterior',
      'Resumo diário',
      'Até 5 Espaços para suas finanças e compras',
      'Até 6 Pessoas por espaço criado',
      'Até 5 Cartões cadastrados',
      'Registro ilimitado de despesas e receitas',
      'Até 3 Previsões semanais por mês',
      'Salve locais onde comprou'
    ],
  },
  {
    id: '4',
    name: 'O Economizador',
    description: 'Alcance o nível máximo de controle e economia das suas finanças',
    monthlyPrice: 13990,
    yearlyPrice: 132000,
    freePlan: false,
    features: [
      'Todos os resumos do plano anterior',
      'Até 8 Espaços para suas finanças e compras',
      'Até 20 Pessoas por espaço criado',
      'Cadastro de cartões ilimitados',
      'Registro ilimitado de despesas e receitas',
      'Previsões semanais ilimitadas',
      'Salve locais onde comprou'
    ],
  },
]

export default function Pricing() {
  const t = useTranslations('home.feature_section.pricing')
  const [isYearly, setIsYearly] = useState(true)
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)
  const locale = useLocale()

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section>
      <div>
        <div className="mx-auto flex w-full flex-col items-center gap-6 text-center">
          <h2 className="text-4xl font-semibold text-pretty lg:text-6xl">
            {t('title')}
          </h2>
          <p className="text-muted-foreground lg:text-xl">{t('subtitle')}</p>
          <div className="flex items-center gap-3 text-lg">
            {t('period.month')}
            <Switch
              checked={isYearly}
              onCheckedChange={() => setIsYearly(!isYearly)}
            />
            {t('period.year')}
          </div>
          <div className="w-full flex flex-col items-center space-y-3">
            <Carousel
              setApi={setApi}
              opts={{
                align: 'start',
              }}
              className="w-full select-none"
            >
              <CarouselContent>
                {plans.map((plan) => {
                  const formattedPrice = new Intl.NumberFormat(locale, {
                    currency: locale === Locales.PT_BR ? 'BRL' : 'USD',
                    style: 'currency',
                  }).format(plan.yearlyPrice / 100 / 12)
                  
                  const content = (
                    <Card
                      key={plan.id}
                      className="flex w-full flex-col justify-between text-left relative"
                    >
                      <CardHeader>
                        <CardTitle>
                          <p>{plan.name}</p>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                        <div className="flex items-end">
                          {plan.freePlan ? (
                            <span className="text-4xl font-semibold">
                              {t('free_plan')}
                            </span>
                          ) : (
                            <div className="flex flex-col">
                              <div>
                                <span className="text-4xl font-semibold">
                                  {new Intl.NumberFormat(locale, {
                                    currency:
                                      locale === Locales.PT_BR ? 'BRL' : 'USD',
                                    style: 'currency',
                                  }).format(
                                    (isYearly
                                      ? plan.yearlyPrice / 100
                                      : plan.monthlyPrice / 100) /
                                      (locale === Locales.EN_US ? 5.2 : 1)
                                  )}
                                </span>
                                <span className="text-2xl font-semibold text-muted-foreground">
                                  {isYearly
                                    ? `/${t('period.abbr_year')}`
                                    : `/${t('period.abbr_month')}`}
                                </span>
                              </div>
                              {isYearly && (
                                <span className="text-muted-foreground text-sm">
                                  {t.rich('yearly_plan_description', {
                                    value: formattedPrice,
                                    price: (chunks) => (
                                      <b className="text-sub-foreground">
                                        {chunks}
                                      </b>
                                    ),
                                  })}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Separator className="mb-6" />
                        <ul className="space-y-4">
                          {plan.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm"
                            >
                              <CircleCheck className="size-4 text-green-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="mt-auto">
                        <Button asChild className="w-full">
                          <a href="/" target="_blank">
                            {t('button')}
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  )
                  return (
                    <CarouselItem key={plan.id} className="basis-1/3">
                      {content}
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
        </div>
      </div>
    </section>
  )
}
