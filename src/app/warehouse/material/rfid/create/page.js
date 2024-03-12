'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import RFIDCreateForm from '@/components/MaterialCreateForm/RFIDCreateForm';

function page() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/warehouse">Warehouse</BreadcrumbItem>
        <BreadcrumbItem href="/warehouse/material">Material</BreadcrumbItem>
        <BreadcrumbItem href="/warehouse/material/rfid">RFID</BreadcrumbItem>
        <BreadcrumbItem href="/warehouse/material/rfid/create">
          Create
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <Heading className="mt-2 text-[28px] font-normal">
          Create a RFID Tag
        </Heading>
      </div>
      <RFIDCreateForm />
    </div>
  );
}

export default page;
