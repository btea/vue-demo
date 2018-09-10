<template>
    <div>
        <div>{{count}}</div>
        <button @click="add">+</button>
        <button @click="reduce">-</button>
        <router-link to="/vuexs/action">action</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    computed: {
        count(){
            return this.$store.state.count;
        }
    },
    methods: {
        // 当触发一个类型为add的mutation时，调用此函数。
        // 可以向store.commit传入额外的参数，即mutation的载荷(payload)
        // this.$store.commit(type,[para])
        // 在大多数情况下，载荷应该是一个对象，这样可以含多个字段并且记录的mutation会更易读
        /**
         * mutations:{
         *   increment(state,payload){
         *     state.count += payload.amount
         *   }
         * } 
         * store.commit('increment',{
         *   amount: 10
         * })
        */
       /**
        * 对象风格的提交方式
        * 提交mutation的另外一种方式是直接使用包含type属性的对象：
        * store.commit({
        *   type: 'increment',
        *   amount: 10
        * })
        * 当时用对象风格提交方式，整个对象作为载荷传给mutation函数，因为handler保持不变：
        * mutations: {
        *   increment(state,payload){
        *      state.count += payload.amount
        *   }
        * }
       */
        /**
         * mutation必须是同步函数
        */
        add(){
            this.$store.commit('increment');
        },
        reduce(){
            this.$store.commit('reduce');
        },
    }
}
</script>
