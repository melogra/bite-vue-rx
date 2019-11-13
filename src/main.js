import Vue from 'vue'
import App from './App.vue'
import VueRx from 'vue-rx'
import ElementUI from 'element-ui'
import VueCompositionApi from '@vue/composition-api';
import 'element-ui/lib/theme-chalk/index.css'


Vue.config.productionTip = false
Vue.use(VueRx)
Vue.use(VueCompositionApi)
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')
