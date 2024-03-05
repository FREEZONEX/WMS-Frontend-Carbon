'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import OutboundCreateForm from '@/components/OutboundCreateForm/OutboundCreateForm';

function page() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/operation/inbound">Operation</BreadcrumbItem>
        <BreadcrumbItem href="/operation/outbound">Outbound</BreadcrumbItem>
        <BreadcrumbItem href="/operation/outbound/create">
          Create
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <Heading className="mt-2 text-[28px] font-normal">
          Create a Outbound List
        </Heading>
      </div>
      <OutboundCreateForm />
    </div>
  );
}

export default page;
