import { inject, provide, type InjectionKey } from 'vue';
import Modal from '../components/Modal.vue';

const key: InjectionKey<ModalController> = Symbol('ModalController');

export class ModalController {
	private modal: () => InstanceType<typeof Modal>;

	private closeHandler?: () => void;

	public constructor(modal: () => InstanceType<typeof Modal>) {
		this.modal = modal;
	}

	public invokeCloseHandler(): void {
		this.closeHandler?.();
	}

	private registerCloseHandler(handler: () => void): void {
		this.closeHandler = handler;
	}

	public dialogError(message: string): Promise<void> {
		this.setMessage(message);
		this.open();
		return new Promise((resolve) => {
			this.registerCloseHandler(() => {
				this.setMessage('');
				resolve();
			});
		});
	}

	private open(): void {
		this.modal().open();
	}

	private setMessage(message: string): void {
		this.modal().message = message;
	}
}

export function provideModalController(modal: () => InstanceType<typeof Modal>): ModalController {
	const controller = new ModalController(modal);
	provide(key, controller);
	return controller;
}

export function injectModalController(): ModalController {
	const controller = inject(key);
	if (controller == null) {
		throw new TypeError('ModalController has not been provided');
	}
	return controller;
}
