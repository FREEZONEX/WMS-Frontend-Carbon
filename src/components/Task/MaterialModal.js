'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Heading } from '@carbon/react';
import WMSDataTable from '../Table/DataTable';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'quantity', header: 'Quantity' },
];

function MaterialModal({ isModalOpen, setModalOpen, materials }) {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    if (materials) {
      const items = Object.keys(materials).map((key) => {
        return { name: key, quantity: materials[key] };
      });
      setDetails(items);
    }
  }, [materials]);
  return (
    <Modal
      open={isModalOpen}
      modalHeading="All Material"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="sm"
    >
      <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
        The following meterils entered the designated warehouse in this task.
      </Heading>
      <WMSDataTable headers={headers} rows={details} />
    </Modal>
  );
}

export default MaterialModal;
