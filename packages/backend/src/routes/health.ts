import { FastifyInstance } from 'fastify';
import { pool } from '../index.js';

export default async function healthRoute(app: FastifyInstance) {
	app.get('/api/health', {
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
			const result = await pool.query('SELECT NOW()');
			reply.send({ ok: true, time: result.rows[0].now });
		}
		catch (err) {
			app.log.error(err);
			reply.status(500).send({ ok: false });
		}
	});
}
