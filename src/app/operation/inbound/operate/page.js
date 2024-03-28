'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import InboundCreateForm from '@/components/InboundCreateForm/InboundCreateForm';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get('id');
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
            router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
          }}
        >
          Operation
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
          }}
        >
          Inbound
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/inbound/operate`);
          }}
        >
          Operate
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <Heading className="mt-2 text-[28px] font-normal">Operate</Heading>
      </div>
      <InboundCreateForm id={id} />
    </div>
  );
}

export default Page;
