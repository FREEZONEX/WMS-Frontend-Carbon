'use client';
import '@/components/Task/_task.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { Heading, Breadcrumb, BreadcrumbItem, Button } from '@carbon/react';
import { Add } from '@carbon/icons-react';

import { useRouter } from 'next/navigation';
import RuleBoard from '@/components/Rule/RuleBoard';
import '@/app/page.scss';

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
            router.push(`${process.env.PATH_PREFIX}/operation/task/rules`);
          }}
        >
          Rules
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">
            Distribution Rules
          </Heading>
          <Heading className="mt-1 text-sm">
            An instant snapshot of inventory, order status, and efficiency,
            streamlining warehouse management.
          </Heading>
        </div>
        <Button
          className="cds--btn-customize"
          style={{ backgroundColor: '#393939' }}
          isExpressive
          size="sm"
          renderIcon={Add}
          onClick={() => {
            router.push(
              `${process.env.PATH_PREFIX}/operation/task/rules/create`
            );
          }}
        >
          Create a New Rule
        </Button>
      </div>

      <div className="mt-10">
        <RuleBoard />
      </div>
    </div>
  );
}
