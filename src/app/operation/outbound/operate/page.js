'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { useSearchParams } from 'next/navigation';
import OutboundCreateForm from '@/components/OutboundCreateForm/OutboundCreateForm';
import { useRouter } from 'next/navigation';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = searchParams.get('id');
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
            router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
          }}
        >
          Operation
        </BreadcrumbItem>
        <BreadcrumbItem
          className="cursor-pointer"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/outbound`);
          }}
        >
          Outbound
        </BreadcrumbItem>
        <BreadcrumbItem
          className="cursor-pointer"
          onClick={() => {
            router.push(
              `${process.env.PATH_PREFIX}/operation/outbound/operate`
            );
          }}
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
