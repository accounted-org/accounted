'use client'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'
import { useLocale } from 'next-intl'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card'
import { HoverCardContent } from '@/components/ui/hover-card'
import {
  processChartData,
} from '@/app/[locale]/(home)/components/hero-section/data'

export default function BudgetCardChart() {
  const locale = useLocale()

  const lastMonth = new Date()
  lastMonth.setMonth(lastMonth.getMonth() - 1)

  const currentMonth = new Date()

  const chartData = processChartData()

  const chartConfig = {
    currentMonth: {
      label: 'Mês Atual',
      color: 'hsl(0 84.2% 60.2%)',
    },
    lastMonth: {
      label: 'Mês Anterior',
      color: 'var(--main-foreground)',
    },
  } satisfies ChartConfig

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null

    const data = payload[0].payload

    return (
      <div className="rounded-lg border bg-background p-3 shadow-sm">
        <div className="font-medium mb-2">Dia {data.day}</div>

        {data.currentMonth > 0 && (
          <div className="mb-2">
            <div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: chartConfig.currentMonth.color }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: chartConfig.currentMonth.color }}
              />
              Mês Atual: R$ {data.currentMonth.toFixed(2)}
            </div>
            {data.currentMonthDetails.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {data.currentMonthDetails.map((detail: any, idx: number) => (
                  <div key={idx} className="text-xs text-muted-foreground">
                    {detail.dependent} - {detail.category}: R${' '}
                    {detail.spend.toFixed(2)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {data.lastMonth > 0 && (
          <div>
            <div
              className="flex items-center gap-2 text-sm font-medium"
              style={{ color: chartConfig.lastMonth.color }}
            >
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: chartConfig.lastMonth.color }}
              />
              Mês Anterior: R$ {data.lastMonth.toFixed(2)}
            </div>
            {data.lastMonthDetails.length > 0 && (
              <div className="ml-4 mt-1 space-y-1">
                {data.lastMonthDetails.map((detail: any, idx: number) => (
                  <div key={idx} className="text-xs text-muted-foreground">
                    {detail.dependent} - {detail.category}: R${' '}
                    {detail.spend.toFixed(2)}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <HoverCardContent className="w-[700px] p-6">
        <CardHeader className="p-0 pb-4">
          <CardTitle>Comparação de Gastos Diários</CardTitle>
          <CardDescription>
            {lastMonth.toLocaleDateString(locale, {
              month: 'long',
              year: 'numeric',
            })}{' '}
            vs{' '}
            {currentMonth.toLocaleDateString(locale, {
              month: 'long',
              year: 'numeric',
            })}
          </CardDescription>
        </CardHeader>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => `R$ ${value}`}
            />
            <ChartTooltip content={<CustomTooltip />} />
            <Line
              dataKey="lastMonth"
              type="monotone"
              stroke="var(--color-lastMonth)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="currentMonth"
              type="monotone"
              stroke="var(--color-currentMonth)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>

        <CardFooter className="flex-col items-start gap-2 text-sm p-0 pt-4">
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: chartConfig.currentMonth.color }}
              />
              <span className="text-muted-foreground">Mês Atual</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: chartConfig.lastMonth.color }}
              />
              <span className="text-muted-foreground">Mês Anterior</span>
            </div>
          </div>
          <div className="text-muted-foreground">
            Passe o mouse sobre o gráfico para ver detalhes dos gastos por
            dependente
          </div>
        </CardFooter>
      </HoverCardContent>
    </>
  )
}
