const fs = require('fs');
const http = require('http');

const out = './a.js';


http.createServer((request, response) => {
    fs.readFile('./t.txt',(err, data) => {
        if(err){
            throw Error(err);
        }
        data = data.toString();
        let obj = {}, city;
        let reg = /[\u4e00-\u9fa5]+：\r\n/g;
        let arr = data.match(reg);
        obj.city = arr.map(item => {
            let key = item.replace(/：\r\n/, '');
            obj[key] = {};
            return key;
        });
        city = data.split(reg);
        city = city.slice(1);
        obj.city.map((item, i) => {
            let countys = city[i].split(/[\u4e00-\u9fa5]+：/g);
            obj[item].area = city[i].match(/[\u4e00-\u9fa5]+：/g);
            obj[item].area = obj[item].area.map(key => {
                let k = key.replace('：','');
                obj[item].children = {};
                obj[item].county = countys[i];
                return k;
            })
        });
        response.setHeader('Content-Type', 'text/palin; charset=utf-8');
        response.end(JSON.stringify(obj));
        // console.log(obj);
    })
}).listen(2233);

