import { FastifyPluginAsync } from 'fastify';
import { authStartRoutes } from './auth/start.js';
import { authCallbackRoutes } from './auth/callback.js';

export const authRoutes: FastifyPluginAsync = async (fastify) => {
	await fastify.register(authStartRoutes);
	await fastify.register(authCallbackRoutes);
};
