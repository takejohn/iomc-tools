// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default defineConfig([
	eslint.configs.recommended,
	tseslint.configs.recommended,
	stylistic.configs.customize({
		indent: 'tab',
		quotes: 'single',
		semi: true,
		braceStyle: '1tbs',
		arrowParens: true,
	}),
	{
		plugins: {
			import: importPlugin,
		},
		languageOptions: {
			parserOptions: {
				tsconfigRootDir: import.meta.dirname,
			},
		},
		rules: {
			'import/extensions': [
				'error',
				'always',
				{
					ignorePackages: true,
					pattern: { js: 'always' },
				},
			],
		},
	},
]);
