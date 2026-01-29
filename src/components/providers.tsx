import { NextIntlClientProvider } from 'next-intl';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <NextIntlClientProvider>
      <AntdRegistry>{children}</AntdRegistry>
    </NextIntlClientProvider>
  );
}
