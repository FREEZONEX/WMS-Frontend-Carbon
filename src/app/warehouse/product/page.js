'use client';
import React from 'react';
import {
  TextInput,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  HeaderGlobalAction,
} from '@carbon/react';
import { Add, Search } from '@carbon/icons-react';
import WMSTable from '@/components/Table/Table';

const headers = [
  'ID',
  'Product Code',
  'Product Name',
  'Product Type',
  'Unit',
  'Note',
  'Actions',
];
function page() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/warehouse">Warehouse Management</BreadcrumbItem>
        <BreadcrumbItem href="/warehouse/product">Product</BreadcrumbItem>
      </Breadcrumb>
      <div
        className="bx--col-lg-16"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <Heading className="mt-1 text-xl">Product</Heading>
          <Heading className="mt-1 text-sm">
            Description of product view goes here.
          </Heading>
        </div>
        <Button
          className="button-primary"
          href="/warehouse/product/create"
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create a Product
        </Button>
      </div>
      <div className="flex mt-20 space-x-4 items-end">
        <TextInput
          className="flex-auto w-5"
          labelText="Id"
          id="filter-1"
          placeholder="Id"
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Product Code"
          id="filter-2"
          placeholder="Product Code"
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Product Name"
          id="filter-3"
          placeholder="Product Name"
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Product Type"
          id="filter-4"
          placeholder="Product Type"
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Product Size"
          id="filter-4"
          placeholder="Product Size"
        />
        <HeaderGlobalAction aria-label="Search">
          <Search size={15} />
        </HeaderGlobalAction>
      </div>
      <div className="mt-12">
        <WMSTable headers={headers} />
      </div>
    </div>
  );
}

export default page;
