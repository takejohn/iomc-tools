<template>
	<div class="relative m-0 px-4 py-0 bg-white dark:bg-gray-950">
		<div class="mx-auto my-0 w-auto h-screen lg:w-3/4 bg-gray-100 dark:bg-gray-900 text-gray-950 dark:text-gray-50">
			<MainHeader></MainHeader>
			<main style="text-align:center; margin-top: 2rem;">
				<router-view />
			</main>
		</div>
	</div>
	<Modal ref="modal" :onClose="onModalClose"></Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainHeader from './components/MainHeader.vue';
import Modal from './components/Modal.vue';
import { provideModalController } from './scripts/dialog.js';

const modal = ref<InstanceType<typeof Modal>>();
const modalController = provideModalController(() => modal.value!);
function onModalClose() {
	modalController.invokeCloseHandler();
}
</script>
