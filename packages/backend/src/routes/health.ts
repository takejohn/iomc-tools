import { FastifyInstance } from 'fastify';
import { pool } from '../index.js';

export default async function healthRoute(app: FastifyInstance) {
	app.get('/api/health', async (_req, reply) => {
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
