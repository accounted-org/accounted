import type {Variants} from "motion/react";
import {baseChartData} from "@/app/[locale]/(home)/components/hero-section/data";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

type CategoryDiff = {
  category: string
  difference: number
}

const isSameMonth = (a: Date, b: Date) => {
  return a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear()
}

const sumSpendByCategory = (data: typeof baseChartData, monthRef: Date) => {
  return data
    .filter((item) => isSameMonth(item.month, monthRef)) // ✅ EDIT
    .reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + item.spend
      return acc
    }, {})
}

export const compareCategoriesMonthOverMonth = (
  data: typeof baseChartData,
  currentMonthRef: Date,
  lastMonthRef: Date
): CategoryDiff[] => {
  const currentTotals = sumSpendByCategory(data, currentMonthRef)
  const lastTotals = sumSpendByCategory(data, lastMonthRef)

  const categories = Array.from(
    new Set([...Object.keys(currentTotals), ...Object.keys(lastTotals)])
  )

  return categories.map((category) => {
    const current = currentTotals[category] ?? 0
    const last = lastTotals[category] ?? 0

    let difference = 0
    if (last === 0) {
      difference = current === 0 ? 0 : 100
    } else {
      difference = ((current - last) / last) * 100
    }

    return {
      category,
      difference: Number(difference.toFixed(1)),
    }
  })
}