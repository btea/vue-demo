<template>
	<div>
		<div class="num">{{ count }}</div>
		<button @click="add">+</button> <button @click="reduce">-</button>
		<button ref="re" @click="re">request</button>
		<div>songCount: {{ songCount }}</div>
	</div>
</template>

<script>
export default {
	/**
	 * action类似于mutation，不同之处在于：
	 * action提交的是mutation，而不是直接变更状态。
	 * action可以包含任意异步操作。
	 */
	/**
	 * 注册一个action
	 * const store = new Vuex.Store({
	 *   state: {
	 *     count: 0
	 *   },
	 *   mutations: {
	 *     increment(state){
	 *       state.count++
	 *     }
	 *   },
	 *   actions: {
	 *     increment(context){
	 *       context.commit('increment')
	 *     }
	 *   }
	 * })
	 * action函数接受一个和store实例具有相同方法和属性的context对象，因此你可以调用context.commit提交一个mutation，或者
	 * 通过context.state和context.getters来获取state和getters。
	 *
	 * action通过store.dispatch方法触发
	 */
	computed: {
		count() {
			return this.$store.state.count;
		},
		songCount() {
			return this.$store.state.songCount;
		},
	},
	methods: {
		add() {
			this.$store.dispatch('incrementAsync');
		},
		reduce() {
			this.$store.dispatch('incrementAsync1');
		},
		re() {
			this.$store.dispatch('search');
			// fetch('api/search?keywords=名侦探柯南').then(
			//     res => res.json()
			// ).then(con => {
			//     console.log(con);
			// })
		},
	},
};
</script>
