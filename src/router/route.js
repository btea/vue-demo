import Vue from 'vue';
import VueRouter from 'vue-router';


import game from '../game/clerance';
import app from '../App';
import no from '../404';

Vue.use(VueRouter);
const routes = [
    {
        path: '/app',
        component: app
    },
    {
        path: '/game',
        component: game
    },
    {
        path: '*',
        component: no
    }
];

var router = new VueRouter({
    routes
});

console.log(router);
export default router;