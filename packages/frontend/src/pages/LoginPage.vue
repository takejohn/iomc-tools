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
import { injectModalController } from '../scripts/dialog.js';

const modalController = injectModalController();

async function startLogin() {
	const res = await apiClient.GET('/auth/start');
	if (res.data == null) {
		modalController.dialogError(`APIに問題が発生しました。`);
		return;
	}
	const data = res.data;
	window.location.href = data.url; // Misskey.ioへリダイレクト
}
</script>
