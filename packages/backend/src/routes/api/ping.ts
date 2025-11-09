import { FastifyPluginAsync } from 'fastify';
import z from 'zod';

export const pingRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.get('/ping', {
		schema: {
			response: {
				200: z.object({
					ok: z.literal(true),
					time: z.string(),
				}).describe('OK'),
				500: z.object({
					ok: z.literal(false),
				}).describe('Internal Server Error'),
			},
		},
	}, async (_req, reply) => {
		try {
			reply.send({ ok: true, time: (new Date()).toString() });
		}
		catch (err) {
			fastify.log.error(err);
			reply.status(500).send({ ok: false });
		}
	});
};
