'use client';
import React, { Suspense, useEffect, useState } from 'react';
import {
  TextInput,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  HeaderGlobalAction,
  Grid,
  Column,
} from '@carbon/react';
import { Add, Search, CloseOutline } from '@carbon/icons-react';
import WarehouseTable from '@/components/Table/WarehouseTable';
import CreateWarehouseModal from '@/components/Modal/CreateWarehouseModal';
import { useRouter } from 'next/navigation';
import '@/app/page.scss';
import { hasPermission } from '@/utils/utils';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'warehouse_id', header: 'ID' },
  { key: 'type', header: 'Type' },
  { key: 'manager', header: 'Manager' },
  { key: 'project_group', header: 'Project Group' },
  { key: 'department', header: 'Department' },
  { key: 'email', header: 'Email' },
  { key: 'storage_location', header: 'Storage Location' },
  { key: 'operation', header: 'Operation' },
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
            List of warehouses for your storage solutions1
          </Heading>
        </div>
        <Button
          className="cds--btn-customize"
          onClick={() => {
            setCreateModalOpen(true);
          }}
          isExpressive
          size="sm"
          renderIcon={Add}
          disabled={!hasPermission()}
        >
          Create a Warehouse
        </Button>
        <CreateWarehouseModal
          isOpen={isCreateModalOpen}
          onClose={handleModalClose}
          setRefresh={setRefresh}
        />
      </div>

      <Grid className="p-0 mt-[50px] gap-[9px]">
        <Column className="ml-0 " sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto"
            labelText="Warehouse Id"
            id="warehouse_id"
            placeholder="Id"
            value={formValue.warehouse_id}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0 " sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto"
            labelText="Name"
            id="name"
            placeholder="Name"
            value={formValue.name}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0 " sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto"
            labelText="Type"
            id="type"
            placeholder="Type"
            value={formValue.type}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0 " sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto"
            labelText="Manager"
            id="manager"
            placeholder="Manager"
            value={formValue.manager}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0 " sm={1} md={1} lg={1}>
          <HeaderGlobalAction
            aria-label="Search"
            onClick={() => setIsSearchClicked(!isSearchClicked)}
          >
            <Search size={16} />
          </HeaderGlobalAction>
        </Column>
        <Column className="ml-0 " sm={1} md={1} lg={1}>
          <HeaderGlobalAction
            aria-label="Remove Filters"
            onClick={() => {
              setIsSearchClicked(!isSearchClicked);
              setFormValue(defaultFormValue);
              console.log('isclick', isSearchClicked);
            }}
          >
            <CloseOutline size={16} />
          </HeaderGlobalAction>
        </Column>
      </Grid>

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
