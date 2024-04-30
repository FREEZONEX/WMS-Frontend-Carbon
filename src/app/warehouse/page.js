'use client';
import React, { Suspense, useEffect, useState } from 'react';
import {
  TextInput,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  HeaderGlobalAction,
} from '@carbon/react';
import { Add, Search, CloseOutline } from '@carbon/icons-react';
import WarehouseTable from '@/components/Table/WarehouseTable';
import CreateWarehouseModal from '@/components/Modal/CreateWarehouseModal';
import { useRouter } from 'next/navigation';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'warehouse_id', header: 'ID' },
  { key: 'type', header: 'Type' },
  { key: 'manager', header: 'Manager' },
  { key: 'project_group', header: 'Project Group' },
  { key: 'department', header: 'Department' },
  { key: 'email', header: 'Email' },
  { key: 'storage_location', header: 'Storage Location' },
];

function Page() {
  const router = useRouter();
  const defaultFormValue = {
    name: '',
    warehouse_id: '',
    type: '',
    manager: '',
  };
  const [formValue, setFormValue] = useState(defaultFormValue);
  const onFormValueChange = (e) => {
    const { id, value } = e.target; // Destructure the name and value from the event target

    setFormValue((prevValues) => ({
      ...prevValues,
      [id]: value, // Use the name to update the correct property
    }));
  };

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const handleModalClose = () => {
    setCreateModalOpen(false);
  };

  const [refresh, setRefresh] = useState({});
  const [isSearchClicked, setIsSearchClicked] = useState(false);
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
            router.push(`${process.env.PATH_PREFIX}/warehouse`);
          }}
        >
          Warehouse
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Warehouse</Heading>
          <Heading className="mt-1 text-sm">
            List of warehouses for your storage solutions
          </Heading>
        </div>
        <Button
          onClick={() => {
            setCreateModalOpen(true);
          }}
          isExpressive
          size="sm"
          renderIcon={Add}
        >
          Create a Warehouse
        </Button>
        <CreateWarehouseModal
          isOpen={isCreateModalOpen}
          onClose={handleModalClose}
          setRefresh={setRefresh}
        />
      </div>
      <div className="flex mt-20 space-x-4 items-end">
        <TextInput
          className="flex-auto w-5"
          labelText="Warehouse Id"
          id="warehouse_id"
          placeholder="Id"
          value={formValue.warehouse_id}
          onChange={onFormValueChange}
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Name"
          id="name"
          placeholder="Name"
          value={formValue.name}
          onChange={onFormValueChange}
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Type"
          id="type"
          placeholder="Type"
          value={formValue.type}
          onChange={onFormValueChange}
        />
        <TextInput
          className="flex-auto w-20"
          labelText="Manager"
          id="manager"
          placeholder="Manager"
          value={formValue.manager}
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
            setFormValue(defaultFormValue);
          }}
        >
          <CloseOutline size={16} />
        </HeaderGlobalAction>
      </div>

      <div className="mt-12">
        <WarehouseTable
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
