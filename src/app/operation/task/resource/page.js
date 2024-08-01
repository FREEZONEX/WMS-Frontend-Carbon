'use client';
import '@/components/Task/_task.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { Heading, Breadcrumb, BreadcrumbItem, Button } from '@carbon/react';
import { Add } from '@carbon/icons-react';
import '@carbon/charts/styles.css';
import { useRouter } from 'next/navigation';
import ResourceTable from '@/components/Table/ResourceTable';
import AddEditResourceModal from '@/components/Task/resource/AddEditResourceModal';
import '@/app/page.scss';
import { hasPermission } from '@/utils/utils';

export default function Page() {
  const router = useRouter();
  const [refresh, setRefresh] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onCreate = () => {
    setIsOpen(true);
  };
  const handleRefresh = () => {
    setIsOpen(false);
    setRefresh({});
  };
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
        <Button
          className="cds--btn-customize"
          isExpressive
          size="sm"
          style={{ backgroundColor: '#393939' }}
          renderIcon={Add}
          onClick={onCreate}
          disabled={!hasPermission()}
        >
          Create a New Resource
        </Button>
      </div>

      <div className="mt-10">
        <ResourceTable
          refresh={refresh}
          setRefresh={setRefresh}
        ></ResourceTable>
      </div>
      <AddEditResourceModal
        isOpen={isOpen}
        onRefresh={handleRefresh}
        onClose={() => {
          setIsOpen(false);
        }}
      ></AddEditResourceModal>
    </div>
  );
}
