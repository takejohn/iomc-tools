import createClient from 'openapi-fetch';
import type { components, paths } from './schema.js';

export type schemas = components['schemas'];

export const apiClient = createClient<paths>({
	baseUrl: '/api',
});
