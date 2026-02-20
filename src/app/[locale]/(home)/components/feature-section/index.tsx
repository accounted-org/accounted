'use client'

import { motion } from 'motion/react'
import {
  fadeInUp,
  staggerContainer,
} from '@/app/[locale]/(home)/components/utils'
import MainFeatures from '@/app/[locale]/(home)/components/feature-section/main-features'
import RealTimeChart from '@/app/[locale]/(home)/components/feature-section/real-time-chart'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import React from 'react'
import Pricing from '@/app/[locale]/(home)/components/feature-section/pricing'
import FeatureItem from '@/app/[locale]/(home)/components/feature-section/feature-item'
import { useTranslations } from 'next-intl'

export function FeatureSection() {
  const t = useTranslations('home.feature_section')
  return (
    <Card>
      <CardContent>
        <CardTitle className="text-2xl">
          {t('title')}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {t('subtitle')}
        </CardDescription>
        <section className="relative overflow-hidden bg-white py-2 dark:bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-4 2xl:px-8">
            <motion.div
              className="grid gap-6"
              initial="hidden"
              variants={staggerContainer}
              viewport={{ once: true }}
              whileInView="visible"
            >
              <MainFeatures />
              <RealTimeChart />
              <div className="grid gap-6 md:grid-cols-1">
                <motion.div
                  id="pricing"
                  className="md:col-span-1"
                  variants={fadeInUp}
                >
                  <FeatureItem>
                    <Pricing />
                  </FeatureItem>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
