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
			body: '{}',
		});
		const data = await res.json();

		if (!data.ok) {
			return reply.status(401).send({ error: 'Authentication failed' });
		}

		const misskeyUser: Misskey.entities.User = data.user;
		fastify.log.info(misskeyUser);

		const repo = AppDataSource.getRepository(User);

		let appUser = await repo.findOne({ where: { misskeyId: misskeyUser.id } });
		if (!appUser) {
			appUser = repo.create({
				misskeyId: misskeyUser.id,
				username: misskeyUser.username,
				host: misskeyUser.host ?? 'misskey.io',
				avatarUrl: misskeyUser.avatarUrl,
			});
			await repo.save(appUser);
		}

		const payload = {
			id: appUser.id,
		};

		const jwt = fastify.jwt.sign(payload, {
			expiresIn: '7d',
		});

		reply.setCookie('auth', jwt, {
			httpOnly: true,
			secure: true,
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7,
		});

		reply.redirect('/');
	});
};
