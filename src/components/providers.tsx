import { NextIntlClientProvider } from 'next-intl'
import { TooltipProvider } from '@/components/ui/tooltip'

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextIntlClientProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </NextIntlClientProvider>
  )
}
