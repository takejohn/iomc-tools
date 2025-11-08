// @ts-check

import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';
import rootConfig from '../../eslintrc.config.js';

export default defineConfigWithVueTs([
	rootConfig,
	pluginVue.configs['flat/essential'],
	vueTsConfigs.recommended,
	{
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
				ecmaVersion: 'latest',
				sourceType: 'module',
			},
		},
		rules: {
			"vue/multi-word-component-names": "off"
		}
	}
]);
