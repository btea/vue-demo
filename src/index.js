import Vue from 'vue'
import 'es6-promise/auto'
import Vuex from 'vuex'

import Home from './home'
import router from './router/route'

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        count: 0,
        songCount: 0,
        songs: []
    },
    // mutation必须是同步函数
    mutations: {
        increment(state){
            state.count++
        },
        reduce(state){
            state.count--
        },
        count(state,con){
            state.songCount = con.data.songCount;
            state.songs = con.data.songs;
        },
        // count(state,con){
        //     state.songCount = con.songCount;
        //     state.songs = con.songs;
        // }
    },
    actions: {
        // search(context){
        //     fetch('api/search?keywords=名侦探柯南').then(
        //         res => res.json()
        //     ).then(con => {
        //         context.commit('count',con.result);
        //         console.log(con);
        //     })
        // },
        search({commit}){
            fetch('api/search?keywords=名侦探柯南').then(
                res => res.json()
            ).then(con => {
                // commit('count',con.result)
                commit({
                    type: 'count',
                    data: con.result
                })
            })
        },
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
//1 添加全局变量的方法，在Vue的原型对象上添加
Vue.prototype.z = 'zeng';
Vue.prototype.y = 'you';

//2 可以写一个单独保存变量的vue文件

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