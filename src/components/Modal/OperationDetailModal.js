'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Heading } from '@carbon/react';
import WMSDataTable from '../Table/DataTable';

const headers = [
  { key: 'material_name', header: 'Name' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'stock_quantity', header: 'Stock Quantity' },
  { key: 'rfid', header: 'RFID' },
];

function OperationDetailModal({ isModalOpen, setModalOpen, materials }) {
  return (
    <Modal
      open={isModalOpen}
      modalHeading="All Material"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="md"
    >
      <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
        The following meterils entered the designated warehouse in this task.
      </Heading>
      {materials && <WMSDataTable headers={headers} rows={materials} />}
    </Modal>
  );
}

export default OperationDetailModal;
