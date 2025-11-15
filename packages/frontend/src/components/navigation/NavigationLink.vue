<template>
	<RouterLink :to="props.to" class="flex items-center mx-1 border-y-2 border-t-transparent px-1" :class="active
		? 'border-b-lime-700 dark:border-b-lime-300 text-gray-950 dark:text-gray-50'
		: 'border-transparent text-gray-600 dark:text-gray-200 hover:text-gray-950 dark:hover:text-gray-50'">
		<span>
			<slot></slot>
		</span>
	</RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
	to: string;
}>();

const route = useRoute();

const active = computed(() => route.path === props.to);
</script>
