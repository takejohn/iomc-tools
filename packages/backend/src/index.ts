import Fastify from 'fastify';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import path from 'node:path';
import fastifyStatic from '@fastify/static';
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

const frontendDist = path.resolve(import.meta.dirname, '../../frontend/dist');
app.register(fastifyStatic, {
	root: frontendDist,
	prefix: '/',
});

app.setNotFoundHandler((req, reply) => {
	if (req.raw.url?.startsWith('/api')) {
		reply.status(404).send({ error: 'Not Found' });
	} else {
		reply.sendFile('index.html');
	}
});

app.listen({ port }, (err, address) => {
	if (err) {
		app.log.error(err);
		process.exit(1);
	}
	app.log.info(`Server running at ${address}`);
});
