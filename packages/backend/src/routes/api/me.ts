import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import z from 'zod';
import { User } from '../../entities/User.js';
import { AppDataSource } from '../../utils/db.js';
import { UserSchema } from '../../schemas/user.js';

export const meRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.withTypeProvider<ZodTypeProvider>().get('/me', {
		schema: {
			description: '認証が必要',
			response: {
				200: UserSchema,
				500: z.object({
					error: z.string(),
				}),
			},
		},
		onRequest: [fastify.auth],
	}, async (req, reply) => {
		const userId = req.user.id;
		const repo = AppDataSource.getRepository(User);
		const user = await repo.findOne({ where: { id: userId } });

		if (user == null) {
			return reply.status(500).send({ error: `Unknown user id '${userId}'` });
		}

		return reply.status(200).send({
			id: user.id,
			misskeyId: user.misskeyId,
			username: user.username,
			host: user.host,
			avatarUrl: user.avatarUrl,
			createdAt: user.createdAt.getTime(),
			updatedAt: user.updatedAt.getTime(),
		});
	});
};
