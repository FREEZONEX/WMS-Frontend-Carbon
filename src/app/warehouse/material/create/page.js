'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import MaterialCreateForm from '@/components/MaterialCreateForm/MaterialCreateForm';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
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
            router.push(`${process.env.PATH_PREFIX}/warehouse/material/create`);
          }}
        >
          Create
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <Heading className="mt-2 text-[28px] font-normal">
          Create a Material
        </Heading>
      </div>
      <MaterialCreateForm />
    </div>
  );
}

export default Page;
