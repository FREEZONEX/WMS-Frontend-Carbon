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
import { Add, Search, CloseOutline } from '@carbon/icons-react';
import OutboundTable from '@/components/Table/OutboundTable';
import { fetchWHNameMap, fetchSLNameMap } from '@/actions/actions';

const headers = [
  { key: 'outbound_id', header: 'ID' },
  { key: 'outbound_purchase_order_no', header: 'Purchase Order No.' },
  { key: 'outbound_supplier', header: 'Supplier' },
  { key: 'outbound_status', header: 'Status' },
  { key: 'operator', header: 'Inbounder' },
  { key: 'material', header: 'Material' },
  { key: 'outbound_delivery_date', header: 'Delivery Date' },
  { key: 'create_time', header: 'Create Time' },
  { key: 'operate', header: 'Operate' },
  { key: 'note', header: 'Note' },
];

function Page() {
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
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  useEffect(() => {
    fetchWHNameMap({ pageNum: 1, pageSize: 999999 })
      .then((res) => {
        const map = res.list.reduce((acc, curr) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {});

        localStorage.setItem('whNameMap', JSON.stringify(map));
      })
      .catch((error) => {
        console.error('Failed to fetch WH name map:', error);
      });
    fetchSLNameMap({ pageNum: 1, pageSize: 999999 })
      .then((res) => {
        const map = res.list.reduce((acc, curr) => {
          acc[curr.id] = curr.name;
          return acc;
        }, {});

        localStorage.setItem('slNameMap', JSON.stringify(map));
      })
      .catch((error) => {
        console.error('Failed to fetch SL name map:', error);
      });
  }, []);
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
            Process and track inventory dispatches
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
          <DatePicker datePickerType="single">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Delivery date"
              id="outbound_delivery_date"
              value={formValue.outbound_delivery_date}
              onChange={onFormValueChange}
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
