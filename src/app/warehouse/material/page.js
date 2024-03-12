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
import { fetchMaterial, fetchMaterialWithFilters } from '@/actions/actions';

const headers = [
  { key: 'product_code', header: 'Material Code' },
  { key: 'name', header: 'Material Name' },
  { key: 'product_type', header: 'Material Type' },
  { key: 'unit', header: 'Unit' },
  { key: 'note', header: 'Note' },
];

function Page() {
  const [formValue, setFormValues] = useState({
    product_code: '',
    name: '',
    product_type: '',
  });
  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const handleSeachRows = () => {
    const filteredFormValue = Object.entries(formValue).reduce(
      (acc, [key, value]) => {
        if (value !== '') {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    if (Object.entries(filteredFormValue).length > 0) {
      fetchMaterialWithFilters(filteredFormValue).then((res) => setRows(res));
    } else {
      fetchMaterial().then((res) => setRows(res));
    }
  };
  const handleRemoveFilters = () => {
    fetchMaterial().then((res) => setRows(res));
    setFormValues({
      product_code: '',
      name: '',
      product_type: '',
    });
  };
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState({});

  useEffect(() => {
    fetchMaterial().then((res) => setRows(res));
  }, [refresh]);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/warehouse">Warehouse</BreadcrumbItem>
        <BreadcrumbItem href="/warehouse/material">Material</BreadcrumbItem>
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
            href="/warehouse/material/rfid"
            className="mr-2 bg-[#6929C4]"
            isExpressive
            size="sm"
            renderIcon={Search}
          >
            RFID Tag
          </Button>
          <Button
            href="/warehouse/material/create"
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
        <HeaderGlobalAction aria-label="Search" onClick={handleSeachRows}>
          <Search size={16} />
        </HeaderGlobalAction>
        <HeaderGlobalAction
          aria-label="Remove Filters"
          onClick={handleRemoveFilters}
        >
          <CloseOutline size={16} />
        </HeaderGlobalAction>
      </div>
      <div className="mt-12">
        <MaterialTable headers={headers} rows={rows} setRefresh={setRefresh} />
      </div>
    </div>
  );
}

export default Page;
