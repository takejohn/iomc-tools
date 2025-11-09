import { FastifyPluginAsync } from 'fastify';
import { pingRoutes } from './api/ping';
import { authRoutes } from './api/auth';

export const apiRoute: FastifyPluginAsync = async (fastify) => {
	await fastify.register(pingRoutes);
	await fastify.register(authRoutes, { prefix: '/auth' });
};
