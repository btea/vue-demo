<template>
    <div class="container">
        <div id="chart" style="width: 600px; height: 300px;"></div>
        <ul>
            <li>title：<input type="text" v-model="title"></li>
            <li>番剧：<input type="number" v-model="fanju"></li>
            <li>国创: <input type="number" v-model="guochuang"></li>
            <li>音乐：<input type="number" v-model="yinyue"></li>
            <li>电影: <input type="number" v-model="dainying"></li>
            <li>直播：<input type="number" v-model="zhibo"></li>
            <li>绘画: <input type="number" v-model="huihua"></li>
        </ul>
    </div>
</template>

<script>
import echarts from 'echarts';

export default {
    data: function(){
        return {
            title: 'echart图表',
            legend: ['数量','人数'],
            xAxisData: ["番剧","国创","音乐","电影","直播","绘画"],
            type: 'line',
            fanju: 5,
            guochuang: 20,
            yinyue: 36,
            dainying: 10,
            zhibo: 10,
            huihua: 20
        }
    },
    methods: {
        render: function(){
            var chart = document.getElementById('chart');
            var myChart = echarts.init(chart);
            var option = {
                title: {
                    text: this.title
                },
                tooltip: {},
                legend: {
                    data: this.legend
                },
                xAxis: {
                    data: this.xAxisData
                },
                yAxis: {},
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        data: [this.fanju, this.guochuang, this.yinyue, this.dainying, this.zhibo, this.huihua],
                        itemStyle: {
                            color: '#66ccff'
                        }
                    },
                    {
                        name: '人数',
                        type: 'bar',
                        data: [20,50,70,78,12,13],
                        itemStyle: {
                            color: 'yellow'
                        }
                    }
                ]
            };
            myChart.setOption(option);
        }
    },
    mounted: function(){
        this.render();
    },
    watch: {
        title(to,from){
            this.render();
        },
        fanju(){this.render();},
        guochuang(){this.render();},
        yinyue(){this.render();},
        dainying(){this.render();},
        zhibo(){this.render();},
        huihua(){this.render();}
    }    
}
</script>
<style lang="less" scoped>
    .container{
        ul,li{
            margin: 0; 
            padding: 0;
            list-style: none;
        }

    }
</style>



