const dictionaries = {
  pt: () => import('@/dictionaries/pt.json').then((module) => module.default),
  es: () => import('@/dictionaries/es.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
}

export const languages = {
  pt: 'Português',
  es: 'Español',
  en: 'English',
} as const

export type Language = keyof typeof languages

export const defaultLang: Language = 'pt'

export const getDictionary = async (locale: Language) => {
  return dictionaries[locale]() ?? dictionaries.pt()
}

