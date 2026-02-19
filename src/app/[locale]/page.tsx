import { useTranslations } from 'next-intl'
import HomePage from '@/app/[locale]/(home)/components/homepage'

export default function Home() {
  const t = useTranslations('home')

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <HomePage/>
    </div>
  )
}
