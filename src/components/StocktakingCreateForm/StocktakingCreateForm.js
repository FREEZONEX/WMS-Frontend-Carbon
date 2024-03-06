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
  Button,
} from '@carbon/react';
import '@/components/MaterialCreateForm/_materialcreateform.scss';

function StocktakingCreateForm() {
  return (
    <div>
      <div className=" mt-12">
        <Grid className="pl-0">
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
          </Column>
          <Column sm={2} md={4} lg={4}>
            <Select
              className="mb-10"
              id="type"
              defaultValue="placeholder-item"
              labelText="Type"
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
            <TextInput
              className="mb-10"
              labelText="Operator"
              id="operator"
              placeholder="Operator"
            />
          </Column>
          <Column sm={3} md={6} lg={12}>
            <TextInput
              className="mb-10"
              labelText="Note"
              rows={4}
              id="note"
              placeholder="Note Placeholder"
            />
          </Column>
        </Grid>
      </div>
      <div className="flex space-x-4 mt-10 justify-center ">
        <Button size="sm">Save</Button>
        <Button size="sm" kind="tertiary" href="/operation/stocktaking">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default StocktakingCreateForm;
