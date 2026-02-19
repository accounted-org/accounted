import { useLocale } from 'next-intl'
import {
  BriefcaseBusiness,
  CarFront,
  Receipt,
  ShoppingCart,
} from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Progress } from '@/components/ui/progress'
import { Locales } from '@/constants'
import React from 'react'

export default function TopSpendCategories() {
  const locale = useLocale()

  const items = [
    {
      icon: <BriefcaseBusiness className="size-13 text-sub" />,
      category: 'Negócios',
      total: 50,
      content: [
        {
          date: new Date('2026-02-19T12:00:00'),
          value: 800,
          local: 'insumos',
          installment: 1,
          totalInstallments: 1,
        },
        {
          date: new Date('2026-02-09T12:00:00'),
          value: 700,
          local: 'projetos',
          installment: 1,
          totalInstallments: 2,
        },
        {
          date: new Date('2026-02-05T12:00:00'),
          value: 1000,
          local: 'freelancers',
          installment: 1,
          totalInstallments: 1,
        },
      ],
    },
    {
      icon: <CarFront className="size-15 text-main-foreground" />,
      category: 'Veículo',
      total: 15,
      content: [
        {
          date: new Date('2026-02-19T12:00:00'),
          value: 300,
          local: 'posto de gasolina',
          installment: 1,
          totalInstallments: 1,
        },
        {
          date: new Date('2026-02-09T12:00:00'),
          value: 250,
          local: 'americanas',
          installment: 3,
          totalInstallments: 12,
        },
        {
          date: new Date('2026-02-05T12:00:00'),
          value: 200,
          local: 'posto de gasolina',
          installment: 1,
          totalInstallments: 1,
        },
      ],
    },
    {
      icon: <ShoppingCart className="size-15 text-orange-600" />,
      category: 'Shopping',
      total: 14,
      content: [
        {
          date: new Date(),
          value: 300,
          local: 'Zara',
          installment: 1,
          totalInstallments: 1,
        },
        {
          date: new Date(),
          value: 400,
          local: 'Lacoste',
          installment: 1,
          totalInstallments: 3,
        },
      ],
    },
  ]

  const colors = [
    { percent: 50, color: 'bg-sub' },
    { percent: 15, color: 'bg-main-foreground' },
    { percent: 14, color: 'bg-orange-600' },
  ]

  return (
    <div className="flex h-full p-4 flex-2">
      <div className="w-full flex flex-col items-center">
        <div className="mb-2 text-center">
          <h3 className="text-lg font-semibold">Categorias com mais gasto</h3>
          <p className="text-sm text-muted-foreground">
            Conheça o vilão do seu mês
          </p>
        </div>
        <Card className="h-full w-full">
          <CardHeader>
            <div className="w-full h-3 bg-muted rounded-full overflow-hidden flex">
              {colors.map((p, idx) => (
                <div
                  key={idx}
                  className={cn(p.color)}
                  style={{
                    width: `${p.percent}%`,
                  }}
                />
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[350]">
              <Accordion type="single" collapsible>
                {items.map((i, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-1 mb-3 p-3 rounded-lg"
                  >
                    <AccordionTrigger className="cursor-pointer flex w-full items-center gap-2 py-3 hover:no-underline no-underline [&_svg]:ml-auto [&_svg]:shrink-0 [&_svg]:self-center">
                      <div className="flex w-full items-center gap-2">
                        {i.icon}

                        <div className="flex-1 flex flex-col text-lg font-bold text-[#252525]">
                          {i.category}

                          <div className="flex items-center gap-2">
                            <Progress
                              className="w-full [&>div]:bg-main"
                              value={i.total}
                            />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {i.total}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </AccordionTrigger>

                    <AccordionContent className="flex flex-col py-2 px-8">
                      {i.content.map((c, index) => (
                        <div
                          key={index}
                          className="flex gap-3 capitalize items-center mb-5 justify-between"
                        >
                          <div className="flex gap-3 items-center">
                            <Receipt className="text-muted-foreground" />
                            <div className="flex flex-col">
                              <span>
                                {c.local}{' '}
                                {c.totalInstallments !== 1 &&
                                  `(${c.installment}/${c.totalInstallments})`}
                              </span>

                              <span className="text-xs text-muted-foreground">
                                {`${c.date.getDate()}/${c.date.toLocaleDateString(locale, { month: 'short' }).replace(/\./g, '')}`}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-bold text-red-500">
                              -
                              {new Intl.NumberFormat(locale, {
                                style: 'currency',
                                currency:
                                  locale === Locales.PT_BR ? 'BRL' : 'USD',
                              }).format(
                                locale === Locales.PT_BR
                                  ? c.value
                                  : c.value / 5.2
                              )}
                            </span>

                            <span className="text-xs text-muted-foreground text-right flex gap-1">
                              <span>
                                {locale === Locales.PT_BR ? 'Débito' : 'Debit'}
                              </span>
                              <span>
                                {locale === Locales.PT_BR
                                  ? 'Cartão 01'
                                  : 'Card 01'}
                              </span>
                            </span>
                          </div>
                        </div>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
