import Vue from 'vue'
import App from './app.vue'
import index from 'index.js'

Vue.use(index.CustomTable)
Vue.use(index.CustomTableWithSlot)
Vue.use(index.ExpendTable)

new Vue({
    el: '#app',
    render: h => h(App)
})
