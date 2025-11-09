// @ts-check

import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import rootConfig from '../../eslint.config.js';

export default defineConfigWithVueTs([
	rootConfig,
	pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,
	{
		ignores: [
			'dist',
		],
	},
	{
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			'vue/multi-word-component-names': 'off',
		},
		files: [
			'eslint.config.js',
			'vite.config.ts',
			'src/**/*.{ts,vue}',
		],
	},
]);
