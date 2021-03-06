import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import './assets/style.scss' // imports scss styles

new Vue({
  render: h => h(App)
}).$mount('#app')
