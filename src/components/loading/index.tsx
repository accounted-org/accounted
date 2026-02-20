'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
interface LoadingProps {
  imageWidth?: number
  imageHeight?: number
}

export default function Loading({ imageHeight, imageWidth }: LoadingProps) {
  return (
    <div className="absolute w-full h-full min-h-[50px] flex items-center inset-0 bg-gray-50/80 backdrop-blur-[3px] justify-center">
      <div className="relative z-10">
        <motion.img
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="animate-pulse"
          src="/logo.png"
          alt="Carregando..."
          width={imageWidth ?? 150}
          height={imageHeight ?? 150}
        />
      </div>
    </div>
  )
}
