'use client';
import React, { useEffect, useState } from 'react';
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
import { Add, Search, CloseOutline, DataFormat } from '@carbon/icons-react';
import InboundTable from '@/components/Table/InboundTable';
import { useRouter } from 'next/navigation';
import moment from 'moment';
import '@/app/page.scss';
import { DateTimeFormat } from '@/utils/constants';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'purchase_order_no', header: 'Purchase Order No.' },
  { key: 'supplier', header: 'Supplier' },
  { key: 'status', header: 'Status' },
  { key: 'operator', header: 'Inbounder' },
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
    id: '',
    status: '',
    type: '',
    operator: '',
    delivery_date: '',
    purchase_order_no: '',
    supplier: '',
    details: [
      {
        material_name: '',
      },
    ],
  };
  const [deliveryDateShow, setDeliveryDateShow] = useState('');
  const [formValue, setFormValues] = useState(defaultFormValue);
  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    if (id == 'material_name') {
      setFormValues((prevValues) => ({
        ...prevValues,
        details: [
          {
            material_name: value,
          },
        ],
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: value,
      }));
    }
  };
  const onDateChange = (e) => {
    if (!e) {
      return;
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      delivery_date: moment(e[0]).format(),
    }));
    setDeliveryDateShow(moment(e[0]).format(DateTimeFormat.shortDate));
  };
  const [isSearchClicked, setIsSearchClicked] = useState(0);
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
            router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
          }}
        >
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
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/inbound/create`);
          }}
          className="cursor-pointer cds--btn-customize"
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
          <DatePicker datePickerType="single" onChange={onDateChange}>
            <DatePickerInput
              placeholder="dd/mm/yyyy"
              labelText="Delivery date"
              value={deliveryDateShow}
            />
          </DatePicker>
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
            <SelectItem value="Pending" text="Pending" />
          </Select>
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Inbounder"
            id="operator"
            placeholder="Operator"
            value={formValue.operator}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Material Name"
            id="material_name"
            placeholder="Material Name"
            value={formValue.details[0].material_name}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <Select
            className="flex-auto"
            id="type"
            disabled
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
            onClick={() =>
              setIsSearchClicked((prevValue) => ({ prevValue: prevValue + 1 }))
            }
          >
            <Search size={16} />
          </HeaderGlobalAction>
        </Column>
        <Column className="ml-0" sm={1} md={1} lg={1}>
          <HeaderGlobalAction
            aria-label="Remove Filters"
            onClick={() => {
              setFormValues(defaultFormValue);
              setDeliveryDateShow('');
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
