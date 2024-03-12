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
import OutboundTable from '@/components/Table/OutboundTable';
import { fetchOutbound, fetchOutboundWithFilter } from '@/actions/actions';

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
      fetchOutboundWithFilter(filteredFormValue).then((res) => setRows(res));
    } else {
      fetchOutbound().then((res) => setRows(res));
    }
  };
  const handleRemoveFilters = () => {
    fetchOutbound().then((res) => setRows(res));
    setFormValues({
      id: '',
      ref_id: '',
      status: '',
      type: '',
    });
  };
  useEffect(() => {
    fetchOutbound().then((res) => setRows(res));
  }, [refresh]);
  console.log(formValue);
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
          labelText="Outbound Type"
          value={formValue.type}
          onChange={onFormValueChange}
          required
        >
          <SelectItem disabled hidden value="" text="Choose an option" />
          <SelectItem value="material outbound" text="Material Outbound" />
          <SelectItem value="product outbound" text="Product Outbound" />
          <SelectItem value="mix outbound" text="Mix Outbound" />
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
        <OutboundTable headers={headers} rows={rows} setRefresh={setRefresh} />
      </div>
    </div>
  );
}

export default Page;
