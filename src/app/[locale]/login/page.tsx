'use client'

import { useCallback, useState } from 'react'
import { LoginForm, OTPForm, QrCodeForm } from './components'
import { useTranslations } from 'next-intl'
import { useAuthStore } from '@/src/lib'
import { useAuth } from '@/src/hooks'
import { motion } from 'framer-motion'

export default function LoginPage() {
  const t = useTranslations('login')
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [showQrCode, setShowQrCode] = useState(false)
  const [enableMfaError, setEnableMfaError] = useState(false)
  const [otpError, setOtpError] = useState(false)
  const { qrCode } = useAuthStore()
  const { enableMfa, verifyOtp } = useAuth()

  const handleFinishLogin = useCallback((shouldEnableMfa: boolean) => {
    if (shouldEnableMfa) {
      setShowQrCode(true)
    } else {
      setShowOtpForm(!shouldEnableMfa)
    }
  }, [])

  const handleVerifyOtp = useCallback(
    async (code: string) => {
      try {
        setOtpError(false)
        await verifyOtp(code)
      } catch {
        setOtpError(true)
      }
    },
    [verifyOtp]
  )

  const handleEnableMfa = useCallback(
    async (code: string) => {
      try {
        setEnableMfaError(false)
        const success = await enableMfa(code)

        if (!success) {
          setEnableMfaError(true)
          return
        }

        setShowQrCode(false)
        setShowOtpForm(true)
      } catch {
        setEnableMfaError(true)
      }
    },
    [enableMfa]
  )

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <div className="flex flex-col items-center justify-center w-full h-[100vh] space-y-3 sm:space-y-18">
        <h1 className="relative font-bold text-lg sm:text-3xl">{t('title')}</h1>
        {!showOtpForm && !showQrCode && (
          <LoginForm onFinish={handleFinishLogin} />
        )}

        {showOtpForm && <OTPForm onFinish={handleVerifyOtp} error={otpError} />}
        {showQrCode && (
          <QrCodeForm
            handleEnableMfa={handleEnableMfa}
            error={enableMfaError}
            {...qrCode}
          />
        )}
      </div>
    </motion.div>
  )
}
