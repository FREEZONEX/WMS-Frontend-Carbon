'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { useRouter } from 'next/navigation';
function Page() {
  const router = useRouter();
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a
            onClick={() => {
              router.push(`${process.env.PATH_PREFIX}/home`);
            }}
          >
            Home
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/analysis`);
          }}
        >
          Analysis
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/analysis/3d`);
          }}
        >
          3D-Modeling
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">
            3D-Modeling
          </Heading>
          <Heading className="mt-1 text-sm">
            3D Modeling of the warehouse goes here.
          </Heading>
        </div>
      </div>
      <div className="mt-[-220px] flex items-center justify-center">
        <iframe
          title="webgl"
          width="1800"
          height="1120.5"
          src="/MQTWebGl/index.html"
          frameborder="0"
        ></iframe>
      </div>
    </div>
  );
}

export default Page;
