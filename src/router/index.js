import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '@/views/Home.vue'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/sign',
		component: () => import('@/components/auth/sign')
	},
	{
		path: '/board',
		component: () => import('@/views/board')
	},
	{
		path: '/board/:info',
		component: () => import('@/views/board/info')
	},
	{
		path: '/board/:info/:article',
		component: () => import('@/views/board/article')
	},
	{
		path: '/admin',
		component: () => import('@/views/admin')
	},
	{
		path: '*',
		name: 'error',
		component: () => import('../views/error')
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

export default router
