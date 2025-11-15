<template>
	<div class="login">
		<h1>Login with Misskey.io</h1>
		<button @click="startLogin">Log in</button>
	</div>
</template>

<script setup lang="ts">
import { apiClient } from 'api-sdk';

async function startLogin() {
	const res = await apiClient.GET('/auth/start');
	const data = res.data!;
	window.location.href = data.url; // Misskey.ioへリダイレクト
}
</script>
