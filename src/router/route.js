import Vue from 'vue';
import VueRouter from 'vue-router';

import home from '../home';
import game from '../game/clerance';
import app from '../App';

Vue.use(VueRouter);
const routes = [
    {
        path: '/home',
        component: home
    },
    {
        path: '/app',
        component: app
    },
    {
        path: '/game',
        component: game
    },
    {
        path: '/',
        redirect: '/app'
    }
];

var router = new VueRouter({
    routes
});

console.log(router);
export default router;