<template>
	<div class="login">
		<h1>ログイン</h1>
		<SimpleButton @click="startLogin">
			Misskey.ioでログイン
		</SimpleButton>
	</div>
</template>

<script setup lang="ts">
import { apiClient } from 'api-sdk';
import SimpleButton from '../components/SimpleButton.vue';

async function startLogin() {
	const res = await apiClient.GET('/auth/start');
	const data = res.data!;
	window.location.href = data.url; // Misskey.ioへリダイレクト
}
</script>
