'use client';
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  HeaderGlobalAction,
} from '@carbon/react';
import { Add, Search, CloseOutline } from '@carbon/icons-react';
import MaterialTable from '@/components/Table/MaterialTable';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'product_code', header: 'Material Code' },
  { key: 'name', header: 'Material Name' },
  { key: 'product_type', header: 'Material Type' },
  { key: 'unit', header: 'Unit' },
  { key: 'max', header: 'Max Stock' },
  { key: 'min', header: 'Min Stock' },
  { key: 'status', header: 'Status' },
  { key: 'note', header: 'Note' },
];

function Page() {
  const defaultFormValue = {
    product_code: '',
    name: '',
    product_type: '',
  };
  const [formValue, setFormValues] = useState(defaultFormValue);
  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const [refresh, setRefresh] = useState({});
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href={`${process.env.PATH_PREFIX}/`}>Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href={`${process.env.PATH_PREFIX}/warehouse`}>
          Warehouse
        </BreadcrumbItem>
        <BreadcrumbItem href={`${process.env.PATH_PREFIX}/warehouse/material`}>
          Material
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Material</Heading>
          <Heading className="mt-1 text-sm">
            Input materials details for inventory management
          </Heading>
        </div>
        <div>
          <Button
            href={`${process.env.PATH_PREFIX}/warehouse/material/rfid`}
            className="mr-2 bg-[#6929C4]"
            isExpressive
            size="sm"
            renderIcon={Search}
          >
            RFID Tag
          </Button>
          <Button
            href={`${process.env.PATH_PREFIX}/warehouse/material/create`}
            isExpressive
            size="sm"
            renderIcon={Add}
          >
            Create a Material
          </Button>
        </div>
      </div>
      <div className="flex mt-20 space-x-4 items-end">
        <TextInput
          className="flex-auto w-20"
          labelText="Material Code"
          id="product_code"
          placeholder="Material Code"
          value={formValue.product_code}
          onChange={onFormValueChange}
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Material Name"
          id="name"
          placeholder="Material Name"
          value={formValue.name}
          onChange={onFormValueChange}
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Material Type"
          id="product_type"
          placeholder="Material Type"
          value={formValue.product_type}
          onChange={onFormValueChange}
        />
        <HeaderGlobalAction
          aria-label="Search"
          onClick={() => setIsSearchClicked(true)}
        >
          <Search size={16} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Remove Filters"
          onClick={() => {
            setIsSearchClicked(false);
            setFormValues(defaultFormValue);
          }}
        >
          <CloseOutline size={16} />
        </HeaderGlobalAction>
      </div>
      <div className="mt-12">
        <MaterialTable
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
