import { Toaster, Intent } from '@blueprintjs/core';

const toaster = Toaster.create({});

export function showError(message) {
  toaster.show({
    message,
    intent: Intent.DANGER,
    timeout: 0,
  });
}
