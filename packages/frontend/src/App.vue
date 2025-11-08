<script setup lang="ts">
import { ref, onMounted } from "vue";
import { fetchHealth } from "./api";

const message = ref("Loading...");

onMounted(async () => {
	const result = await fetchHealth();
	message.value = result.ok ? `Server time: ${result.time}` : "Error";
});
</script>

<template>
	<main style="text-align:center; margin-top: 2rem;">
		<h1>{{ message }}</h1>
	</main>
</template>
