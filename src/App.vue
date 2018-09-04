<template>
    <div class="container">
        <div class="app">this is a app</div>
        <br>
        <textarea @input = "changeHeight" ref="text"></textarea>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            height: 150,
            scrollHeight: 0,
            len: 0
        }
    },
    mounted: function(){
        var [a,b] = [1,2];
        console.log(a);
        console.log(b);
        var c = () => {
            console.log('this is a arrow function');
        }
        c();
    },
    methods: {
        changeHeight: function(e){
            var target = e.target,
                text = target.value,
                scrollHeight;
                console.log(target.style);
            if(text.length < this.len){
                target.style.height = 150;
            }    
            this.len = text.length;
            scrollHeight = target.scrollHeight;
            target.style.height = scrollHeight + 2;
            console.log(target);
            console.log(target.style.height);
        }
    }
}
</script>

<style lang="less" scoped>
    .container{
        .app{
            color: #6cf;
        }
        textarea{
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
    }
</style>


