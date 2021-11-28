import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/sign',
		component: () => import('../components/auth/sign')
	},
	{
		path: '/about',
		name: 'About',
		component: () => import('../views/About.vue')
	},
	{
		path: '/board',
		name: 'Board',
		component: () => import('../views/board')
	},
	{
		path: '/xxx',
		name: 'xxx',
		component: () => import('../views/xxx.vue')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
