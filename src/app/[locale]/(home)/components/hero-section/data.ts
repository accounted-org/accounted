export type AvatarBudget = {
  src: string
  fallback: string
  name: string
  total: number
  spend: number
  topCategory: string
}

export const avatars: AvatarBudget[] = [
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-2.png',
    fallback: 'Mãe',
    name: 'Mãe',
    total: 8,
    spend: 400,
    topCategory: 'Home',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-3.png',
    fallback: 'Pai',
    name: 'Pai',
    total: 10,
    spend: 500,
    topCategory: 'Vehicle',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-6.png',
    fallback: 'Filha',
    name: 'Filha',
    total: 20,
    spend: 1000,
    topCategory: 'Shopping',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-7.png',
    fallback: 'Filho',
    name: 'Filho',
    total: 7,
    spend: 350,
    topCategory: 'Internet',
  },
  {
    src: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-9.png',
    fallback: 'Irmão',
    name: 'Irmão',
    total: 5,
    spend: 250,
    topCategory: 'Vehicle',
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
    currentMonthDetails: Array<{dependent: string, category: string, spend: number}>
    lastMonthDetails: Array<{dependent: string, category: string, spend: number}>
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
      dependent: item.dependent,
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
      dependent: item.dependent,
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
  { month: lastMonth, day: 2, spend: 300, dependent: 'Mãe', category: 'Home' },
  { month: lastMonth, day: 5, spend: 200, dependent: 'Pai', category: 'Vehicle' },
  { month: lastMonth, day: 6, spend: 800, dependent: 'Mark', category: 'Business' },
  { month: lastMonth, day: 9, spend: 500, dependent: 'Filha', category: 'Shopping' },
  { month: lastMonth, day: 12, spend: 250, dependent: 'Filho', category: 'Internet' },
  { month: lastMonth, day: 15, spend: 400, dependent: 'Mark', category: 'Business' },
  { month: lastMonth, day: 18, spend: 500, dependent: 'Filha', category: 'Shopping' },
  { month: lastMonth, day: 21, spend: 250, dependent: 'Irmão', category: 'Vehicle' },
  { month: lastMonth, day: 23, spend: 300, dependent: 'Mãe', category: 'Home' },
  { month: lastMonth, day: 26, spend: 800, dependent: 'Mark', category: 'Business' },
  { month: lastMonth, day: 28, spend: 200, dependent: 'Pai', category: 'Vehicle' },

  { month: currentMonth, day: 2, spend: 150, dependent: 'Mãe', category: 'Home' },
  { month: currentMonth, day: 14, spend: 250, dependent: 'Mãe', category: 'Home' },
  { month: currentMonth, day: 5, spend: 200, dependent: 'Pai', category: 'Vehicle' },
  { month: currentMonth, day: 19, spend: 300, dependent: 'Pai', category: 'Vehicle' },
  { month: currentMonth, day: 3, spend: 400, dependent: 'Filha', category: 'Shopping' },
  { month: currentMonth, day: 11, spend: 300, dependent: 'Filha', category: 'E-Shopping' },
  { month: currentMonth, day: 22, spend: 300, dependent: 'Filha', category: 'Shopping' },
  { month: currentMonth, day: 7, spend: 150, dependent: 'Filho', category: 'Internet' },
  { month: currentMonth, day: 25, spend: 200, dependent: 'Filho', category: 'Internet' },
  { month: currentMonth, day: 9, spend: 250, dependent: 'Irmão', category: 'Vehicle' },
  { month: currentMonth, day: 1, spend: 800, dependent: 'Mark', category: 'Business' },
  { month: currentMonth, day: 13, spend: 700, dependent: 'Mark', category: 'Business' },
  { month: currentMonth, day: 21, spend: 1000, dependent: 'Mark', category: 'Business' },
]