'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Heading } from '@carbon/react';
import WMSDataTable from '../Table/DataTable';
import { fetchInboundDetails, fetchOutboundDetails } from '@/actions/actions';
import { usePathname } from 'next/navigation';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'product_code', header: 'Code' },
  { key: 'specification', header: 'Specification' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'unit', header: 'Unit' },
  { key: 'warehouse', header: 'WH' },
  { key: 'stock_location', header: 'Shelf' },
  { key: 'rfid', header: 'RFID' },
];

function OperationDetailModal({ isModalOpen, setModalOpen, id }) {
  const [details, setDetails] = useState([]);
  const pathName = usePathname();

  useEffect(() => {
    if (id) {
      const whNameMap = JSON.parse(localStorage.getItem('whNameMap'));
      const slNameMap = JSON.parse(localStorage.getItem('slNameMap'));
      if (pathName === `${process.env.PATH_PREFIX}/operation/inbound`) {
        fetchInboundDetails({ id })
          .then((data) => {
            console.log(data);

            const formattedRows = data.list.map((item) => ({
              name: item.name,
              product_code: item.product_code,
              specification: item.specification,
              quantity: item.quantity,
              unit: item.unit,
              warehouse: whNameMap[item.warehouse_id],
              stock_location: slNameMap[item.stock_location_id],
            }));
            setDetails(formattedRows);
          })
          .catch((error) => {
            console.error('Failed to fetch inbound details:', error);
          });
      }
      if (pathName === `${process.env.PATH_PREFIX}/operation/outbound`) {
        fetchOutboundDetails({ id })
          .then((data) => {
            console.log(data);
            const formattedRows = data.list.map((item) => ({
              name: item.name,
              product_code: item.product_code,
              specification: item.specification,
              quantity: item.quantity,
              unit: item.unit,
              warehouse: whNameMap[item.warehouse_id],
              stock_location: slNameMap[item.stock_location_id],
            }));
            setDetails(formattedRows);
          })
          .catch((error) => {
            console.error('Failed to fetch outbound details:', error);
          });
      }
    }
  }, [id, pathName]);
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

export default OperationDetailModal;
