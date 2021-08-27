<template>
	<div class="container">
		<div id="chart" style="width: 600px; height: 300px"></div>
		<ul>
			<li>title：<input type="text" v-model="title" /></li>
			<li>番剧：<input type="number" v-model="fanju" /></li>
			<li>国创: <input type="number" v-model="guochuang" /></li>
			<li>音乐：<input type="number" v-model="yinyue" /></li>
			<li>电影: <input type="number" v-model="dainying" /></li>
			<li>直播：<input type="number" v-model="zhibo" /></li>
			<li>绘画: <input type="number" v-model="huihua" /></li>
		</ul>
		<div class="arr" @click="arrChange">验证watch数组</div>
	</div>
</template>

<script>
import echarts from 'echarts';
import zsay from '../globalVariable';

export default {
	data: function () {
		return {
			title: 'echart图表',
			legend: ['数量', '人数'],
			xAxisData: ['番剧', '国创', '音乐', '电影', '直播', '绘画'],
			type: 'line',
			fanju: 5,
			guochuang: 20,
			yinyue: 36,
			dainying: 10,
			zhibo: 10,
			huihua: 20,
			arr: [1, 2, 3, [[10], 4, 5]],
			obj: {
				a: 1,
			},
		};
	},
	methods: {
		render: function () {
			var chart = document.getElementById('chart');
			var myChart = echarts.init(chart);
			var option = {
				title: {
					text: this.title,
				},
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow',
					},
				},
				legend: {
					data: this.legend,
				},
				xAxis: {
					data: this.xAxisData,
					axisLabel: {
						margin: 20,
						align: 'center',
					},
				},
				yAxis: {},
				series: [
					{
						name: '数量',
						type: 'bar',
						data: [this.fanju, this.guochuang, this.yinyue, this.dainying, this.zhibo, this.huihua],
						itemStyle: {
							color: '#66ccff',
						},
					},
					{
						name: '人数',
						type: 'bar',
						data: [20, 50, 70, 78, 12, 13],
						itemStyle: {
							color: 'yellow',
						},
					},
				],
			};
			myChart.setOption(option);
		},
		arrChange() {
			this.obj.a = 10;
			this.arr[3][0].push(4);
		},
	},
	mounted: function () {
		console.log('this', this);
		console.log(this.z);
		console.log(zsay.say());
		this.render();
		let str =
			'from=en&to=zh&query=rails&transtype=realtime&simple_means_flag=3&sign=515528.212729&token=583e224a495ff615f66fc75fa232f71b';
		str = str.split('&');
		let obj = {};
		str.forEach(item => {
			let arr = item.split('=');
			obj[arr[0]] = arr[1];
		});
		// let opt = {
		//     method: 'POST',
		//     body: obj,
		//     headers: {
		//         'Accept': 'application/json',
		//         'Content-type': 'application/json'
		//     }
		// }
		// fetch('/api',opt).then(response => {
		//     return response.text();
		// }).then(text => {
		//     console.log(text);
		// }).catch(err => {
		//     console.log(err);
		// })
	},
	watch: {
		title(to, from) {
			this.render();
		},
		fanju() {
			this.render();
		},
		guochuang() {
			this.render();
		},
		yinyue() {
			this.render();
		},
		dainying() {
			this.render();
		},
		zhibo() {
			this.render();
		},
		huihua() {
			this.render();
		},
		// watch能监听数组，也能监听多维数组
		arr(to, from) {
			console.log(to);
		},
		// watch不能监听对象
		obj(to, from) {
			console.log(to);
		},
	},
};
</script>
<style lang="less" scoped>
.container {
	ul,
	li {
		margin: 0;
		padding: 0;
		list-style: none;
	}
}
</style>
