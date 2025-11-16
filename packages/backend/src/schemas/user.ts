import z from 'zod';

export const UserSchema = z.object({
	id: z.string(),
	misskeyId: z.string(),
	username: z.string(),
	host: z.string(),
	avatarUrl: z.string(),
	createdAt: z.number(),
	updatedAt: z.number(),
});

z.globalRegistry.add(UserSchema, { id: 'User' });
