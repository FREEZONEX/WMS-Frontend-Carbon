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
import StorageLocationPanel from '@/components/MobileComponents/Warehouse/StorageLocationPanel';
import WarehouseCardPanel from '@/components/MobileComponents/Warehouse/WarehouseCardPanel';
import { useRouter } from 'next/navigation';
import '@/app/page.scss';

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

  const [refresh, setRefresh] = useState({});
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const [showStorageLocation, setShowStorageLocation] = useState(false);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState({});

  const handleShowStorageLocation = (id, warehouse_id, name) => {
    setSelectedWarehouseInfo({
      id: id,
      warehouse_id: warehouse_id,
      warehouse_name: name,
    });
    setShowStorageLocation(true);
  };
  console.log(selectedWarehouseInfo);
  return (
    <div>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-1 text-[28px] font-normal">Warehouse</Heading>
          <Heading className="mt-1 text-sm">
            List of warehouses for your storage solutions
          </Heading>
          {!showStorageLocation && (
            <Button
              className="cds--btn-customize mt-3"
              onClick={() => {
                router.push(`${process.env.PATH_PREFIX}/warehouse/create`);
              }}
              isExpressive
              size="sm"
              renderIcon={Add}
            >
              Create a Warehouse
            </Button>
          )}
        </div>
      </div>

      {!showStorageLocation && (
        <>
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

          <div className="mt-3">
            <WarehouseCardPanel
              isSearchClicked={isSearchClicked}
              handleShowStorageLocation={handleShowStorageLocation}
            />
          </div>
        </>
      )}
      {showStorageLocation && (
        <StorageLocationPanel
          selectedWarehouseInfo={selectedWarehouseInfo}
          setShowStorageLocation={setShowStorageLocation}
        />
      )}
    </div>
  );
}

export default Page;
