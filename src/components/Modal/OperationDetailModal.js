'use client';
import React, { useEffect, useState } from 'react';
import { Modal, Heading } from '@carbon/react';
import WMSDataTable from '../Table/DataTable';
import {
  fetchInboundDetails,
  fetchOutboundDetails,
  fetchWHNameMap,
  fetchSLNameMap,
} from '@/actions/actions';
import { usePathname } from 'next/navigation';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'product_code', header: 'Code' },
  { key: 'specification', header: 'Specification' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'unit', header: 'Unit' },
  { key: 'warehouse', header: 'WH' },
  { key: 'stock_location', header: 'Location' },
  { key: 'rfid', header: 'RFID' },
];

function OperationDetailModal({ isModalOpen, setModalOpen, id }) {
  const [details, setDetails] = useState([]);
  const pathName = usePathname();
  const [whNameMap, setWhNameMap] = useState({});
  const [slNameMap, setSlNameMap] = useState({});
  useEffect(() => {
    fetchWHNameMap({ pageNum: 1, pageSize: 999999 })
      .then((res) => {
        const map = res.list.reduce((acc, curr) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {});
        setWhNameMap(map);
      })
      .catch((error) => {
        console.error('Failed to fetch WH name map:', error);
      });

    fetchSLNameMap({ pageNum: 1, pageSize: 999999 })
      .then((res) => {
        const map = res.list.reduce((acc, curr) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {});
        setSlNameMap(map);
      })
      .catch((error) => {
        console.error('Failed to fetch SL name map:', error);
      });
  }, []);
  useEffect(() => {
    if (id) {
      if (
        pathName === `${process.env.PATH_PREFIX}/operation/inbound` ||
        pathName === `${process.env.PATH_PREFIX}/operation/task/putaway`
      ) {
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
      if (
        pathName === `${process.env.PATH_PREFIX}/operation/outbound` ||
        pathName === `${process.env.PATH_PREFIX}/operation/task/picking`
      ) {
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
  }, [id, pathName, whNameMap, slNameMap]);
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
