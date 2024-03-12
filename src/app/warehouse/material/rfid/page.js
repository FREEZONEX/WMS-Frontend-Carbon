'use client';
import React, { useState, useEffect } from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { fetchMaterialRFID } from '@/actions/actions';
import LabelingTable from '@/components/Table/LabelingTable';

const headers = [
  { key: 'material_id', header: 'Material ID' },
  { key: 'rfid', header: 'RFID' },
  { key: 'quantity', header: 'Quantity' },
];

function Page() {
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState({});

  //   useEffect(() => {
  //     fetchMaterialRFID().then((res) => setRows(res));
  //   }, [refresh]);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/warehouse">Warehouse</BreadcrumbItem>
        <BreadcrumbItem href="/warehouse/material">Material</BreadcrumbItem>
        <BreadcrumbItem href="/warehouse/material/rfid">RFID</BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-12 text-[28px] font-normal">RFID Tag</Heading>
          <Heading className="mt-1 text-sm">
            Description of Labeling view goes here.
          </Heading>
        </div>
      </div>
      <div className="mt-12">
        <LabelingTable headers={headers} rows={rows} />
      </div>
    </div>
  );
}

export default Page;
