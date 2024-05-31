'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { useRouter } from 'next/navigation';
import UnityWebGL from '@/components/WebGL/UnityWebGL';

function Page() {
  const router = useRouter();
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
            router.push(`${process.env.PATH_PREFIX}/analysis`);
          }}
        >
          Analysis
        </BreadcrumbItem>
        <BreadcrumbItem
          className="cursor-pointer"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/analysis/3d`);
          }}
        >
          Simulation
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Simulation</Heading>
          <Heading className="mt-1 text-sm">
            Simulation of the warehouse gose here.
          </Heading>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center h-auto">
        <UnityWebGL />
      </div>
    </div>
  );
}

export default Page;
