<template>
	<span class="flex items-center mx-4">
		<span v-if="!auth.loaded">
			読み込み中
		</span>
		<span v-else-if="auth.user != null">
			<RouterLink to="/profile">
				<span class="text-gray-950 dark:text-gray-50">
					@{{ auth.user.username }}
				</span>
			</RouterLink>
		</span>
		<span v-else>
			<RouterLink to="/login">
				<span class="rounded-md bg-cyan-800 dark:bg-cyan-700 text-gray-50 px-2 py-1">
					ログイン
				</span>
			</RouterLink>
		</span>
	</span>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth.js';

const auth = useAuthStore();
</script>
