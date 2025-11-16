import Fastify, { FastifyInstance, FastifyReply, FastifyRequest, RouteHandlerMethod } from 'fastify';
import path from 'node:path';
import fastifyStatic from '@fastify/static';
import { jsonSchemaTransform, jsonSchemaTransformObject, serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import fastifyCookie from '@fastify/cookie';
import fastifyJwt from '@fastify/jwt';

import { apiRoute } from './routes/api.js';
import { getConfigRequired } from './utils/config.js';

export function createApp(): FastifyInstance {
	const app = Fastify({ logger: true });

	app.register(import('@fastify/cors'), {
		origin: true,
	});

	app.register(fastifyCookie, {
		secret: getConfigRequired('COOKIE_SECRET'),
		hook: 'onRequest',
	});

	app.register(fastifyJwt, {
		secret: getConfigRequired('JWT_SECRET')!,
		cookie: {
			cookieName: 'auth',
			signed: false,
		},
	});

	app.decorate('auth', async (req: FastifyRequest, reply: FastifyReply) => {
		try {
			await req.jwtVerify();
		} catch {
			reply.code(401).send({ error: 'Unauthorized' });
		}
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
					url: `${getConfigRequired('APP_ORIGIN')}/api`,
				},
			],
		},
		transform: jsonSchemaTransform,
		transformObject: jsonSchemaTransformObject,
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

	app.setNotFoundHandler(notFoundHandler);

	return app;
}

const notFoundHandler: RouteHandlerMethod = (req, reply) => {
	if (req.raw.url?.startsWith('/api')) {
		reply.status(404).send({ error: 'Not Found' });
	} else {
		reply.sendFile('index.html');
	}
};
