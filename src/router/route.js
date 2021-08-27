import Vue from 'vue';
import VueRouter from 'vue-router';

import game from '../game/clerance';
import app from '../App';
import no from '../404';
import vuexs from '../vuex/vuex';
import action from '../vuex/action';
import map from '../map/map';

Vue.use(VueRouter);
const routes = [
	{
		path: '/',
		redirect: '/app',
	},
	{
		path: '/app',
		component: app,
	},
	{
		path: '/game',
		component: game,
	},
	{
		path: '/vuexs',
		component: vuexs,
		children: [
			{
				path: 'action',
				component: action,
			},
		],
	},
	{
		path: '/map',
		component: map,
	},
	{
		path: '*',
		component: no,
	},
];

var router = new VueRouter({
	routes,
});
export default router;
