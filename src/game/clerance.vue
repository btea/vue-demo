<template>
    <div>
        <div class="container">
            <!-- 事件绑定既要传参又要阻止默认事件 @contextmenu="mark(index, $event)" 也可以采用如下写法；同时绑定多个事件时，可以使用对象语法v-on{event: fun, event: fun}-->
            <div v-for="(cell,index) in gridNum" :key="index" :class="{goal: position.includes(index),blue: clickList[index].clicked, mark: clickList[index].mark}" @click="around(index,'i')" @contextmenu.prevent="mark(index)"></div>
        </div>
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
    console.log($arr);
}
cells = new Array(100).fill(null);
export default {
    data: function(){
        return {
            num: 10, // 雷的个数
            gridNum: cells,// 总共格子数
            position: $arr, // 埋雷的位置
            total: 0, // 每点击一次周围辐射的元素的总和（即模拟点击的元素个数）
            clickedTotal: 0, // 已经被点击的方格的总和
            areaNum: 10, // 每次点击最多辐射周围的方格数
            clickList: (function(arr){
                for(var i = 0; i < 100; i++){
                    arr.push({clicked: false,mark: false})
                }
                return arr;
            })([])
        }
    },
    mounted: function(){
        this.doc = document.getElementsByClassName('container')[0].childNodes;
        console.log('sweeping');
        console.log(this.$store.state);
    },
    methods: {
        mark: function(i, e){ // 右键标记，用来标记雷的位置
            // e.preventDefault(); 采用传参$event时需要这一步操作
            if(this.clickList[i].clicked){ return}
            if(this.clickList[i].mark){
                // 已被标记，继续右键标记，返回之前的状态？
                return;
            }
            this.clickList[i].mark = true;
            // this.doc[i].style.background = 'red';
            this.isWin();
        },
        random: function(max, min){
            return Math.floor(Math.random() *(max- min + 1) + min);
        },
        around: function(i, ele){
            if(this.position.includes(i)){
                alert('you are dead!');
                location.reload();
            }
            var isClick = this.clickList[i].clicked;
            if(isClick) return;
            // ele有值表明是鼠标点击，而不是点击元素辐射周围产生的结果
            if(ele){
                this.total = 0; 
                this.areaNum = this.random(15,0);
            }
            this.eightValidate(i);
            this.clickList[i].clicked = true;
            this.isWin();
        },
        isWin: function(){
            var self = this;
            var allMark = self.position.every(item => {
                return self.clickList[item].mark
            })
            this.clickedTotal = 0;
            self.clickList.forEach(cli => {
                if(cli.clicked){this.clickedTotal++;}
            })
            // console.log(allClick);
            if(allMark || this.clickedTotal === 90){
                /**
                 * 获胜之后可添加一些动画或者背景音乐
                */
                alert('you are win!')
            }
        },
        eightValidate: function(index){
            /**
             * filter {}
             * index => 点击的元素
             * filter_arr 剔除已经点击过的元素之后
             * _arr 剔除存在于周围的雷数量之后存在的
            */
            var filter = this.areaGrid(index);
            if(!filter){return;}
            this.randomSwitch(filter.index, filter['filter_arr'], filter['_arr']);
        },
        // 获取点击元素周围的元素
        areaGrid: function(index){
            index = Number(index);
            if(index != index || !index){
                if(index != 0){
                    return ;
                }
            };
            // this.doc[index].style.background = '#6cf';
            var arr,self = this, filter_arr;
            if(index < 10){
                // 点击元素紧靠顶部 
                if(index === 0){ // 点击元素是左上角
                    arr = [index + 1, index + self.num, index + self.num + 1];
                }else if(index === 9){ // 点击元素是右上角
                    arr = [index - 1, index + self.num, index + self.num - 1];
                }else{
                    arr = [index - 1, index + 1, index + self.num, index + self.num - 1, index + self.num + 1]
                }
            }else if(Math.floor(index / 10) === 9){
                // 紧靠底部
                if(index === 90){ // 点击元素是左下角
                    arr = [index + 1, index - self.num, index - self.num + 1];
                }else if(index === 99){ // 点击元素是右下角
                    arr = [index - 1, index - self.num, index - self.num - 1];
                }else{
                    arr = [index - 1, index + 1, index - self.num, index - self.num - 1, index - self.num - 1];
                }
            }else if(index % 10 === 0 || index % 10 === 9 ){
                // 靠近左右两边且不包含角落的
                if(index % 10 === 0){
                    arr = [index + 1, index - self.num, index - self.num + 1, index + self.num, index + self.num + 1];
                    return;
                }
                arr = [index - 1, index - self.num, index - self.num - 1, index + self.num, index + self.num - 1];
            }else{
                arr = [index - 1, index + 1, index - (1 + this.num), index - this.num, index - (this.num - 1),index + (this.num - 1), index + this.num, index + (this.num + 1)];
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
                 * 可进行判断是否获取（获胜条件：1、标记出所有雷 2、所有除雷以外的位置均处于已被点击的状态）
                */
                // this.isWin();
                return 
            };
            return {index, filter_arr, _arr};
        },
        // 点击一个之后其周围的方格随机显示/隐藏
        randomSwitch: function(i, arr, _arr){
            /**
             * @param i 被点击的元素
             * @param arr 剔除被点击元素周围已点击元素之后剩余
             * @param _arr 剔除arr中埋雷的位置之后剩余的个数
             * _num 点击的元素周围存在雷的个数
             * ran 被点击元素周围辐射影响的元素
             * 
            */
            // if(isRan){
            //     return;
            // }
            if(this.total > this.areaNum){
                return ;
            }
            var _num, ran, filter,_self = this;
            _num = arr.length - _arr.length;
            if(_num){
                this.doc[i].innerText = _num;
            }
            ran = this.random(_arr.length, 0);
            if(ran){
                _arr.slice(0, ran).forEach((a) => {
                    this.total++;
                    filter = this.areaGrid(a);
                    if(filter){
                        _self.around(filter.index);
                        // _self.around(a);
                    }
                })
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
            // box-shadow: 0 0 20px red inset;
            // &.goal{
            //     color: red;
            // }
            &.blue{
                background: #6cf;
            }
            &.mark{
                background: red;
            }
        }
    }
</style>


