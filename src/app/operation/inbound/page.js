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
} from '@carbon/react';
import { Add, Search, CloseOutline } from '@carbon/icons-react';
import InboundTable from '@/components/Table/InboundTable';
import { fetchInbound, fetchInboundWithFilter } from '@/actions/actions';

const headers = [
  // { key: 'id', header: 'ID' },
  { key: 'ref_id', header: 'Ref ID' },
  { key: 'type', header: 'Type' },
  { key: 'storage_location', header: 'Storage Location' },
  { key: 'operator', header: 'Operator' },
  { key: 'source', header: 'Source' },
  { key: 'status', header: 'Status' },
  { key: 'material', header: 'Material' },
  { key: 'note', header: 'Note' },
];

function Page() {
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState({});

  const [formValue, setFormValues] = useState({
    // id: '',
    ref_id: '',
    status: '',
    type: '',
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
      fetchInboundWithFilter(filteredFormValue).then((res) => setRows(res));
    } else {
      fetchInbound().then((res) => setRows(res));
    }
  };
  const handleRemoveFilters = () => {
    fetchInbound().then((res) => setRows(res));
    setFormValues({
      id: '',
      ref_id: '',
      status: '',
      type: '',
    });
  };
  useEffect(() => {
    fetchInbound().then((res) => setRows(res));
  }, [refresh]);
  console.log(formValue);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/operation/inbound">Operation</BreadcrumbItem>
        <BreadcrumbItem href="/operation/inbound">Inbound</BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Inbound</Heading>
          <Heading className="mt-1 text-sm">
            Description of Inbound view goes here.
          </Heading>
        </div>
        <Button
          href="/operation/inbound/create"
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create an Inbound List
        </Button>
      </div>
      <div className="flex mt-20 space-x-4 items-end">
        {/* <TextInput
          className="flex-auto "
          labelText="Id"
          id="id"
          placeholder="Id"
          value={formValue.id}
          onChange={onFormValueChange}
        /> */}
        <TextInput
          className="flex-auto "
          labelText="Ref Id"
          id="ref_id"
          placeholder="Ref Id"
          value={formValue.ref_id}
          onChange={onFormValueChange}
        />
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
        <Select
          className="flex-auto"
          id="status"
          defaultValue=""
          labelText="Status"
          value={formValue.status}
          onChange={onFormValueChange}
          disabled
          required
        >
          <SelectItem disabled hidden value="" text="Choose an option" />
          <SelectItem value="Done" text="Done" />
          <SelectItem value="Executing" text="Executing" />
          <SelectItem value="To-do" text="To-do" />
        </Select>
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
        <InboundTable headers={headers} rows={rows} setRefresh={setRefresh} />
      </div>
    </div>
  );
}

export default Page;
