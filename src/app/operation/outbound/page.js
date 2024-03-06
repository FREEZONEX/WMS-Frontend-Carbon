'use client';
import React from 'react';
import {
  TextInput,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Select,
  SelectItem,
  DatePicker,
  DatePickerInput,
  HeaderGlobalAction,
} from '@carbon/react';
import { Add, Search } from '@carbon/icons-react';
import OutboundTable from '@/components/Table/OutboundTable';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'materialId', header: 'Material Id' },
  { key: 'materialName', header: 'Material Name' },
  { key: 'outboundTime', header: 'Outbound Time' },
  { key: 'warehouse', header: 'Warehouse' },
  { key: 'location', header: 'Location' },
  { key: 'type', header: 'Type' },
  { key: 'operator', header: 'Operator' },
  { key: 'status', header: 'Status' },
  { key: 'product', header: 'Product' },
];
const rows = [
  {
    id: 'S#24022901',
    type: 'Procurement',
    warehouse: 'Warehouse01',
    location: 'E30',
    materialId: '01',
    materialName: 'Apple',
    operator: 'Mick',
    status: 'Done',
    outboundTime: '11/02/2024',
    product: 'More',
  },
  {
    id: 'S#24022901',
    type: 'Procurement',
    warehouse: 'Warehouse01',
    location: 'E30',
    materialId: '02',
    materialName: 'Banana',
    operator: 'Joy',
    status: 'Done',
    outboundTime: '11/02/2024',
    product: 'More',
  },
  {
    id: 'S#24022901',
    type: 'Procurement',
    warehouse: 'Warehouse01',
    location: 'E30',
    materialId: '01',
    materialName: 'Apple',
    operator: 'Cheery',
    status: 'Done',
    outboundTime: '11/02/2024',
    product: 'More',
  },
  {
    id: 'S#24022901',
    type: 'Procurement',
    warehouse: 'Warehouse01',
    location: 'E30',
    materialId: '01',
    materialName: 'Apple',
    operator: 'Alice',
    status: 'Done',
    outboundTime: '11/02/2024',
    product: 'More',
  },
  {
    id: 'S#24022901',
    type: 'Procurement',
    warehouse: 'Warehouse01',
    location: 'E30',
    materialId: '01',
    materialName: 'Apple',
    operator: 'Sam',
    status: 'Done',
    outboundTime: '11/02/2024',
    product: 'More',
  },
];
function page() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/operation/inbound">Operation</BreadcrumbItem>
        <BreadcrumbItem href="/operation/outbound">Outbound</BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Outbound</Heading>
          <Heading className="mt-1 text-sm">
            Description of Outbound view goes here.
          </Heading>
        </div>
        <Button
          href="/operation/outbound/create"
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create an Outbound List
        </Button>
      </div>
      <div className="flex mt-20 space-x-4 items-end">
        <TextInput
          className="flex-auto self-stretch"
          labelText="Outbound Id"
          id="outbound Id"
          placeholder="Id"
        />
        <Select
          className="flex-auto self-stretch"
          id="outbound type"
          defaultValue="placeholder-item"
          labelText="Outbound Type"
          required
        >
          <SelectItem
            disabled
            hidden
            value="placeholder-item"
            text="Choose an option"
          />
          <SelectItem value="option-1" text="type 1" />
          <SelectItem value="option-2" text="type 2" />
        </Select>
        <TextInput
          className="flex-auto self-stretch"
          labelText="Warehouse"
          id="warehouse"
          placeholder="Warehouse"
        />
        <DatePicker datePickerType="single" className="flex-auto self-stretch">
          <DatePickerInput
            className="self-stretch flex-auto"
            id="time of outbound"
            placeholder="mm/dd/yyyy"
            labelText="Time of Outbound"
          />
        </DatePicker>
      </div>
      <div className="flex mt-[18px] space-x-4 items-end w-2/4">
        <TextInput
          className="flex-auto self-stretch"
          labelText="Operator"
          id="operator"
          placeholder="Operator"
        />
        <TextInput
          className="flex-auto "
          labelText="Product"
          id="product"
          placeholder="Product"
        />
        <HeaderGlobalAction aria-label="Search">
          <Search size={15} />
        </HeaderGlobalAction>
      </div>
      <div className="mt-12">
        <OutboundTable headers={headers} rows={rows} />
      </div>
    </div>
  );
}

export default page;
