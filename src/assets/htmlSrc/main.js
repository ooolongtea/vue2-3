import Vue from 'vue'
import VueMeta from 'vue-meta';
import App from './App.vue'

import BaseHead from './components/BaseHead.vue'

Vue.config.productionTip = false
Vue.config.devtools = true
Vue.use(VueMeta);
Vue.component('BaseHead', BaseHead)
new Vue({
  render: h => h(App),
}).$mount('#app')
