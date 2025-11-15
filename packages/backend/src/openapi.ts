import type { OpenAPI } from 'openapi-types';
import { createApp } from './app.js';

export async function getOpenAPISpec(): Promise<OpenAPI.Document> {
	const app = createApp();
	await app.ready();
	return app.swagger();
}
