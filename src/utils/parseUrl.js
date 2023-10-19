import { languages } from './langs'

export default function parseUrl(url) {
  let urlToArray = url?.split('/')
  let defaultLang = 'en'
  let isKnownLang = languages.some((l) => l === urlToArray?.[0])
  let currentLang = url && isKnownLang ? urlToArray[0] : defaultLang
  let slug = url
    ? isKnownLang
      ? urlToArray?.slice(1)?.join('/') || undefined
      : urlToArray?.join('/')
    : undefined
  let langSwitch = {}
  languages.forEach((lang) => {
    langSwitch = {
      ...langSwitch,
      [lang]: lang === 'en' ? `/${slug ?? ''}` : `/${lang}/${slug ?? ''}`,
    }
  })
  return { language: currentLang, slug, langSwitch }
}
