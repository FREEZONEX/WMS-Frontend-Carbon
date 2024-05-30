'use client';
import { Modal, Heading } from '@carbon/react';

import WMSDataTable from '../Table/DataTable';
const headers = [
  { key: 'material_name', header: 'Material Name' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'stock_quantity', header: 'Stock Quantity' },
  { key: 'discrepancy', header: 'Discrepancy' },
];

function StocktakingResultModal({ isModalOpen, setModalOpen, details }) {
  return (
    <Modal
      open={isModalOpen}
      modalHeading="Result"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="md"
    >
      <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
        The following products entered the designated warehouse in this inbound
        task.
      </Heading>
      {details && <WMSDataTable headers={headers} rows={details} />}
    </Modal>
  );
}

export default StocktakingResultModal;
