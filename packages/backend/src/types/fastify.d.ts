import '@fastify/jwt';
import 'fastify';

declare module 'fastify' {
	interface FastifyInstance {
		auth: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
	}
}

declare module '@fastify/jwt' {
	interface FastifyJWT {
		payload: {
			id: string;
		};
		user: {
			id: string;
		};
	}
}
