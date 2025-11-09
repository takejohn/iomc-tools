import Fastify from 'fastify';
import dotenv from 'dotenv';
import path from 'node:path';
import fastifyStatic from '@fastify/static';
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import { apiRoute } from './routes/api.js';
import { getConfig } from './utils/config.js';

dotenv.config();

const app = Fastify({ logger: true });
const port = Number(getConfig('PORT')) || 3000;

app.register(import('@fastify/cors'), {
	origin: true,
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(import('@fastify/swagger'), {
	openapi: {
		openapi: '3.0.3',
		info: {
			title: 'iomc-tools API',
			version: '0.1.0',
		},
		servers: [
			{
				url: `${getConfig('APP_ORIGIN')}/api`,
			},
		],
	},
	transform: jsonSchemaTransform,
});

app.register(import('@fastify/swagger-ui'), {
	routePrefix: '/api-doc',
});

app.register(apiRoute, { prefix: '/api' });

const frontendDist = path.resolve(import.meta.dirname, '../../frontend/dist');
app.register(fastifyStatic, {
	root: frontendDist,
	prefix: '/',
});

app.setNotFoundHandler((req, reply) => {
	if (req.raw.url?.startsWith('/api')) {
		reply.status(404).send({ error: 'Not Found' });
	}
	else {
		reply.sendFile('index.html');
	}
});

app.listen({ port, host: '0.0.0.0' }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	app.log.info(`Server running at ${address}`);
});
