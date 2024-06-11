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
import { useRouter } from 'next/navigation';
import '@/app/page.scss';

const headers = [
  { key: 'id', header: 'ID' },
  { key: 'type', header: 'Type' },
  { key: 'operator', header: 'Operator' },
  { key: 'source', header: 'Source' },
  { key: 'details', header: 'Result' },
  { key: 'status', header: 'Status' },
  { key: 'supplier', header: 'Supplier' },
  { key: 'create_time', header: 'Create Time' },
  { key: 'delivery_date', header: 'Deliver Time' },
  { key: 'note', header: 'Note' },
];

function Page() {
  const router = useRouter();
  const [refresh, setRefresh] = useState({});
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const defaultFormValue = {
    ref_id: '',
    status: '',
    type: '',
    warehouse_name: '',
  };
  const [formValue, setFormValues] = useState(defaultFormValue);
  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

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
            router.push(`${process.env.PATH_PREFIX}/operation/stocktaking`);
          }}
        >
          Auditing
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Auditing</Heading>
          <Heading className="mt-1 text-sm">
            Verify and adjust inventory accuracy
          </Heading>
        </div>
        <Button
          className="cds--btn-customize"
          onClick={() => {
            router.push(
              `${process.env.PATH_PREFIX}/operation/stocktaking/create`
            );
          }}
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create a Auditing Order
        </Button>
      </div>
      <div className="flex mt-20 space-x-4 items-end">
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
          labelText="Auditing Type"
          value={formValue.type}
          onChange={onFormValueChange}
          required
        >
          <SelectItem disabled hidden value="" text="Choose an option" />
          <SelectItem value="Dynamic Stocktaking" text="Dynamic" />
          <SelectItem value="Static Stocktaking" text="Static" />
        </Select>
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
        <TextInput
          className="flex-auto "
          labelText="Warehouse Name"
          id="warehouse_name"
          placeholder="Warehouse Name"
          value={formValue.warehouse_name}
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
        <StocktakingTable
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
