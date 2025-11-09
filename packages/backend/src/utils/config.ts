import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export function getConfig(key: string): string | undefined {
	return process.env[key];
}
