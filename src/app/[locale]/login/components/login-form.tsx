'use client';

import { loginSchema, LoginSchemaData } from '@/src/lib';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Input } from 'antd';
import { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';

export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback((data: LoginSchemaData) => {
    console.log(data);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label>E-mail</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>

      <div>
        <label>Senha</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </div>

      <Button type="primary" className="w-full" htmlType="submit">
        Enviar
      </Button>
    </form>
  );
}
