'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import StocktakingCreateForm from '@/components/StocktakingCreateForm/StocktakingCreateForm';

function page() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/operation/inbound">Operation</BreadcrumbItem>
        <BreadcrumbItem href="/operation/stocktaking">
          Stocktaking
        </BreadcrumbItem>
        <BreadcrumbItem href="/operation/stocktaking/create">
          Create
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <Heading className="mt-2 text-[28px] font-normal">
          Create a Stocktaking Order
        </Heading>
      </div>
      <StocktakingCreateForm />
    </div>
  );
}

export default page;
