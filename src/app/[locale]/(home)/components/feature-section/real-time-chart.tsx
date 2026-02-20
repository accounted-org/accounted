import React from 'react'
import { motion } from 'motion/react'
import FeatureItem from '@/app/[locale]/(home)/components/feature-section/feature-item'
import TopSpendCategories from '@/app/[locale]/(home)/components/feature-section/top-spend-categories'
import ComparisonRadar from '@/app/[locale]/(home)/components/feature-section/comparison-radar'
import { fadeInUp } from '@/app/[locale]/(home)/components/utils'
import {useTranslations} from "next-intl";

export default function RealTimeChart() {
  const t = useTranslations('home.feature_section.real_time_monitoring')
  return (
    <div className="grid gap-6 md:grid-cols-1">
      <motion.div className="md:col-span-1" variants={fadeInUp}>
        <FeatureItem>
          <div className="flex flex-1 flex-col space-y-2">
            <h3 className="font-semibold text-neutral-900 text-xl tracking-tight transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
              {t('title')}
            </h3>
          </div>
          <div className="flex">
            <TopSpendCategories />
            <ComparisonRadar />
          </div>
        </FeatureItem>
      </motion.div>
    </div>
  )
}
