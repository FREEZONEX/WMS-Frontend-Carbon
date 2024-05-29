'use client';
import React, { useState, useEffect } from 'react';
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
import { Add, Search, CloseOutline, Cost } from '@carbon/icons-react';
import OutboundTable from '@/components/Table/OutboundTable';
import { useRouter } from 'next/navigation';
import moment from 'moment';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'purchase_order_no', header: 'Purchase Order No.' },
  { key: 'supplier', header: 'Supplier' },
  { key: 'status', header: 'Status' },
  { key: 'operator', header: 'Outbounder' },
  { key: 'details', header: 'Material' },
  { key: 'delivery_date', header: 'Delivery Date' },
  { key: 'create_time', header: 'Create Time' },
  { key: 'note', header: 'Note' },
  { key: 'operate', header: 'Operation' },
];

function Page() {
  const router = useRouter();
  const [refresh, setRefresh] = useState({});
  const defaultFormValue = {
    outbound_id: '',
    outbound_status: '',
    outbound_type: '',
    operator: '',
    outbound_delivery_date: '',
    outbound_purchase_order_no: '',
    outbound_supplier: '',
    material_code: '',
    name: '',
  };
  const [formValue, setFormValues] = useState(defaultFormValue);
  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const onDateChange = (e) => {
    if (!e) {
      return;
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      outbound_delivery_date: moment(e[0]).format(),
    }));
  };
  const [isSearchClicked, setIsSearchClicked] = useState(false);

  console.log(formValue);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem className="cursor-pointer">
          <a
            onClick={() => {
              router.push(`${process.env.PATH_PREFIX}/home`);
            }}
          >
            Home
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem
          className="cursor-pointer"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
          }}
        >
          Operation
        </BreadcrumbItem>
        <BreadcrumbItem
          className="cursor-pointer"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/outbound`);
          }}
        >
          Outbound
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Outbound</Heading>
          <Heading className="mt-1 text-sm">
            Process and track inventory dispatches
          </Heading>
        </div>
        <Button
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/outbound/create`);
          }}
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create an Outbound List
        </Button>
      </div>
      <Grid className="p-0 mt-[50px] gap-[9px]">
        <Column className="ml-0 " sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Outbound Id"
            id="outbound_id"
            placeholder="Id"
            value={formValue.outbound_id}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <DatePicker datePickerType="single" onChange={onDateChange}>
            <DatePickerInput
              placeholder="dd/mm/yyyy"
              labelText="Delivery date"
              id="outbound_delivery_date"
            />
          </DatePicker>
        </Column>

        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Purchase order No."
            id="outbound_purchase_order_no"
            placeholder="Purchase order No."
            value={formValue.outbound_purchase_order_no}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Supplier"
            id="outbound_supplier"
            placeholder="Supplier"
            value={formValue.outbound_supplier}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <Select
            className="flex-auto"
            id="outbound_status"
            defaultValue=""
            labelText="Status"
            value={formValue.outbound_status}
            onChange={onFormValueChange}
            required
          >
            <SelectItem disabled hidden value="" text="Choose an option" />
            <SelectItem value="Done" text="Done" />
            <SelectItem value="Pending" text="Pending" />
          </Select>
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Outbounder"
            id="operator"
            placeholder="Outbounder"
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
            id="name"
            placeholder="Material Name"
            value={formValue.name}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <Select
            className="flex-auto"
            id="type"
            disabled
            defaultValue=""
            labelText="Outbound Type"
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
        <OutboundTable
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
