<template>
	<button
		type="button"
		class="m-2 rounded p-1 text-white hover:cursor-pointer"
		:class="colorClasses[color]"
	>
		<slot></slot>
	</button>
</template>

<script setup lang="ts">
const colorClasses = {
	lime: 'bg-lime-600 dark:bg-lime-700 hover:bg-lime-700 dark:hover:bg-lime-800',
	red: 'bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800',
};

type ColorName = keyof typeof colorClasses;

const { color = 'lime' } = defineProps<{
	color?: ColorName;
}>();
</script>
