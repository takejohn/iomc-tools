<template>
	<div class="m-0 px-4 py-0 bg-white dark:bg-gray-950">
		<div class="mx-auto my-0 w-auto h-screen lg:w-3/4 bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-gray-50">
			<MainHeader></MainHeader>
			<main style="text-align:center; margin-top: 2rem;">
				<router-view />
			</main>
		</div>
	</div>
</template>

<script setup lang="ts">
import MainHeader from './components/MainHeader.vue';
</script>
