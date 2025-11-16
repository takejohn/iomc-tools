import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';

export const authLogoutRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.withTypeProvider<ZodTypeProvider>().post('/logout', {
		schema: {
			response: {
				204: z.never().describe('No Content'),
			},
		},
	}, async (_req, reply) => {
		reply.clearCookie('auth', {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			path: '/',
		});
		return reply.status(204).send();
	});
};
