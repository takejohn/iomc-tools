// @ts-check

import { defineConfig } from 'eslint/config';
import globals from 'globals';
import rootConfig from '../../eslint.config.js';

export default defineConfig([
	rootConfig,
	{
		ignores: [
			'dist',
		],
	},
	{
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
			},
			globals: {
				...globals.node,
			},
		},
		files: [
			'eslint.config.js',
			'src/**/*.ts',
		],
	},
]);
