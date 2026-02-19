'use client'

import { useTranslations } from 'next-intl'
import {
  Header,
  HeroSection,
  FeatureSection,
  Footer,
} from '@/app/[locale]/(home)/components'

export default function Home() {
  const t = useTranslations('home')

  return (
    <div className="flex flex-col min-h-screen w-full font-sans px-[3%] 2xl:px-[15%] items-center space-y-9">
      <Header />
      <main className="w-full h-full flex flex-col space-y-10">
        <HeroSection />
        <FeatureSection />
        <Footer />
      </main>
    </div>
  )
}
