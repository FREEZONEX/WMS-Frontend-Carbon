'use client';
import '@/components/Task/_task.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import '@carbon/charts/styles.css';
import { useRouter } from 'next/navigation';
import ResourceTable from '@/components/Table/ResourceTable';

const headers = [
  { header: 'Resource ID', key: 'resource_id' },
  { header: 'Resource Name', key: 'resource_name' },
  { header: 'Status', key: 'status' },
  { header: 'Starting Time', key: 'starting_time' },
  { header: 'End Time', key: 'end_time' },
];

export default function Page() {
  const router = useRouter();
  const [refresh, setRefresh] = useState({});
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a
            onClick={() => {
              router.push(`${process.env.PATH_PREFIX}/home`);
            }}
          >
            Home
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/task`);
          }}
        >
          Task
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/task/resource`);
          }}
        >
          Resource
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">
            Resource List
          </Heading>
          <Heading className="mt-1 text-sm">
            An instant snapshot of inventory, order status, and efficiency,
            streamlining warehouse management.
          </Heading>
        </div>
      </div>

      <div className="mt-10">
        <ResourceTable
          headers={headers}
          refresh={refresh}
          setRefresh={setRefresh}
        ></ResourceTable>
      </div>
    </div>
  );
}
