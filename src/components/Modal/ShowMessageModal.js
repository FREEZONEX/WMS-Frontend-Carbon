import { Modal, Heading } from '@carbon/react';
import { createRoot } from 'react-dom/client';

import { useEffect, useState } from 'react';
import { duration } from 'moment';
export function MessageDialog({
  isOpen,
  type = 'success',
  message,
  handleConfirm,
}) {
  const [isMsgOpen, setIsMsgOpen] = useState(isOpen);
  const [title, setTitle] = useState('Info');
  useEffect(() => {
    switch (type) {
      case 'success': {
        setTitle('Success');
        break;
      }
      case 'Info': {
        setTitle('Tips');
        break;
      }
      case 'error': {
        setTitle('Error');
        break;
      }
      case 'confirm': {
        setTitle('Confirm');
        break;
      }
      default: {
        setTitle('Info');
        break;
      }
    }
  }, [type]);
  return (
    <>
      <Modal
        open={isMsgOpen}
        modalHeading={title}
        primaryButtonText={type == 'confirm' ? 'Confirm' : 'Ok'}
        secondaryButtonText="Cancel"
        onRequestSubmit={handleConfirm}
        onRequestClose={() => {
          setIsMsgOpen(false);
        }}
        size="sm"
      >
        <Heading className="text-sm font-normal leading-tight tracking-tight mb-3"></Heading>
        {message}
      </Modal>
    </>
  );
}

const ShowMessageModal = {
  dom: null,
  options: {
    isOpen: true,
  },
  setOptions(options) {
    console.log(options);
    this.options = options || {};
  },
  showSuccess(message = 'Successfully') {
    this.options = { ...this.options, isOpen: true, type: 'success' };
    this.open(message, () => {
      this.removeDom();
    });
    setTimeout(() => {
      this.options.isOpen = false;
      this.open(message);
    }, 1000);
  },
  showInfo(message) {
    this.options = { ...this.options, isOpen: true, type: 'info' };
    this.open(message, () => {
      this.removeDom();
    });
  },
  showError(message) {
    this.options = { ...this.options, isOpen: true, type: 'error' };
    this.open(message, () => {
      this.removeDom();
    });
  },
  showConfirm(message, callback) {
    this.options.isOpen = true;
    this.options.type = 'confirm';
    this.open(message, () => {
      callback();
      this.removeDom();
    });
  },
  open(message, callback) {
    this.removeDom();
    this.dom = document.createElement('div');
    document.body.appendChild(this.dom);
    const root = createRoot(this.dom);
    root.render(
      <MessageDialog
        isOpen={this.options.isOpen}
        type={this.options.type}
        message={message}
        handleConfirm={callback}
      />
    );
  },
  removeDom() {
    this.dom && this.dom.remove();
  },
};

export default ShowMessageModal;
