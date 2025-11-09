import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';

const routes: readonly RouteRecordRaw[] = [
	{ path: '/', component: HomePage },
	{ path: '/login', component: LoginPage },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
