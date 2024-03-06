'use client';
import React from 'react';
import {
  TextInput,
  DatePicker,
  DatePickerInput,
  Grid,
  Column,
  Select,
  SelectItem,
  FormLabel,
  Button,
  TextArea,
} from '@carbon/react';
import '@/components/MaterialCreateForm/_materialcreateform.scss';
import WMSDataTable from '../Table/DataTable';

const headers = [
  { key: 'name', header: 'Material Name' },
  { key: 'code', header: 'Material Code' },
  { key: 'rfid', header: 'RFID' },
  { key: 'unit', header: 'Unit' },
  { key: 'amount', header: 'Amount' },
];
const rows = [
  {
    id: 'a',
    name: 'Apple',
    code: 'Material#2',
    rfid: 'fjsewol39492',
    unit: 'Ton',
    amount: 1,
  },
  {
    id: 'b',
    name: 'Banana',
    code: 'Material#4',
    rfid: 'fjsewol39492',
    unit: 'Ton',
    amount: 5,
  },
];

function InboundCreateForm() {
  return (
    <div>
      <div className=" mt-12">
        <Grid className="pl-0">
          <Column sm={2} md={4} lg={4}>
            <Select
              className="mb-10"
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
          </Column>
          <Column sm={2} md={4} lg={4}>
            <Select
              className="mb-10"
              id="warehouse"
              defaultValue="placeholder-item"
              labelText="Warehouse"
              required
            >
              <SelectItem
                disabled
                hidden
                value="placeholder-item"
                text="Choose an option"
              />
              <SelectItem value="option-1" text="warehouse 1" />
              <SelectItem value="option-2" text="warehouse 2" />
            </Select>
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-10"
              labelText="Shelf Location"
              id="shelf location"
              placeholder="Shelf Location"
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <DatePicker datePickerType="single" className="mb-10 w-full">
              <DatePickerInput
                className="mb-10 w-full"
                id="time of inbound"
                placeholder="mm/dd/yyyy"
                labelText="Time of Inbound"
              />
            </DatePicker>
          </Column>

          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-10"
              labelText="Operator"
              id="operator"
              placeholder="Operator"
            />
          </Column>
        </Grid>
        <FormLabel>Material List</FormLabel>
        <WMSDataTable headers={headers} rows={rows} />
        <TextArea
          className="mt-10 w-full"
          labelText="Note"
          rows={4}
          id="note"
          placeholder="Note Placeholder"
        />
      </div>
      <div className="flex space-x-4 mt-10 justify-center ">
        <Button size="sm">Save</Button>
        <Button size="sm" kind="tertiary" href="/operation/inbound">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default InboundCreateForm;
