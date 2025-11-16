import { apiClient, type schemas } from 'api-sdk';
import { defineStore } from 'pinia';

type AuthState = {
	loaded: false;
	user: null;
} | {
	loaded: true;
	user: schemas['User'] | null;
};

export const useAuthStore = defineStore('auth', {
	state: (): AuthState => ({
		user: null,
		loaded: false,
	}),

	actions: {
		async load() {
			try {
				const res = await apiClient.GET('/me');
				this.user = res.data ?? null;
			} catch {
				this.user = null;
			} finally {
				this.loaded = true;
			}
		},

		async logout() {
			await apiClient.POST('/auth/logout');
			this.user = null;
		},
	},
});
