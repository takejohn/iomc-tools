import { FastifyPluginAsync } from 'fastify';
import { randomUUID } from 'crypto';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { getConfig } from '../../../utils/config.js';

export const authStartRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.withTypeProvider<ZodTypeProvider>().get('/start', {
		schema: {
			response: {
				200: z.object({
					url: z.url(),
					session: z.uuidv4(),
				}).describe('OK'),
			},
		},
	}, async (_req, reply) => {
		const session = randomUUID();
		const callback = `${getConfig('APP_ORIGIN')}/api/auth/callback`;
		const url = `https://misskey.io/miauth/${session}?name=iomc-tools&callback=${encodeURIComponent(callback)}`;
		await reply.send({ url, session });
	});
};
