import { FastifyPluginAsync } from 'fastify';
import { authStartRoutes } from './auth/start';
import { authCallbackRoutes } from './auth/callback';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
	await fastify.register(authStartRoutes);
	await fastify.register(authCallbackRoutes);
};
