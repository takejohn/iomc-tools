<template>
	<h1>プロフィール</h1>
	<div v-if="auth.user != null">
		<p>@{{ auth.user.username }}</p>
		<SimpleButton color="red" :onclick="auth.logout">ログアウト</SimpleButton>
	</div>
	<div v-else>
		<p>非ログイン状態</p>
	</div>
</template>

<script setup lang="ts">
import SimpleButton from '../components/SimpleButton.vue';
import { useAuthStore } from '../stores/auth.js';

const auth = useAuthStore();
</script>
