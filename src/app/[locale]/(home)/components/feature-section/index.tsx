'use client'

import {
  motion,
} from 'motion/react'
import {fadeInUp, staggerContainer} from '@/app/[locale]/(home)/components/utils'
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
import FeatureItem from "@/app/[locale]/(home)/components/feature-section/feature-item";

export function FeatureSection() {
  return (
    <Card>
      <CardContent>
        <CardTitle>Veja o que realmente impacta suas finanças</CardTitle>
        <CardDescription className="text-muted-foreground">
          Identifique excessos, oportunidades de economia e onde ajustar seu
          orçamento.
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
                <motion.div className="md:col-span-1" variants={fadeInUp}>
                  <FeatureItem>
                    <div className="flex flex-1 flex-col space-y-2">
                      <h3 className="font-semibold text-neutral-900 text-xl tracking-tight transition-colors duration-300 group-hover:text-neutral-700 dark:text-neutral-100 dark:group-hover:text-neutral-300">
                        Pricing
                      </h3>
                    </div>
                    <div className="flex">
                      <Pricing />
                    </div>
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
