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
import ProductTable from '@/components/Table/ProductTable';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'code', header: 'Product Code' },
  { key: 'name', header: 'Product Name' },
  { key: 'type', header: 'Product Type' },
  { key: 'unit', header: 'Unit' },
  { key: 'note', header: 'Note' },
];
const rows = [
  {
    id: '01',
    code: 'Product#1',
    name: 'oil',
    type: 'Shell',
    unit: 'Tondasfw',
    note: '-asfffffffffffff',
  },
  {
    id: '02',
    code: 'Product#2',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '03',
    code: 'Product#3',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '04',
    code: 'Product#4',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '05',
    code: 'Product#5',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '06',
    code: 'Product#6',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '07',
    code: 'Product#7',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '08',
    code: 'Product#8',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '09',
    code: 'Product#9',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '10',
    code: 'Product#10',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '11',
    code: 'Product#11',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '12',
    code: 'Product#12',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '13',
    code: 'Product#13',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
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
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Product</Heading>
          <Heading className="mt-1 text-sm">
            Description of product view goes here.
          </Heading>
        </div>
        <Button
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
        <ProductTable headers={headers} rows={rows} />
      </div>
    </div>
  );
}

export default page;
