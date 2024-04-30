'use client';
import '@/components/Task/_task.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { Heading, Breadcrumb, BreadcrumbItem, Button } from '@carbon/react';
import '@carbon/charts/styles.css';
import { useRouter } from 'next/navigation';
import PickingTable from '@/components/Table/PickingTable';

const headers = [
  { header: 'Task Id', key: 'task_id' },
  { header: 'Creation Time', key: 'create_time' },
  { header: 'Material', key: 'material' },
  { header: 'Quantity', key: 'quantity' },
  { header: 'Outbound ID', key: 'outbound_id' },
  { header: 'Resource', key: 'resource' },
  { header: 'Assigned To', key: 'assigned_to' },
  { header: 'Automation', key: 'automation' },
];

export default function Page() {
  const router = useRouter();
  const [refresh, setRefresh] = useState({});
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem className="cursor-pointer">
          <a
            onClick={() => {
              router.push(`${process.env.PATH_PREFIX}/home`);
            }}
          >
            Home
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem
          className="cursor-pointer"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/task`);
          }}
        >
          Task
        </BreadcrumbItem>
        <BreadcrumbItem
          className="cursor-pointer"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/task/picking`);
          }}
        >
          Picking Task
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">
            Picking Task
          </Heading>
          <Heading className="mt-1 text-sm">
            An instant snapshot of inventory, order status, and efficiency,
            streamlining warehouse management.
          </Heading>
        </div>
        <Button
          isExpressive
          style={{ backgroundColor: '#393939' }}
          size="sm"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/task/rules`);
          }}
        >
          Distribution Rules
        </Button>
      </div>

      <div className="mt-10">
        <PickingTable
          headers={headers}
          refresh={refresh}
          setRefresh={setRefresh}
        ></PickingTable>
      </div>
    </div>
  );
}
