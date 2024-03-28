'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import StocktakingCreateForm from '@/components/StocktakingCreateForm/StocktakingCreateForm';
import { useRouter } from 'next/navigation';

function Page() {
  router = useRouter();
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
            router.push(`${process.env.PATH_PREFIX}/operation/stocktaking`);
          }}
        >
          Stocktaking
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(
              `${process.env.PATH_PREFIX}/operation/stocktaking/create`
            );
          }}
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

export default Page;
