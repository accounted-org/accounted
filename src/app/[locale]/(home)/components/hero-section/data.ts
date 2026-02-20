export type AvatarBudget = {
  src: string
  fallbackKey: string
  nameKey: string
  total: number
  spend: number
  topCategory: string
}

export const avatars: AvatarBudget[] = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    fallbackKey: 'home.feature_section.data.mom',
    nameKey: 'home.feature_section.data.mom',
    total: 8,
    spend: 400,
    topCategory: 'home.feature_section.data.top_category.home',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallbackKey: 'home.feature_section.data.dad',
    nameKey: 'home.feature_section.data.dad',
    total: 10,
    spend: 500,
    topCategory: 'home.feature_section.data.top_category.vehicle',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallbackKey: 'home.feature_section.data.daughter',
    nameKey: 'home.feature_section.data.daughter',
    total: 20,
    spend: 1000,
    topCategory: 'home.feature_section.data.top_category.shopping',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
    fallbackKey: 'home.feature_section.data.son',
    nameKey: 'home.feature_section.data.son',
    total: 7,
    spend: 350,
    topCategory: 'home.feature_section.data.top_category.internet',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
    fallbackKey: 'home.feature_section.data.brother',
    nameKey: 'home.feature_section.data.brother',
    total: 5,
    spend: 250,
    topCategory: 'home.feature_section.data.top_category.vehicle',
  },
]

export const categoryColors = [
  'bg-pink-400',
  'bg-main',
  'bg-sub',
  'bg-red-300',
  'bg-blue-200',
] as const

const lastMonth = new Date()
lastMonth.setMonth(lastMonth.getMonth() - 1)

const currentMonth = new Date()

export const processChartData = () => {
  const data: {
    day: number
    currentMonth: number
    lastMonth: number
    currentMonthDetails: Array<{dependentKey: string, category: string, spend: number}>
    lastMonthDetails: Array<{dependentKey: string, category: string, spend: number}>
  }[] = []

  const daysInCurrentMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate()

  for (let day = 1; day <= daysInCurrentMonth; day++) {
    // Buscar gastos do mês atual para este dia
    const currentMonthItems = baseChartData
      .filter(item =>
        item.month.getMonth() === currentMonth.getMonth() &&
        item.month.getFullYear() === currentMonth.getFullYear() &&
        item.day === day
      )

    const currentMonthSpend = currentMonthItems.reduce((sum, item) => sum + item.spend, 0)
    const currentMonthDetails = currentMonthItems.map(item => ({
      dependentKey: item.dependentKey,
      category: item.category,
      spend: item.spend
    }))

    const lastMonthItems = baseChartData
      .filter(item =>
        item.month.getMonth() === lastMonth.getMonth() &&
        item.month.getFullYear() === lastMonth.getFullYear() &&
        item.day === day
      )

    const lastMonthSpend = lastMonthItems.reduce((sum, item) => sum + item.spend, 0)
    const lastMonthDetails = lastMonthItems.map(item => ({
      dependentKey: item.dependentKey,
      category: item.category,
      spend: item.spend
    }))

    data.push({
      day,
      currentMonth: currentMonthSpend,
      lastMonth: lastMonthSpend,
      currentMonthDetails,
      lastMonthDetails,
    })
  }

  return data
}

export const baseChartData = [
  { month: lastMonth, day: 2, spend: 300, dependentKey: 'home.feature_section.data.mom', category: 'home.feature_section.data.top_category.home' },
  { month: lastMonth, day: 5, spend: 200, dependentKey: 'home.feature_section.data.dad', category: 'home.feature_section.data.top_category.vehicle' },
  { month: lastMonth, day: 6, spend: 800, dependentKey: 'home.feature_section.data.mark', category: 'home.feature_section.data.top_category.business' },
  { month: lastMonth, day: 9, spend: 500, dependentKey: 'home.feature_section.data.daughter', category: 'home.feature_section.data.top_category.shopping' },
  { month: lastMonth, day: 12, spend: 250, dependentKey: 'home.feature_section.data.son', category: 'home.feature_section.data.top_category.internet' },
  { month: lastMonth, day: 15, spend: 400, dependentKey: 'home.feature_section.data.mark', category: 'home.feature_section.data.top_category.business' },
  { month: lastMonth, day: 18, spend: 500, dependentKey: 'home.feature_section.data.daughter', category: 'home.feature_section.data.top_category.shopping' },
  { month: lastMonth, day: 21, spend: 250, dependentKey: 'home.feature_section.data.brother', category: 'home.feature_section.data.top_category.vehicle' },
  { month: lastMonth, day: 23, spend: 300, dependentKey: 'home.feature_section.data.mom', category: 'home.feature_section.data.top_category.home' },
  { month: lastMonth, day: 26, spend: 800, dependentKey: 'home.feature_section.data.mark', category: 'home.feature_section.data.top_category.business' },
  { month: lastMonth, day: 28, spend: 200, dependentKey: 'home.feature_section.data.dad', category: 'home.feature_section.data.top_category.vehicle' },

  { month: currentMonth, day: 2, spend: 150, dependentKey: 'home.feature_section.data.mom', category: 'home.feature_section.data.top_category.home' },
  { month: currentMonth, day: 14, spend: 250, dependentKey: 'home.feature_section.data.mom', category: 'home.feature_section.data.top_category.home' },
  { month: currentMonth, day: 5, spend: 200, dependentKey: 'home.feature_section.data.dad', category: 'home.feature_section.data.top_category.vehicle' },
  { month: currentMonth, day: 19, spend: 300, dependentKey: 'home.feature_section.data.dad', category: 'home.feature_section.data.top_category.vehicle' },
  { month: currentMonth, day: 3, spend: 400, dependentKey: 'home.feature_section.data.daughter', category: 'home.feature_section.data.top_category.shopping' },
  { month: currentMonth, day: 11, spend: 300, dependentKey: 'home.feature_section.data.daughter', category: 'home.feature_section.data.top_category.shopping' },
  { month: currentMonth, day: 22, spend: 300, dependentKey: 'home.feature_section.data.daughter', category: 'home.feature_section.data.top_category.shopping' },
  { month: currentMonth, day: 7, spend: 150, dependentKey: 'home.feature_section.data.son', category: 'home.feature_section.data.top_category.internet' },
  { month: currentMonth, day: 25, spend: 200, dependentKey: 'home.feature_section.data.son', category: 'home.feature_section.data.top_category.internet' },
  { month: currentMonth, day: 9, spend: 250, dependentKey: 'home.feature_section.data.brother', category: 'home.feature_section.data.top_category.vehicle' },
  { month: currentMonth, day: 1, spend: 800, dependentKey: 'home.feature_section.data.mark', category: 'home.feature_section.data.top_category.business' },
  { month: currentMonth, day: 13, spend: 700, dependentKey: 'home.feature_section.data.mark', category: 'home.feature_section.data.top_category.business' },
  { month: currentMonth, day: 21, spend: 1000, dependentKey: 'home.feature_section.data.mark', category: 'home.feature_section.data.top_category.business' },
]