'use client';
import '@/components/Task/_task.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { Heading, Breadcrumb, BreadcrumbItem, Button } from '@carbon/react';
import '@carbon/charts/styles.css';
import { useRouter } from 'next/navigation';
import PutawayTable from '@/components/Table/PutawayTable';

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
            router.push(`${process.env.PATH_PREFIX}/operation/task/putaway`);
          }}
        >
          Putaway Task
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">
            Putaway Task
          </Heading>
          <Heading className="mt-1 text-sm">
            An instant snapshot of inventory, order status, and efficiency,
            streamlining warehouse management.
          </Heading>
        </div>
        <Button
          isExpressive
          size="sm"
          style={{ backgroundColor: '#393939' }}
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/task/rules`);
          }}
        >
          Distribution Rules
        </Button>
      </div>

      <div className="mt-10">
        <PutawayTable refresh={refresh} setRefresh={setRefresh}></PutawayTable>
      </div>
    </div>
  );
}
