<template>
	<h1>プロフィール</h1>
	<div v-if="auth.user != null">
		<p>@{{ auth.user.username }}</p>
	</div>
	<div v-else>
		<p>非ログイン状態</p>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '../stores/auth.js';

const auth = useAuthStore();
</script>
