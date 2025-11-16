<template>
	<dialog ref="modal" @close="props.onClose" class="absolute top-1/2 left-1/2 -translate-1/2 bg-transparent">
		<div class="border-2 border-gray-300 dark:border-gray-700 rounded-md p-2 bg-gray-50 dark:bg-gray-950">
			<p class="m-2 text-gray-950 dark:text-gray-100">{{ message }}</p>
			<div class="text-center">
				<button type="button" class="rounded-full px-4 bg-gray-300 dark:bg-gray-700 dark:text-gray-50 hover:cursor-pointer" @click="close">閉じる</button>
			</div>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
	onClose: () => void;
}>();

const modal = ref<HTMLDialogElement>();

const message = ref<string>('');

function open() {
	modal.value?.showModal();
}

function close() {
	modal.value?.close();
}

defineExpose({
	message,
	open,
	close,
});
</script>
