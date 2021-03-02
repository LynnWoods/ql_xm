import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enUS from './en-US'
import zhCN from './zh-CN'
Vue.use(VueI18n)

let lang = uni.getStorageSync('_lang')
if (!lang || lang === 'System') {
    const res = uni.getSystemInfoSync()
    lang = res.language
    uni.setStorageSync('_lang', 'System')
}
const i18n = new VueI18n({
    locale: lang,
    fallbackLocale: 'en_us',
    silentFallbackWarn: true,
    messages: {
        'en_us': enUS,
        'zh_cn': zhCN
    }
})
export default i18n
