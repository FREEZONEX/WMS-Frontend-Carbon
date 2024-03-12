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
import StocktakingTable from '@/components/Table/StocktakingTable';
import {
  fetchStocktaking,
  fetchStocktakingWithFilter,
} from '@/actions/actions';

const headers = [
  // { key: 'id', header: 'ID' },
  { key: 'ref_id', header: 'Ref ID' },
  { key: 'type', header: 'Type' },
  { key: 'storage_location', header: 'Storage Location' },
  { key: 'operator', header: 'Operator' },
  { key: 'source', header: 'Source' },
  { key: 'status', header: 'Status' },
  { key: 'result', header: 'Result' },
  // { key: 'note', header: 'Note' },
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
      fetchStocktakingWithFilter(filteredFormValue).then((res) => setRows(res));
    } else {
      fetchStocktaking().then((res) => setRows(res));
    }
  };
  const handleRemoveFilters = () => {
    fetchStocktaking().then((res) => setRows(res));
    setFormValues({
      id: '',
      ref_id: '',
      status: '',
      type: '',
    });
  };
  useEffect(() => {
    fetchStocktaking().then((res) => setRows(res));
  }, [refresh]);
  console.log(formValue);
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/operation/inbound">Operation</BreadcrumbItem>
        <BreadcrumbItem href="/operation/stocktaking">
          Stocktaking
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">
            Stocktaking
          </Heading>
          <Heading className="mt-1 text-sm">
            Verify and adjust inventory accuracy
          </Heading>
        </div>
        <Button
          href="/operation/stocktaking/create"
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create a Stocktaking Order
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
          labelText="Stocktaking Type"
          value={formValue.type}
          onChange={onFormValueChange}
          required
        >
          <SelectItem disabled hidden value="" text="Choose an option" />
          <SelectItem value="cycle stock" text="Cycle Stock" />
          <SelectItem value="pipeline stock" text="Pipeline Stock" />
          <SelectItem value="mix stock" text="Mix Stock" />
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
        <StocktakingTable
          headers={headers}
          rows={rows}
          setRefresh={setRefresh}
        />
      </div>
    </div>
  );
}

export default Page;
