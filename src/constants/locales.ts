export type Locales = 'en-US' | 'pt-BR';
export const locales: Locales[] = ['en-US', 'pt-BR'];

export const localesMap: Record<Locales, Locales> = {
  'en-US': 'pt-BR',
  'pt-BR': 'en-US',
};
