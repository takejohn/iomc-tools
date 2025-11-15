import { createApp } from './app.js';
import { getConfig } from './utils/config.js';
import { AppDataSource } from './utils/db.js';

await AppDataSource.initialize();

const app = createApp();
const port = Number(getConfig('PORT')) || 3000;

try {
	const address = await app.listen({ port, host: '0.0.0.0' });
	app.log.info(`Server running at ${address}`);
} catch (err) {
	app.log.error(err);
	process.exit(1);
}
