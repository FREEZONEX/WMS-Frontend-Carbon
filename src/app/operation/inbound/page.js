'use client';
import React, { useState } from 'react';
import {
  TextInput,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Select,
  SelectItem,
  HeaderGlobalAction,
  DatePicker,
  DatePickerInput,
  Grid,
  Column,
} from '@carbon/react';
import { Add, Search, CloseOutline } from '@carbon/icons-react';
import InboundTable from '@/components/Table/InboundTable';

const headers = [
  { key: 'inbound_id', header: 'ID' },
  { key: 'inbound_purchase_order_no', header: 'Purchase Order No.' },

  { key: 'inbound_supplier', header: 'Supplier' },
  { key: 'inbound_status', header: 'Status' },
  { key: 'operator', header: 'Inbounder' },
  { key: 'material', header: 'Material' },
  { key: 'create_time', header: 'Create Time' },
  { key: 'operate', header: 'Operate' },
  { key: 'note', header: 'Note' },
];

function Page() {
  const [refresh, setRefresh] = useState({});
  const defaultFormValue = {
    id: '',
    status: '',
    type: '',
    operator: '',
    time: '',
    purchase_order_no: '',
    inbound_supplier: '',
    material_code: '',
    material_name: '',
  };
  const [formValue, setFormValues] = useState(defaultFormValue);
  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href={`${process.env.PATH_PREFIX}/`}>Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href={`${process.env.PATH_PREFIX}/operation/inbound`}>
          Operation
        </BreadcrumbItem>
        <BreadcrumbItem href={`${process.env.PATH_PREFIX}/operation/inbound`}>
          Inbound
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Inbound</Heading>
          <Heading className="mt-1 text-sm">
            Log new inventory arrivals quickly
          </Heading>
        </div>
        <Button
          href={`${process.env.PATH_PREFIX}/operation/inbound/create`}
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create an Inbound List
        </Button>
      </div>
      <Grid className="p-0 mt-[50px] gap-[9px]">
        <Column className="ml-0 " sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Inbound Id"
            id="id"
            placeholder="Id"
            value={formValue.id}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <DatePicker>
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Time Period"
              id="time"
            />
          </DatePicker>
        </Column>

        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Purchase order No."
            id="purchase_order_no"
            placeholder="Purchase order No."
            value={formValue.purchase_order_no}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Supplier"
            id="supplier"
            placeholder="Supplier"
            value={formValue.supplier}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <Select
            className="flex-auto"
            id="status"
            defaultValue=""
            labelText="Status"
            value={formValue.status}
            onChange={onFormValueChange}
            required
          >
            <SelectItem disabled hidden value="" text="Choose an option" />
            <SelectItem value="Done" text="Done" />
            <SelectItem value="Executing" text="Executing" />
            <SelectItem value="To-do" text="To-do" />
          </Select>
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Inbounder"
            id="operator"
            placeholder="Ref Id"
            value={formValue.operator}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Material Code"
            id="material_code"
            placeholder="Material Code"
            value={formValue.material_code}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Material Name"
            id="material_name"
            placeholder="Material Name"
            value={formValue.material_name}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <Select
            className="flex-auto"
            id="type"
            defaultValue=""
            labelText="Inbound Type"
            value={formValue.type}
            onChange={onFormValueChange}
            required
          >
            <SelectItem disabled hidden value="" text="Choose an option" />
            <SelectItem value="material inbound" text="Material Inbound" />
            <SelectItem value="product inbound" text="Product Inbound" />
            <SelectItem value="mix inbound" text="Mix Inbound" />
          </Select>
        </Column>
        <Column className="ml-0" sm={1} md={1} lg={1}>
          <HeaderGlobalAction
            aria-label="Search"
            onClick={() => setIsSearchClicked(true)}
          >
            <Search size={16} />
          </HeaderGlobalAction>
        </Column>
        <Column className="ml-0" sm={1} md={1} lg={1}>
          <HeaderGlobalAction
            aria-label="Remove Filters"
            onClick={() => {
              setIsSearchClicked(false);
              setFormValues(defaultFormValue);
            }}
          >
            <CloseOutline size={16} />
          </HeaderGlobalAction>
        </Column>
      </Grid>
      <div className="mt-[38px]">
        <InboundTable
          headers={headers}
          refresh={refresh}
          setRefresh={setRefresh}
          filters={formValue}
          isSearchClicked={isSearchClicked}
        />
      </div>
    </div>
  );
}

export default Page;
