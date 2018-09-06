<template>
    <div class="container">
        <div v-for="(cell,index) in gridNum" :key="index" :class="{goal: position.includes(index)}" @click="around(index)" @contextmenu="mark(index,$event)"></div>
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
// cells = (function(arr){
//     for(var i = 0; i < 100; i++){
//         arr.push(i);
//     }
//     return arr;
// })([]);
cells = new Array(100).fill(null);
export default {
    data: function(){
        return {
            num: 10, // 雷的个数
            gridNum: cells,// 总共格子数
            position: $arr, // 埋雷的位置
            total: 0, // 每点击一次周围辐射点击的次数总和
            clickList: (function(arr){
                for(var i = 0; i < 100; i++){
                    arr.push({clicked: false})
                }
                return arr;
            })([])
        }
    },
    mounted: function(){
        this.doc = document.getElementsByClassName('container')[0].childNodes;
    },
    computed: {
        color(){

        }
    },
    methods: {
        mark: function(i, e){
            e.preventDefault();
            if(this.clickList[i].clicked){ return ;}
            this.doc[i].style.background = 'red';
        },
        random: function(max, min){
            return Math.floor(Math.random() *(max- min + 1) + min);
        },
        around: function(i){
            if(this.position.includes(i)){
                alert('you are dead!');
                location.reload();
            }
            var isClick = this.clickList[i].clicked;
            // 当点击一个方格时，其周围的情况
            if(isClick) return;
            this.eightValidate(i);
            this.clickList[i].clicked = true;
        },
        eightValidate: function(index, isRan){
            /**
             * filter {}
             * index => 点击的元素
             * filter_arr 剔除已经点击过的元素之后
             * _arr 剔除存在于周围的雷数量之后存在的
            */
            var filter = this.areaGrid(index);
            console.log(filter);
            this.randomSwitch(filter.index, filter['filter_arr'], filter['_arr'], isRan);
        },
        // 获取点击元素周围的元素
        areaGrid: function(index){
            // 获取点击元素周围的元素(特殊位置，紧靠四边侧栏，或者位于四角) 或者不管怎样，都取周围八个
            index = Number(index);
            if(index != index || !index) return;
            this.doc[index].style.background = '#6cf';
            var arr,self = this, filter_arr;
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
            }else if(index % 10 === 0 || index % 10 === 9 ){
                // 靠近左右两边且不包含角落的
                if(index % 10 === 0){
                    arr = [index, index + 1, index - self.num, index - self.num + 1, index + self.num, index + self.num + 1];
                    return;
                }
                arr = [index, index - 1, index - self.num, index - self.num - 1, index + self.num, index + self.num - 1];
            }else{
                arr = [index - 1, index, index + 1, index - (1 + this.num), index - this.num, index - (this.num - 1),index + (this.num - 1), index + this.num, index + (this.num + 1)];
            }
            /**
             * filter_arr 将已经点击过的元素剔除
            */
            filter_arr = arr.filter((a) => {
                return !self.clickList[a].clicked;
            })
             /**
             * _arr 对比埋雷的位置, 返回剔除雷之后的没有雷的位置
            */
            var _arr = filter_arr.filter(item => {
                return !self.position.includes(item);
            });
            
            if(!_arr.length){
                /**
                 * 可进行判断是否获取（获胜条件：1、标记出所有雷2、）
                */
                return ;
            };

            return {index, filter_arr, _arr};
        },
        // 点击一个之后其周围的方格随机显示/隐藏
        randomSwitch: function(i, arr, _arr, isRan){
            /**
             * _num 点击的元素周围存在雷的个数
             * ran 被点击元素周围辐射影响的元素
             * @param isRan 判断函数执行到这一步是点击执行还是点击之后辐射周围产生的效应(添加这一步之后,辐射永远只能是紧靠着元素四周的方格)
            */
            // if(isRan){
            //     return;
            // }
            if(this.total > 10){
                this.total = 0;
                return ;
            }
            var _num, ran;
            _num = arr.length - _arr.length;
            console.log(_num);
            if(_num){
                this.doc[i].innerText = _num;
            }
            ran = this.random(_arr.length, 0);
            if(ran){
                _arr.slice(0, ran).forEach((a) => {
                    this.total++;
                    this.eightValidate(a, true);
                })
            }else{
                return ;
            }
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


