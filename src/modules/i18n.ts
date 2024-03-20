import { createI18n } from 'vue-i18n'
import tw from '@/locales/tw.json'
import en from '@/locales/en.json'

type MessageSchema = typeof tw | typeof en

const i18n = createI18n<[MessageSchema], 'en-US' | 'zh-TW'>({
    locale: localStorage.getItem('lang') ?? 'zh-TW',
    legacy: false,
    messages: {
        "zh-TW": tw,
        "en-US": en
    }
})

export default i18n

