import Vue from 'vue'
import home from './home'
import router from './router/route'


var app = new Vue({
    el: '#app',
    router,
    render: h => h(home)
})