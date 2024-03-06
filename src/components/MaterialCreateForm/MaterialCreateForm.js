'use client';
import React from 'react';
import {
  TextInput,
  DatePicker,
  DatePickerInput,
  Grid,
  Column,
  TextArea,
  Button,
} from '@carbon/react';
import './_materialcreateform.scss';

function MaterialCreateForm() {
  return (
    <div>
      <div className=" mt-8">
        <Grid className="pl-0">
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="Material Code"
              id="filter-1"
              placeholder="Material Code"
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="Material Name"
              id="filter-2"
              placeholder="Material Name"
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="Company"
              id="filter-3"
              placeholder="Company"
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="Unit"
              id="filter-4"
              placeholder="Unit"
            />
          </Column>

          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="Material Properties"
              id="filter-5"
              placeholder="Material Properties"
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="Maximum Stock"
              id="filter-6"
              placeholder="Maximum Stock"
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="Minimum Stock"
              id="filter-7"
              placeholder="Minimum Stock"
            />
          </Column>
          <Column sm={4} md={4} lg={4}>
            <DatePicker datePickerType="single" className="mb-4 w-full">
              <DatePickerInput
                className="mb-4 w-full"
                placeholder="mm/dd/yyyy"
                labelText="Expiry Date"
                id="date-picker"
              />
            </DatePicker>
          </Column>
          <Column sm={4} md={8} lg={8}>
            <DatePicker datePickerType="single" className="mb-4 w-full">
              <DatePickerInput
                className="mb-4 w-full"
                id="warning-period"
                placeholder="mm/dd/yyyy"
                labelText="Warning Period"
              />
            </DatePicker>
          </Column>
          <Column sm={4} md={8} lg={8}>
            <DatePicker datePickerType="single" className="mb-4 w-full">
              <DatePickerInput
                className="mb-4 w-full"
                id="best-before-date"
                placeholder="mm/dd/yyyy"
                labelText="Best Before Date"
              />
            </DatePicker>
          </Column>
          <Column sm={4} md={8} lg={16}>
            <TextArea
              className="mb-4 w-full"
              labelText="Note"
              rows={4}
              id="text-area-1"
            />
          </Column>
        </Grid>
      </div>
      <div className="flex space-x-4 mt-4 justify-center ">
        <Button size="sm">Save</Button>
        <Button size="sm" kind="tertiary" href="/warehouse/product">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default MaterialCreateForm;
