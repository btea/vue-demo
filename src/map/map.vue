<template>
    <div class="container">
        <div class="float-box">
            <button @click="downloadJson('code')">下载geoJson数据</button>
            <!-- <select @change="switchArea(area)"><option :value="area" v-for="area in areaData">{{area}}</option></select> -->
            <ul class="style">
                <li 
                    v-for="s in mapStyle" 
                    :key="s.v" 
                    :class="{active: s.v === styleV}"
                    @click="mapStyleChange(s.v)"
                >{{s.name}}</li>
            </ul>
            <div class="2d-3d">
                3D<el-switch
                    v-model="is3D"
                    active-color="#66ccff"
                    inactive-color="#909399"
                    @change="mapModelSwitch"
                    >
                </el-switch>
            </div>
        </div>
        <div class="map-box">

        </div>
        <div class="chart-box">
        
        </div>
    </div>
    
</template>

<script>
import echarts from 'echarts';
export default {
    data(){
        return {
            // areaList: ['杭州市', '武汉市'],
            cityName: '中国',
            areaCode: 10000,
            geoJsonData: '',
            echartsMap: null,
            map: null,
            uimap: null,
            district: null,
            polygons: [],
            cityCode: 100000,
            citySelect: null,
            districtSelect: null,
            opts: {},
            // 地图样式配置
            mapStyle: [
                {name: '标准', v: 'normal'},{name: '幻影黑', v: 'dark'},{name: '月光银', v: 'light'},{name: '远山黛', v: 'whitesmoke'},
                {name: '草色青', v: 'fresh'},{name: '雅士灰', v: 'grey'},{name: '涂鸦', v: 'graffiti'},{name: '马卡龙', v: 'macaron'},
                {name: '靛青蓝', v: 'blue'},{name: '极夜蓝', v: 'darkblue'},{name: '酱籽', v: 'wine'}
            ],
            styleV: 'normal',
            is3D: false
        }
    },
    mounted(){
        this.mapInstance();
        this.init();
    },
    methods: {
        mapInstance(){
            //注册并赋值给echartsMap 
            this.$echarts = echarts;
            this.echartsMap = this.$echarts.init(document.getElementsByClassName('chart-box')[0]);
            console.log(this.echartsMap);
        },
        init(){
            this.renderMap();
            this.areaStroke();
            this.opts = {
                subdistrict: 1,   //返回下一级行政区
                showbiz: false  //最后一级返回街道信息
            };
            this.district = new AMap.DistrictSearch(this.opts);//注意：需要使用插件同步下发功能才能这样直接使用
            // 注：申请key时应选择web API而不是web服务，不然status会一直是'no-data'
            this.district.search('中国', (status, result) => {
                if (status == 'complete') {
                    this.getData(result.districtList[0], '', 100000);
                }
            });
        },
        mapModelSwitch(s){
            this.is3D = s;
            this.renderMap();
        },
        renderMap(){
            var map = new AMap.Map(document.getElementsByClassName('map-box')[0],
            this.is3D ?
            {
                pitch: 75, // 地图俯仰角度，有效范围 0度--83度
                viewMode: '3D' // 地图模式
            } : {}
            );
            this.map = map;
        },
        areaStroke(){
            AMap.plugin('AMap.DistrictLayer', function(){
                new AMap.DistrictLayer.Province({
                    zIndex:12,
                    adcode:['130000'],
                    depth:2,
                    styles:{
                        'fill':function(properties){
                            console.log(properties);
                            console.log(getColorByAdcode);
                            var adcode = properties.adcode;
                            return getColorByAdcode(adcode);
                        },
                        'province-stroke':'cornflowerblue',
                        'city-stroke': 'white',//中国地级市边界
                        'county-stroke': 'rgba(255,255,255,0.5)'//中国区县边界  
                    }
                })
            })
            
        },
        mapStyleChange(v){
            this.styleV = v;
            this.map.setMapStyle(`amap://styles/${v}`);
        },
        getData(data, level, adcode) {//处理获取出来的边界数据
            var subList = data.districtList;
            if (subList) {
                var curlevel = subList[0].level;
                if (curlevel === 'street') {//为了配合echarts地图区县名称显示正常，这边街道级别数据需要特殊处理
                    let mapJsonList = this.geoJsonData.features;
                    let mapJson = {};
                    for (let i in mapJsonList) {
                        if (mapJsonList[i].properties.name == this.cityName) {
                            mapJson.features = [].concat(mapJsonList[i]);
                        }
                    }
                    this.mapData = [];
                    //这个mapData里包含每个区域的code、名称、对应的等级，实现第三步功能时能用上
                    this.mapData.push({name: this.cityName, value: Math.random() * 100, level: curlevel});
                    this.loadMap(this.cityName, mapJson);
                    this.geoJsonData = mapJson;
                    return;
                }
            
                //街道级以上的数据处理方式
                this.mapData = [];
                for (var i = 0, l = subList.length; i < l; i++) {
                    var name = subList[i].name;
                    var cityCode = subList[i].adcode;
                    //这个mapData里包含每个区域的code、名称、对应的等级，实现第三步功能时能用上
                    this.mapData.push({
                        name: name,
                        value: [subList[i].center.lng, subList[i].center.lat, Math.random() * 100],
                        cityCode: cityCode,
                        level: curlevel
                    });
                }
                this.loadMapData(adcode);
            }
        },
        loadMapData(areaCode) {
            AMapUI.loadUI(['geo/DistrictExplorer'], DistrictExplorer => {
                //创建一个实例
                var districtExplorer = window.districtExplorer = new DistrictExplorer({
                    eventSupport: true, //打开事件支持
                    map: this.map
                });
                districtExplorer.loadAreaNode(areaCode, (error, areaNode) => {
                    if (error) {
                        console.error(error);
                        return;
                    }
                    let mapJson = {};
                    //特别注意这里哦，如果查看过正常的geojson文件，都会发现，文件都是以features 字段开头的，所以这里要记得加上
                    mapJson.features = areaNode.getSubFeatures();
                    this.geoJsonData = mapJson;
                    this.loadMap(this.cityName, mapJson);
                });
            });
        },
        loadMap(mapName, data){
            if (data) {
                this.$echarts.registerMap(mapName, data);//把geoJson数据注入echarts
                //配置echarts的option
                var option = {
                    tooltip: {
                        formatter: function(v){
                            let s = '';
                            s += v.marker + v.name + ':';
                            s += Math.floor(v.data.value[2]);
                            return s;
                        },
                    },
                    geo: {
                        map: this.cityName,
                        label: {
                            show: true
                        },
                        position: ['50%', '50%']
                    },
                    visualMap: {
                        type: 'piecewise',
                        pieces: [
                            {max: 30, label: '安全', color: '#2c9a42'},
                            {min: 30, max: 60, label: '警告', color: '#d08a00'},
                            {min: 60, label: '危险', color: '#c23c33'},
                        ],
                        color: '#fff',
                        textStyle: {
                            color: '#fff',
                        },
                        visibility: 'off'
                    },
                    series: [{
                        name: '数据名称',
                        type: 'map',
                        map: this.cityName,
                        roam: false,
                        mapType: mapName,
                        selectedMode: 'single',
                        showLegendSymbol: false,
                        visibility: 'off',
                        itemStyle: {
                            normal: {
                                color: '#ccc',
                                areaColor: '#fff',
                                borderColor: '#fff',
                                borderWidth: 0.5,
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: "rgb(249, 249, 249)"
                                    }
                                }
                            },
                            emphasis: {
                                areaColor: false,
                                borderColor: '#fff',
                                areaStyle: {
                                    color: '#fff'
                                },
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: "rgb(249, 249, 249)"
                                    }
                                }
                            }
                        },
                        label: {
                            show: true
                        },
                        data: this.mapData,//这个data里包含每个区域的code、名称、对应的等级，实现第三步功能时能用上
                    },
                    {
                        type: 'scatter',
                        coordinateSystem: 'geo',
                        label: {
                            show: true,
                            color: 'aqua',
                            formatter: function(v){
                                return Math.floor(v.value[2]);
                            }
                        },
                        symbol: 'circle',
                        data: this.mapData
                    }
                    ]
                };
                console.log(option);
                this.echartsMap.setOption(option);

                // 给echarts图表绑定点击事件，实现下钻功能
                this.echartsMap.on('click', this.echartsMapClick);
            }
        },
        echartsMapClick(params) {//地图点击事件
            if (params.data.level == 'street') return;//此处的params.data为this.mapData里的数据
            this.cityCode = params.data.cityCode;
            this.cityName = params.data.cityName;
            //行政区查询
            //按照adcode进行查询可以保证数据返回的唯一性
            this.district.search(this.cityCode, (status, result) => {
                if (status === 'complete') {
                    this.getData(result.districtList[0], params.data.level, this.cityCode);//这个getData函数在前面已经定义过了
                }
            });
        },
        downloadJson(nameType) {//geo文件下载
                if (nameType === 'all') {
                    this.$ba.trackEvent('echartsMap', '文件下载', '打包下载全部');
                    this.$refs.dialog.show();
                    return;
                }
                let blob = new Blob([JSON.stringify(this.geoJsonData)], {type: "text/plain;charset=utf-8"});
                let filename = this.cityName;
                if (nameType === 'code') {
                    filename = this.cityCode;
                }
                this.loadJson(blob, filename);

                return
                this.$ba.trackEvent('echartsMap', '文件下载', filename);
                saveAs(blob, `${filename}.geoJson`);//filename
        },
        loadJson(blob, name){
            let a = document.createElement('a');
            a.href = window.URL.createObjectURL(blob);
            a.download = `${name}.geoJson`;
            a.click();
            window.URL.revokeObjectURL(a.href);
        },
        areaList(name){
            this.cityName = name;
        }
    }    
}
</script>
<style lang="less" scoped>
    .container{
        height: 800px;
        display: flex;
        position: relative;
        .map-box,.chart-box{
            flex: 1;
            height: 100%;
        }
        .chart-box{
            background: #66ccff75;
        }
        .float-box{
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 10;
            background: #fff;
            .style{
                padding: 0;
                margin: 0;
                li{
                    list-style: none;
                    display: inline-block;
                    height: 25px;
                    line-height: 25px;
                    cursor: pointer;
                    font-size: 12px;
                    margin: 5px 10px;
                    padding: 0 5px;
                    border-radius: 15px;
                    &:hover{
                        background: #99999985;
                    }
                    &.active{
                        color: aqua;
                    }
                }
            }
        }
    }
</style>