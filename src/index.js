import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'

import Home from './home'
import router from './router/route'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        count: 0
    },
    // mutation必须是同步函数
    mutations: {
        increment(state){
            state.count++
        },
        reduce(state){
            state.count--
        }
    },
    actions: {
        incrementAsync({state,commit,rootState}){
            console.log(state);
            console.log(rootState);
            setTimeout(() => {
                commit('increment')
            },1000)
        },
        incrementAsync1(context){
            setTimeout(() => {
                context.commit('increment')
            },1000)
        }
    }
})

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Home)
})
// new Vue({
//     store,
//     router,
//     el: '#app',
//     template: '<Home/>',
//     components: Home
// })