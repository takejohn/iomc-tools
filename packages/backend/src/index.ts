import Fastify from 'fastify';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import healthRoute from './routes/health.js';

dotenv.config();

const app = Fastify({ logger: true });
const port = Number(process.env.PORT) || 3000;

export const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});

app.register(import('@fastify/cors'), {
	origin: true,
});

app.register(healthRoute);

app.listen({ port }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	app.log.info(`Server running at ${address}`);
});
