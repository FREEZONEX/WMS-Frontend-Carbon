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
  'Name',
  'ID',
  'Is Active',
  'Type',
  'Manage',
  'Shelf Location',
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
          <Heading className="mt-1 text-xl">Warehouse Structure</Heading>
          <Heading className="mt-1 text-sm">
            Description of warehouse view goes here.
          </Heading>
        </div>
        <Button
          className="button-primary"
          href="/warehouse/warehouse/create"
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create a Warehouse
        </Button>
      </div>
      <div className="flex mt-20 space-x-4 items-end">
        <TextInput
          className="flex-auto w-5"
          labelText="Warehouse Id"
          id="filter-1"
          placeholder="Id"
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Name"
          id="filter-2"
          placeholder="Name"
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Type"
          id="filter-3"
          placeholder="Type"
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Manager"
          id="filter-4"
          placeholder="Manager"
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
