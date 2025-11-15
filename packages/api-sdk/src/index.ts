import createClient from 'openapi-fetch';
import type { paths } from './schema.js';

export const apiClient = createClient<paths>({
	baseUrl: '/api',
});
