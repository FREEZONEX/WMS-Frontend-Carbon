'use client';
import React from 'react';
import { Modal, Heading } from '@carbon/react';

function StorageLocationModal({ isModalOpen, setModalOpen, material_info }) {
  return (
    <Modal
      open={isModalOpen}
      modalHeading="All Shelf Location"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="lg"
    >
      <>
        <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
          All shelf location containing this material - {material_info.name}:
        </Heading>
        <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
          {material_info.storage_location}
        </Heading>
      </>
    </Modal>
  );
}

export default StorageLocationModal;
