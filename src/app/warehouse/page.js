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
  Select,
  SelectItem,
  Search,
} from '@carbon/react';
import { Add, CloseOutline } from '@carbon/icons-react';
import WarehouseTable from '@/components/Table/WarehouseTable';
import CreateWarehouseModal from '@/components/Modal/CreateWarehouseModal';
import WarehouseCard from '@/components/MobileComponents/Warehouse/WarehouseCard';
import { useRouter } from 'next/navigation';
import '@/app/page.scss';

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
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-1 text-[28px] font-normal">Warehouse</Heading>
          <Heading className="mt-1 text-sm">
            List of warehouses for your storage solutions
          </Heading>
          <Button
            className="cds--btn-customize mt-3"
            onClick={() => {
              setCreateModalOpen(true);
            }}
            isExpressive
            size="sm"
            renderIcon={Add}
          >
            Create a Warehouse
          </Button>
        </div>

        <CreateWarehouseModal
          isOpen={isCreateModalOpen}
          onClose={handleModalClose}
          setRefresh={setRefresh}
        />
      </div>

      <div className="flex flex-col mt-[50px] gap-[9px]">
        <div className="flex w-full gap-1">
          <Select
            className="w-1/2"
            id="type"
            defaultValue=""
            hideLabel={true}
            value={formValue.type}
            onChange={onFormValueChange}
          >
            <SelectItem text="Type" hidden />
            <SelectItem value="" text="None" />
            <SelectItem value="Option 2" text="Option 2" />
            <SelectItem value="Option 3" text="Option 3" />
            <SelectItem value="Option 4" text="Option 4" />
          </Select>
          <Select
            className="w-1/2"
            id="manager"
            defaultValue=""
            hideLabel={true}
            value={formValue.manager}
            onChange={onFormValueChange}
          >
            <SelectItem text="Manager" hidden />
            <SelectItem value="" text="None" />
            <SelectItem value="Option 2" text="Option 2" />
            <SelectItem value="Option 3" text="Option 3" />
            <SelectItem value="Option 4" text="Option 4" />
          </Select>
        </div>
        <div className="flex w-full gap-1">
          <Search
            size="lg"
            placeholder="Find your items"
            labelText="Search"
            closeButtonLabelText="Clear search input"
            id="search-1"
            onChange={() => {}}
            onKeyDown={() => {}}
          />
          <Button
            style={{ backgroundColor: '#0F62FE', color: 'white' }}
            renderIcon={Add}
            iconDescription="WarehouseID, Name ..."
            hasIconOnly
          />
        </div>
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
