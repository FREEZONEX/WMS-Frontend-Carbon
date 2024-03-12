'use client';
import React, { useEffect, useState } from 'react';
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
import { fetchWarehouses, fetchWarehousesWithFilters } from '@/actions/actions';

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'warehouse_id', header: 'ID' },
  { key: 'type', header: 'Type' },
  { key: 'manager', header: 'Manager' },
  { key: 'project_group', header: 'Project Group' },
  { key: 'department', header: 'Department' },
  { key: 'email', header: 'Email' },
  { key: 'storage_location', header: 'Shelf Location' },
];

function Page() {
  const [formValue, setFormValues] = useState({
    name: '',
    warehouse_id: '',
    type: '',
    manager: '',
  });
  const onFormValueChange = (e) => {
    const { id, value } = e.target; // Destructure the name and value from the event target

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value, // Use the name to update the correct property
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
      fetchWarehousesWithFilters(filteredFormValue).then((res) => setRows(res));
    } else {
      fetchWarehouses().then((res) => setRows(res));
    }
  };
  const handleRemoveFilters = () => {
    fetchWarehouses().then((res) => setRows(res));
    setFormValues({
      name: '',
      warehouse_id: '',
      type: '',
      manager: '',
    });
  };
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const handleModalClose = () => {
    setCreateModalOpen(false);
  };
  const [rows, setRows] = useState([]);
  const [refresh, setRefresh] = useState({});

  useEffect(() => {
    fetchWarehouses().then((res) => setRows(res));
  }, [refresh]);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a href="/">Home</a>
        </BreadcrumbItem>
        <BreadcrumbItem href="/warehouse">Warehouse</BreadcrumbItem>
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
        <WarehouseTable headers={headers} rows={rows} setRefresh={setRefresh} />
      </div>
    </div>
  );
}

export default Page;
