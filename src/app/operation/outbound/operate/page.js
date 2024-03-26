'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { useSearchParams } from 'next/navigation';
import OutboundCreateForm from '@/components/OutboundCreateForm/OutboundCreateForm';

function Page() {
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href={`${process.env.PATH_PREFIX}/`}>Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href={`${process.env.PATH_PREFIX}/operation/outbound`}>
          Operation
        </BreadcrumbItem>
        <BreadcrumbItem href={`${process.env.PATH_PREFIX}/operation/outbound`}>
          Inbound
        </BreadcrumbItem>
        <BreadcrumbItem
          href={`${process.env.PATH_PREFIX}/operation/outbound/operate`}
        >
          Operate
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <Heading className="mt-2 text-[28px] font-normal">Operate</Heading>
      </div>
      <OutboundCreateForm id={id} />
    </div>
  );
}

export default Page;
