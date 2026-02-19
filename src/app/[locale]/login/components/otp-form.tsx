import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { ErrorLabel } from '@/src/components'
import { Button } from '@/src/components/ui/button'
import { REGEXP_ONLY_DIGITS_AND_CHARS } from 'input-otp'
import { CircleArrowRight } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { AriaAttributes, useState } from 'react'

interface Props {
  onFinish: (code: string) => void
  error?: boolean
}

const codeLenght = 6

export function OTPForm({ onFinish, error }: Readonly<Props>) {
  const [code, setCode] = useState('')
  const t = useTranslations('login')
  const invalid: AriaAttributes['aria-invalid'] = error ? 'true' : 'false'

  return (
    <div className="flex flex-col items-center justify-between gap-2 h-full">
      <span>{t('messages.otp.title')}</span>

      <InputOTP
        maxLength={codeLenght}
        pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
        onChange={setCode}
        value={code}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} aria-invalid={invalid} />
          <InputOTPSlot index={1} aria-invalid={invalid} />
          <InputOTPSlot index={2} aria-invalid={invalid} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} aria-invalid={invalid} />
          <InputOTPSlot index={4} aria-invalid={invalid} />
          <InputOTPSlot index={5} aria-invalid={invalid} />
        </InputOTPGroup>
      </InputOTP>

      {error && <ErrorLabel text={t('messages.otp.invalid_code')} />}

      <Button
        onClick={() => onFinish(code)}
        disabled={code.length < codeLenght}
        className="cursor-pointer w-full"
      >
        <span>{t('finish_button')}</span>
        <CircleArrowRight />
      </Button>
    </div>
  )
}
