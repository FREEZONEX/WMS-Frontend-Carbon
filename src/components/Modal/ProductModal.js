'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Heading } from '@carbon/react';
import WMSDataTable from '../Table/DataTable';
import { fetchInboundDetails } from '@/actions/actions';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'product_code', header: 'Code' },
  { key: 'specification', header: 'Specification' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'unit', header: 'Unit' },
  { key: 'warehouse_id', header: 'WH' },
  { key: 'stock_location_id', header: 'Shelf' },
  { key: 'rfid', header: 'RFID' },
];

function ProductModal({ isModalOpen, setModalOpen, id }) {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    if (id) {
      fetchInboundDetails({ id })
        .then((data) => {
          console.log(data);
          const whNameMap = JSON.parse(localStorage.getItem('whNameMap'));
          const slNameMap = JSON.parse(localStorage.getItem('slNameMap'));
          const formattedRows = data.list.map((item) => ({
            name: item.name,
            product_code: item.product_code,
            specification: item.specification,
            quantity: item.quantity,
            unit: item.unit,
            warehouse_id: whNameMap[item.warehouse_id],
            stock_location_id: slNameMap[item.stock_location_id],
          }));
          setDetails(formattedRows);
        })
        .catch((error) => {
          console.error('Failed to fetch inbound details:', error);
        });
    }
  }, [id]);
  console.log(id, details);
  return (
    <Modal
      open={isModalOpen}
      modalHeading="All Material"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="lg"
    >
      <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
        The following meterils entered the designated warehouse in this task.
      </Heading>
      <WMSDataTable headers={headers} rows={details} />
    </Modal>
  );
}

export default ProductModal;
