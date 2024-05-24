import { Modal, Heading } from '@carbon/react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';

import { useState } from 'react';
export function MessageDialog({
  isOpen,
  type = 'success',
  message,
  isConfirm = false,
  onClose,
  onConfirm,
}) {
  return (
    <>
      <Modal
        open={isOpen}
        modalHeading="Info"
        primaryButtonText={isConfirm ? 'Confirm' : 'Ok'}
        secondaryButtonText="Cancel"
        onRequestSubmit={onConfirm}
        onRequestClose={onClose}
        onR
        size="sm"
      >
        <Heading className="text-sm font-normal leading-tight tracking-tight mb-3"></Heading>
        {message}
      </Modal>
    </>
  );
}
const ShowMessageModal = {
  open(options) {
    let ops = options || {};
    const isOpen = true;
    let div = document.createElement('div');
    document.body.appendChild(div);
    const root = createRoot(div);
    root.render(
      <MessageDialog
        isOpen={isOpen}
        message={ops.message}
        onClose={ops.onClose}
      />,
      document.body
    );
  },
};

export default ShowMessageModal;
