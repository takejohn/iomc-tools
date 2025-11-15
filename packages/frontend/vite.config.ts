import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import tailwindcss from '@tailwindcss/vite';

dotenv.config({ path: '../../.env' });

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), tailwindcss()],
	server: {
		allowedHosts: process.env.APP_ORIGIN ? [new URL(process.env.APP_ORIGIN).host] : [],
		proxy: {
			'/api': 'http://localhost:3000',
		},
	},
});
