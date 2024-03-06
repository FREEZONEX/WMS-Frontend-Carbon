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
import InboundTable from '@/components/Table/InboundTable';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'materialId', header: 'Material Id' },
  { key: 'materialName', header: 'Material Name' },
  { key: 'inboundTime', header: 'Inbound Time' },
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
    inboundTime: '11/02/2024',
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
    inboundTime: '11/02/2024',
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
    inboundTime: '11/02/2024',
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
    inboundTime: '11/02/2024',
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
    inboundTime: '11/02/2024',
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
        <BreadcrumbItem href="/operation/inbound">Inbound</BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Inbound</Heading>
          <Heading className="mt-1 text-sm">
            Description of Inbound view goes here.
          </Heading>
        </div>
        <Button
          href="/operation/inbound/create"
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create an Inbound List
        </Button>
      </div>
      <div className="flex mt-20 space-x-4 items-end">
        <TextInput
          className="flex-auto"
          labelText="Inbound Id"
          id="inbound Id"
          placeholder="Id"
        />
        <Select
          className="flex-auto"
          id="inbound type"
          defaultValue="placeholder-item"
          labelText="Inbound Type"
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
          className="flex-auto "
          labelText="Material Id"
          id="material id"
          placeholder="Material Id"
        />
        <TextInput
          className="flex-auto "
          labelText="Material Name"
          id="material name"
          placeholder="Material Name"
        />
        <DatePicker datePickerType="single" className="flex-auto">
          <DatePickerInput
            id="time of inbound"
            placeholder="mm/dd/yyyy"
            labelText="Time of Inbound"
          />
        </DatePicker>
      </div>
      <div className="flex mt-5 space-x-4 items-end w-2/5">
        <TextInput
          className="flex-auto "
          labelText="Operator"
          id="operator"
          placeholder="Operator"
        />
        <TextInput
          className="flex-auto"
          labelText="Warehouse"
          id="warehouse"
          placeholder="Warehouse"
        />

        <HeaderGlobalAction aria-label="Search">
          <Search size={15} />
        </HeaderGlobalAction>
      </div>
      <div className="mt-12">
        <InboundTable headers={headers} rows={rows} />
      </div>
    </div>
  );
}

export default page;
