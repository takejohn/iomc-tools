import { FastifyPluginCallback } from 'fastify';
import { getPool } from '../../db.js';

export const pingRoute: FastifyPluginCallback = (fastify, opts, done) => {
	fastify.get('/ping', {
		schema: {
			response: {
				200: {
					description: 'OK',
					type: 'object',
					properties: {
						ok: {
							type: 'boolean',
							enum: [true],
						},
						time: {
							type: 'string',
						},
					},
				},
				500: {
					description: 'Internal Server Error',
					type: 'object',
					properties: {
						ok: {
							type: 'boolean',
							enum: [false],
						},
					},
				},
			},
		},
	}, async (_req, reply) => {
		try {
			const result = await getPool().query('SELECT NOW()');
			reply.send({ ok: true, time: result.rows[0].now });
		}
		catch (err) {
			fastify.log.error(err);
			reply.status(500).send({ ok: false });
		}
	});

	done();
};
