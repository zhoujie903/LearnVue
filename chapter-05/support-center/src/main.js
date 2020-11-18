import 'babel-polyfill'
import Vue from 'vue'
// import App from './App.vue'
import AppLayout from './components/AppLayout'
import router from './router'
import './global-components'
import state from './state'
import * as filters from './filters.js'
import VueFetch,{$fetch} from './plugins/fetch'
import VueState from './plugins/state'
Vue.use(VueFetch,{
  baseUrl:"http://localhost:3000/",
})

Vue.use(VueState, state)

for (const key in filters) {
  Vue.filter(key, filters[key])
}

Vue.config.productionTip = false




async function main() {
  try {
    state.user = await $fetch('user')
  } catch (e){
    console.warn(e)
  }

  new Vue({
    router,
    data:state,
    render: h => h(AppLayout),
  }).$mount('#app')
}

main()
