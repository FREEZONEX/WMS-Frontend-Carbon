'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';

function page() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/analysis">Analysis</BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Analysis</Heading>
          <Heading className="mt-1 text-sm">
            Description of analysis view goes here.
          </Heading>
        </div>
      </div>
    </div>
  );
}

export default page;
