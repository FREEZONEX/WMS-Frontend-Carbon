'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import InboundCreateForm from '@/components/InboundCreateForm/InboundCreateForm';

function page() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/operation/inbound">Operation</BreadcrumbItem>
        <BreadcrumbItem href="/operation/inbound">Inbound</BreadcrumbItem>
        <BreadcrumbItem href="/operation/inbound/create">Create</BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <Heading className="mt-2 text-[28px] font-normal">
          Create a Inbound List
        </Heading>
      </div>
      <InboundCreateForm />
    </div>
  );
}

export default page;
