'use client';
import React from 'react';
import {
  TextInput,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  HeaderGlobalAction,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';
import { Add, Search } from '@carbon/icons-react';
import WMSTable from '@/components/Table/Table';

const headers = [
  'ID',
  'Type',
  'Warehouse',
  'Location',
  'Time',
  'Operator',
  'Result',
  'Details',
];
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
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">
            Stocktaking
          </Heading>
          <Heading className="mt-1 text-sm">
            Description of inventory view goes here.
          </Heading>
        </div>
        <Button
          href="/operation/stocktaking/create"
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create a Stocktaking Order
        </Button>
      </div>
      <div className="flex mt-20 space-x-4 items-end">
        <TextInput
          className="flex-auto grow"
          labelText="Stocktaking Id"
          id="stocktaking id"
          placeholder="Id"
        />
        <TextInput
          className="flex-auto grow"
          labelText="Warehouse"
          id="warehouse"
          placeholder="Warehouse"
        />
        <TextInput
          className="flex-auto grow"
          labelText="Operator"
          id="operator"
          placeholder="Operator"
        />
        <DatePicker datePickerType="range" className="flex-auto grow">
          <DatePickerInput
            className="flex-auto"
            id="date-picker-input-id-start"
            placeholder="mm/dd/yyyy"
            labelText="Length of Stocktaking"
            size="md"
          />
          <DatePickerInput
            className="flex-auto"
            id="date-picker-input-id-finish"
            placeholder="mm/dd/yyyy"
            labelText=" "
            size="md"
          />
        </DatePicker>
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
