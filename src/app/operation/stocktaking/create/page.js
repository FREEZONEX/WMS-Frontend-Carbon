'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import StocktakingCreateForm from '@/components/StocktakingCreateForm/StocktakingCreateForm';

function page() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href={`${process.env.PATH_PREFIX}/`}>Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href={`${process.env.PATH_PREFIX}/operation/inbound`}>
          Operation
        </BreadcrumbItem>
        <BreadcrumbItem
          href={`${process.env.PATH_PREFIX}/operation/stocktaking`}
        >
          Stocktaking
        </BreadcrumbItem>
        <BreadcrumbItem
          href={`${process.env.PATH_PREFIX}/operation/stocktaking/create`}
        >
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
