<template>
	<div class="container">
		<div class="app">this is a app</div>
		<e-line></e-line>
		<br />
		<textarea @input="changeHeight" ref="text"></textarea>
		<div class="box" v-demo></div>

		<div class="scroll">
			Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quos, at. Nobis possimus laboriosam totam,
			corrupti quasi voluptatem esse explicabo laborum voluptatum pariatur eveniet, quaerat aperiam culpa
			necessitatibus architecto, odio iure.
		</div>
		<eva-icon name="github" animation="pulse" fill="limegreen"></eva-icon>
		<eva-icon name="charging" animation="shake" fill="aqua"></eva-icon>
	</div>
</template>

<script>
import line from './echart/line';

export default {
	data: function () {
		return {
			height: 150,
			scrollHeight: 0,
			len: 0,
		};
	},
	mounted: function () {
		var [a, b] = [1, 2];
		var c = () => {
			console.log('this is a arrow function');
		};
		c();
	},
	methods: {
		changeHeight: function (e) {
			var target = e.target,
				text = target.value,
				scrollHeight;
			var h;
			if (text.length < this.len) {
				target.style.height = `${this.height}px`;
				scrollHeight = target.scrollHeight;
				if (scrollHeight > this.height) {
					target.style.height = `${scrollHeight}px`;
				}
				// h = 150;
			} else {
				scrollHeight = target.scrollHeight;
				h = scrollHeight + 2;
				target.style.height = `${h}px`;
			}
			this.len = text.length;
			// scrollHeight = target.scrollHeight;
			// target.style.height = scrollHeight + 2;
			// target.style.height = `${h}px`;
		},
	},
	components: {
		'e-line': line,
	},
};
</script>

<style lang="less" scoped>
::-webkit-scrollbar {
	width: 5px;
	background: yellow;
}
::-webkit-scrollbar-thumb {
	background: gray;
	height: 30px;
}
.container {
	.app {
		color: #6cf;
	}
	textarea {
		width: 300px;
		height: 150px;
		border-radius: 10px;
		border: 1px solid #6cf;
		resize: none;
		outline: none;
		margin: 0;
		padding: 0;
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		overflow: hidden;
		font-size: 25px;
		white-space: pre-wrap;
	}
	.scroll {
		width: 200px;
		height: 100px;
		overflow: auto;
		&:hover {
			&::-webkit-scrollbar {
				width: 5px;
				background-color: #6cf;
			}
			&::-webkit-scrollbar-thumb {
				width: 5px;
				height: 20px;
				border-radius: 5px;
				background: red;
			}
		}
	}
}
</style>
