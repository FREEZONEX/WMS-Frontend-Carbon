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
import { Add, Search, CloseOutline } from '@carbon/icons-react';
import InboundTable from '@/components/Table/InboundTable';
import { useRouter } from 'next/navigation';
import moment from 'moment';

const headers = [
  { key: 'inbound_id', header: 'ID' },
  { key: 'inbound_purchase_order_no', header: 'Purchase Order No.' },
  { key: 'inbound_supplier', header: 'Supplier' },
  { key: 'inbound_status', header: 'Status' },
  { key: 'operator', header: 'Inbounder' },
  { key: 'material', header: 'Material' },
  { key: 'inbound_delivery_date', header: 'Delivery Date' },
  { key: 'create_time', header: 'Create Time' },
  { key: 'operate', header: 'Operate' },
  { key: 'note', header: 'Note' },
];

function Page() {
  const router = useRouter();
  const [refresh, setRefresh] = useState({});
  const defaultFormValue = {
    inbound_id: '',
    inbound_status: '',
    inbound_type: '',
    operator: '',
    inbound_delivery_date: '',
    inbound_purchase_order_no: '',
    inbound_supplier: '',
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
      inbound_delivery_date: moment(e[0]).format(),
    }));
  };
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     fetchWHNameMap({ pageNum: 1, pageSize: 999999 })
  //       .then((res) => {
  //         const map = res.list.reduce((acc, curr) => {
  //           acc[curr.id] = curr.name;
  //           return acc;
  //         }, {});

  //         localStorage.setItem('whNameMap', JSON.stringify(map));
  //       })
  //       .catch((error) => {
  //         console.error('Failed to fetch WH name map:', error);
  //       });
  //     fetchSLNameMap({ pageNum: 1, pageSize: 999999 })
  //       .then((res) => {
  //         const map = res.list.reduce((acc, curr) => {
  //           acc[curr.id] = curr.name;
  //           return acc;
  //         }, {});

  //         localStorage.setItem('slNameMap', JSON.stringify(map));
  //       })
  //       .catch((error) => {
  //         console.error('Failed to fetch SL name map:', error);
  //       });
  //     fetchWHSLNameMap({ pageNum: 1, pageSize: 999999 })
  //       .then((res) => {
  //         const locationMap = new Map();

  //         res.list.forEach((warehouse) => {
  //           warehouse.warehouseNamemap.forEach((location) => {
  //             locationMap.set(location.id, warehouse.id);
  //           });
  //         });

  //         const locationMapString = JSON.stringify(
  //           Array.from(locationMap.entries())
  //         );
  //         localStorage.setItem('location', locationMapString);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching warehouse data:', error);
  //       });
  //   }
  // }, []);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a
            onClick={() => {
              router.push(`${process.env.PATH_PREFIX}/`);
            }}
          >
            Home
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
          }}
        >
          Operation
        </BreadcrumbItem>
        <BreadcrumbItem
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
          className="cursor-pointer"
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
            id="inbound_id"
            placeholder="Id"
            value={formValue.inbound_id}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <DatePicker datePickerType="single" onChange={onDateChange}>
            <DatePickerInput
              placeholder="dd/mm/yyyy"
              labelText="Delivery date"
              id="inbound_delivery_date"
            />
          </DatePicker>
        </Column>

        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Purchase order No."
            id="inbound_purchase_order_no"
            placeholder="Purchase order No."
            value={formValue.inbound_purchase_order_no}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Supplier"
            id="inbound_supplier"
            placeholder="Supplier"
            value={formValue.inbound_supplier}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <Select
            className="flex-auto"
            id="inbound_status"
            defaultValue=""
            labelText="Status"
            value={formValue.inbound_status}
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
