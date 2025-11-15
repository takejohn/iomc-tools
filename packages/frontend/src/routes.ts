import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import HomePage from './pages/HomePage.vue';
import LoginPage from './pages/LoginPage.vue';
import StorageSearchPage from './pages/StorageSearchPage.vue';

const routes: readonly RouteRecordRaw[] = [
	{ path: '/', component: HomePage },
	{ path: '/login', component: LoginPage },
	{ path: '/storage-search', component: StorageSearchPage },
];

export const router = createRouter({
	history: createWebHistory(),
	routes,
});
