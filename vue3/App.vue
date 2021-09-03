<template>
	<div class="box">
		<el-button type="primary">按钮</el-button>
		<el-select-v2 v-model="value" :options="options" placeholder="请选择" style="width: 200px" />
		<el-timeline>
			<el-timeline-item v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp">
				{{ activity.content }}
			</el-timeline-item>
		</el-timeline>
		<el-radio-group v-model="radio">
			<el-radio :label="3">备选项</el-radio>
			<el-radio :label="6">备选项</el-radio>
			<el-radio :label="9">备选项</el-radio>
		</el-radio-group>
	</div>
</template>
<script setup>
import { ElButton, ElSelectV2, ElTimelineItem, ElTimeline, ElRadioGroup, ElRadio, ElMessageBox } from 'element-plus';
import { ref, reactive } from 'vue';
const value = ref('');
const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
const options = reactive(
	Array.from({ length: 1000 }).map((_, idx) => ({
		value: `选项${idx + 1}`,
		label: `${initials[idx % 10]}${idx}`,
	}))
);
const activities = reactive([
	{
		content: '活动按期开始',
		timestamp: '2018-04-15',
	},
	{
		content: '通过审核',
		timestamp: '2018-04-13',
	},
	{
		content: '创建成功',
		timestamp: '2018-04-11',
	},
]);
const radio = ref(3);
</script>
