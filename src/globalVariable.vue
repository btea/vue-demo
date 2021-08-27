<script>
let name = 'z';

let date = () => {
	return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][new Date().getDay()];
};

let say = () => {
	return `${name} say: 'today is  ${date()}.'`;
};

export default {
	say,
};
</script>
