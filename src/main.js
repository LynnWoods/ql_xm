import Vue from 'vue'
import App from './App'
import utils from './utils/secret.js'
import store from './store'
import i18n from './i18n'
import {ComTools} from './utils/tools.js'
import Public from './utils/public'
// import qrCode from 'qrcodejs2'
// const currentVersion = ComTools.version();//版本号

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$utils = utils
Vue.prototype.$ComTools = ComTools
Vue.prototype.$public = Public
Vue.prototype._i18n = i18n
// Vue.prototype.$qrCode = qrCode
// Vue.prototype.$current = currentVersion//版本号

const app = new Vue({
  ...App,
  i18n,
  store
})
app.$mount()
