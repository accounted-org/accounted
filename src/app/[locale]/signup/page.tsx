'use client'

import { SignupForm } from './components'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const t = useTranslations('signup')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center justify-center w-full h-[70vh] space-y-3 sm:space-y-16">
        <h1 className="font-bold text-lg sm:text-3xl">{t('title')}</h1>
        <SignupForm />
      </div>
    </motion.div>
  )
}
