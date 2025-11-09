import { FastifyPluginAsync } from 'fastify';
import { pingRoutes } from './api/ping.js';
import { authRoutes } from './api/auth.js';

export const apiRoute: FastifyPluginAsync = async (fastify) => {
	await fastify.register(pingRoutes);
	await fastify.register(authRoutes, { prefix: '/auth' });
};
