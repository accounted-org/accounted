import {
  Header,
  HeroSection,
  Footer,
  FeatureSection,
} from '@/app/[locale]/(home)/components'

export default function HomePage() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className='flex flex-col space-y-5'>
        <HeroSection />
        <FeatureSection />
        <Footer />
      </div>
    </div>
  )
}
