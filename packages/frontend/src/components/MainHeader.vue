<template>
	<header class="flex items-stretch border-b-2 border-b-gray-400 dark:border-b-gray-200 pb-0 h-fit">
		<RouterLink class="flex-initial mx-4 p-2 text-xl" to="/">iomc-tools</RouterLink>
		<MainNavigation class="flex-auto"></MainNavigation>
		<LoginStateIndicator class="flex-initial"></LoginStateIndicator>
	</header>
</template>

<script setup lang="ts">
import LoginStateIndicator from './LoginStateIndicator.vue';
import MainNavigation from './navigation/MainNavigation.vue';
</script>
