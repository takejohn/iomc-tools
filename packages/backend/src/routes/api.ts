import { FastifyPluginAsync } from 'fastify';
import { pingRoute } from './api/ping';

export const apiRoute: FastifyPluginAsync = async (fastify) => {
	await fastify.register(pingRoute);
};
