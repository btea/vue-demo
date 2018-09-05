<template>
    <div class="container">
        <div v-for="(cell,index) in gridNum" :key="index" :class="{goal: position.includes(index)}" @click="around(index)">{{cell}}</div>
    </div>
</template>

<script>
 var arr = new Array(100).fill(0),$arr = [],cells;
arr.forEach((a,i) => {
    arr[i] = i;
});
for(var i = 0; i < 10; i++){
    var index = Math.floor(Math.random()*(arr.length + 1) + 0);
    $arr = $arr.concat(arr.splice(index,1));
}
cells = (function(arr){
    for(var i = 0; i < 100; i++){
        arr.push(i);
    }
    return arr;
})([]);
export default {
    data: function(){
        return {
            num: 10, // 雷的个数
            gridNum: cells,// 总共格子数
            position: $arr, // 埋雷的位置
        }
    },
    methods: {
        around: function(i){
            // 当点击一个方格时，其周围的情况
            if(this.position.includes(i)){
                alert('you are dead!');
                return ;
            }
            this.eightValidate(i);
        },
        eightValidate: function(index){
            // 获取点击元素周围的元素(特殊位置，紧靠四边侧栏，或者位于四角) 或者不管怎样，都取周围八个
            index = Number(index);
            if(index != index || !index) return;
            var arr,self = this;
            var arr;
            if(index < 10){
                // 紧靠顶部
                if(index === 0){
                    arr = [index, index + 1, index + self.num, index + self.num + 1];
                }else if(index === 9){
                    arr = [index, index - 1, index + self.num, index + self.num - 1];
                }else{
                    arr = [index, index - 1, index + 1, index + self.num, index + self.num - 1, index + self.num + 1]
                }
            }else if(Math.floor(index / 10) === 9){
                // 紧靠底部
                if(index === 90){
                    arr = [index, index + 1, index - self.num, index - self.num + 1];
                }else if(index === 99){
                    arr = [index, index - 1, index - self.num, index - self.num - 1];
                }else{
                    arr = [index, index - 1, index + 1, index - self.num, index - self.num - 1, index - self.num - 1];
                }
            }else if(index / 10 === 0 || index % 10 === 9 ){
                // 靠近左右两边且不包含角落的
                if(index / 10 === 0){
                    arr = [index, index + 1, index - self.num, index - self.num + 1, index + self.num, index + self.num + 1];
                    return;
                }
                arr = [index, index - 1, index - self.num, index - self.num - 1, index + self.num, index + self.num - 1];
            }else{
                arr = [index - 1, index, index + 1, index - (1 + this.num), index - this.num, index - (this.num - 1),index + (this.num - 1), index + this.num, index + (this.num + 1)];
            }
            console.log(arr);
            var _arr = arr.filter(item => {
                console.log(item);
                return self.gridNum.includes(item);
            });
        }
    }
}
</script>


<style lang="less" scoped>
    .container{
        box-sizing: border-box;
        margin: 0 auto;
        width: 420px;
        height: 420px;
        div{
            width: 40px;
            height: 40px;
            box-sizing: border-box;
            float: left;
            margin: 1px;
            background: #eeeeee;
            text-align: center;
            line-height: 40px;
            vertical-align: middle;
            cursor: pointer;
            &.goal{
                color: red;
            }
        }
    }
</style>


