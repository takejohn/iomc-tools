import { FastifyPluginAsync } from 'fastify';
import { AppDataSource } from '../../../utils/db.js';
import { User } from '../../../entities/User.js';
import type * as Misskey from 'misskey-js';
import z from 'zod';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

export const authCallbackRoutes: FastifyPluginAsync = async (fastify) => {
	fastify.withTypeProvider<ZodTypeProvider>().get('/callback', {
		schema: {
			querystring: z.object({
				session: z.string(),
			}),
		},
	}, async (req, reply) => {
		const session = req.query.session;

		const res = await fetch(`https://misskey.io/api/miauth/${session}/check`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
		});
		const data = await res.json();

		if (!data.ok) {
			return reply.status(401).send({ error: 'Authentication failed' });
		}

		const user: Misskey.entities.User = data.user;
		const repo = AppDataSource.getRepository(User);

		let existing = await repo.findOne({ where: { misskeyId: user.id } });
		if (!existing) {
			existing = repo.create({
				misskeyId: user.id,
				username: user.username,
				host: user.host ?? 'misskey.io',
				avatarUrl: user.avatarUrl,
			});
			await repo.save(existing);
		}

		// JWTなどを発行する場合はここ
		return reply.redirect(`${process.env.APP_ORIGIN}/?login=success`);
	});
};
