// @ts-check

import { defineConfig } from 'eslint/config';
import globals from 'globals';
import rootConfig from '../../eslintrc.config.js';

export default defineConfig([
	rootConfig,
	{
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
			}
			globals: {
				...globals.node,
			},
		},
	},
]);
