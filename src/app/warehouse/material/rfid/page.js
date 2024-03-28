'use client';
import React, { useState, useEffect } from 'react';
import { Heading, Breadcrumb, BreadcrumbItem, Button } from '@carbon/react';
import { fetchMaterialRFID } from '@/actions/actions';
import { Add } from '@carbon/icons-react';
import LabelingTable from '@/components/Table/LabelingTable';
import { useRouter } from 'next/navigation';

const headers = [
  { key: 'material_id', header: 'Material ID' },
  { key: 'rfid', header: 'RFID' },
  { key: 'quantity', header: 'Quantity' },
];

function Page() {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState({});

  useEffect(() => {
    fetchMaterialRFID().then((res) => setRows(res));
  }, [refresh]);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a
            onClick={() => {
              router.push(`${process.env.PATH_PREFIX}/`);
            }}
          >
            Home
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/warehouse`);
          }}
        >
          Warehouse
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/warehouse/material`);
          }}
        >
          Material
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/warehouse/material/rfid`);
          }}
        >
          RFID
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-12 text-[28px] font-normal">RFID Tag</Heading>
          <Heading className="mt-1 text-sm">
            Description of Labeling view goes here.
          </Heading>
        </div>
        <Button
          onClick={() => {
            router.push(
              `${process.env.PATH_PREFIX}/warehouse/material/rfid/create`
            );
          }}
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create a RFID Tag
        </Button>
      </div>
      <div className="mt-12">
        <LabelingTable headers={headers} rows={rows} />
      </div>
    </div>
  );
}

export default Page;
