import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn('uuid')
	id!: string;

	@Column({ type: 'text', unique: true })
	misskeyId!: string;

	@Column('text')
	username!: string;

	@Column('text')
	host!: string;

	@Column('text')
	avatarUrl!: string;

	@CreateDateColumn()
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;
}
