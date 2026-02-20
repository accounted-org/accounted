'use client'

import { SignupSchemaData, createSignupSchema } from '@/src/lib'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/src/lib/utils'
import { ptBR, enUS } from 'date-fns/locale'
import { useLocale } from 'next-intl'
import Link from 'next/link'
import { useRegister } from '@/src/hooks'
import { useRouter } from 'next/navigation'
import { ErrorLabel } from '@/src/components'

export function SignupForm() {
  const t = useTranslations('signup')
  const locale = useLocale()
  const { register, loading, error } = useRegister()
  const router = useRouter()

  const calendarLocale = useMemo(() => {
    if (locale.toLowerCase().startsWith('pt')) return ptBR
    return enUS
  }, [locale])

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<SignupSchemaData>({
    resolver: zodResolver(createSignupSchema(t)),
    defaultValues: {
      password: '',
      email: '',
      name: '',
      birthDate: undefined,
    },
  })

  const onSubmit = useCallback(
    async (data: SignupSchemaData) => {
      const succcess = await register(data)
      if (!succcess) {
        return
      }

      router.push('login')
    },
    [register, router]
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-3/4 lg:w-1/3 space-y-4"
      id="signup-form"
    >
      <FieldGroup className="sm:grid sm:grid-cols-2 sm:gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="name">{t('name_label')}</FieldLabel>
              <Input {...field} id="name" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="birthDate"
          control={control}
          render={({ field, fieldState }) => {
            return (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="birthDate">
                  {t('birthDate_label')}
                </FieldLabel>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start font-normal"
                    >
                      {field.value
                        ? new Date(field.value).toLocaleDateString('pt-BR')
                        : t('birthDate_placeholder')}
                    </Button>
                  </PopoverTrigger>

                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      locale={calendarLocale}
                      disabled={{
                        after: new Date(
                          new Date().getFullYear() - 13,
                          new Date().getMonth(),
                          new Date().getDate()
                        ),
                      }}
                      defaultMonth={
                        new Date(
                          new Date().getFullYear() - 13,
                          new Date().getMonth()
                        )
                      }
                      mode="single"
                      selected={field.value ?? undefined}
                      onSelect={(d) => field.onChange(d ?? null)}
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )
          }}
        />
      </FieldGroup>

      <FieldGroup>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="email">{t('email_label')}</FieldLabel>
              <Input {...field} id="email" aria-invalid={fieldState.invalid} />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="password">{t('password_label')}</FieldLabel>
              <Input
                type="password"
                {...field}
                id="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>

      {error && <ErrorLabel text={t('errors.default')} />}

      <Field className={cn(!isValid && 'cursor-not-allowed')}>
        <Button
          variant="default"
          disabled={!isValid}
          className="tracking-wider transition-all ease-in-out duration-300 w-full enabled:cursor-pointer enabled:hover:bg-main enabled:bg-main-foreground"
          type="submit"
          isLoading={loading}
          form="signup-form"
        >
          {t('submit_button')}
        </Button>
      </Field>

      <div className="text-center">
        <span>
          Já possui uma conta?{' '}
          <Link href="/login">
            <span className="underline">Faça login</span>
          </Link>
        </span>
      </div>
    </form>
  )
}
