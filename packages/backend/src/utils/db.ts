import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from '../entities/User.js';
import { getConfig } from './config.js';

export const AppDataSource = new DataSource({
	type: 'postgres',
	url: getConfig('DATABASE_URL'),
	entities: [User],
	synchronize: true, // 開発用
});
