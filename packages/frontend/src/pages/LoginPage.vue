<template>
	<div class="login">
		<h1>Login with Misskey.io</h1>
		<button @click="startLogin">Log in</button>
	</div>
</template>

<script setup lang="ts">
async function startLogin() {
	const res = await fetch('/api/auth/start');
	const data = await res.json();
	window.location.href = data.url; // Misskey.ioへリダイレクト
}
</script>
