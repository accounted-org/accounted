import { motion } from 'framer-motion'
import { CgCopyright } from 'react-icons/cg'
import { format } from 'date-fns'
import { Separator } from '@/components/ui/separator'
import { FaLinkedin, FaSquareFacebook, FaTwitter } from 'react-icons/fa6'
import { FaInstagramSquare } from 'react-icons/fa'

export function Footer() {
  return (
    <section id="footer" className="p-3 h-50 mb-3 flex w-full space-x-10">
      <div className="flex flex-col justify-around items-start">
        <div className="flex flex-col items-center">
          <motion.img
            className="w-14 h-10"
            src="/logo.png"
            alt="Carregando..."
          />
          <span className="text-sub-foreground font-bold text-xl">
            Accounted
          </span>
        </div>

        <div className="flex items-center text-sm text-muted-foreground/70 gap-1">
          <span className="flex items-center">
            <CgCopyright className="size-5" />
            {format(new Date(), 'yyyy')}
          </span>
          Accounted Ltda. CNPJ 33.333.333/0001-26
        </div>
      </div>

      <div className="h-full flex flex-col justify-center w-1/2 items-center space-y-3">
        <div className="flex gap-3 text-md text-muted-foreground">
          <span>dev@accounted.com.br</span>
          <a className="text-muted-foreground hover:text-black/70 cursor-pointer">
            Politica de Privacidade
          </a>
          <a className="text-muted-foreground hover:text-black/70 cursor-pointer">
            Termos de Serviço
          </a>
        </div>

        <Separator className="bg-sub-foreground/50" />

        <div className="flex space-x-4 text-xl">
          <FaSquareFacebook />
          <FaLinkedin />
          <FaInstagramSquare />
          <FaTwitter />
        </div>
      </div>
    </section>
  )
}
