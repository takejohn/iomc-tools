import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

export function getConfig(key: string): string | undefined {
	return process.env[key];
}

export function getConfigRequired(key: string): string {
	const value = getConfig(key);
	if (value == null) {
		throw new TypeError(`Config '${key}' is required`);
	}
	return value;
}
