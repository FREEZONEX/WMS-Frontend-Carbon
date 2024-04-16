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

const headers = [
  { key: 'id', header: 'ID' },
  // { key: 'ref_id', header: 'Ref ID' },
  { key: 'type', header: 'Type' },
  { key: 'operator', header: 'Operator' },
  { key: 'source', header: 'Source' },
  { key: 'status', header: 'Status' },
  { key: 'result', header: 'Result' },
  { key: 'create_time', header: 'Create Time' },
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
  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     fetchWHNameMap({ pageNum: 1, pageSize: 999999 })
  //       .then((res) => {
  //         const map = res.list.reduce((acc, curr) => {
  //           acc[curr.id] = curr.name;
  //           return acc;
  //         }, {});

  //         localStorage.setItem('whNameMap', JSON.stringify(map));
  //       })
  //       .catch((error) => {
  //         console.error('Failed to fetch WH name map:', error);
  //       });
  //     fetchSLNameMap({ pageNum: 1, pageSize: 999999 })
  //       .then((res) => {
  //         const map = res.list.reduce((acc, curr) => {
  //           acc[curr.id] = curr.name;
  //           return acc;
  //         }, {});

  //         localStorage.setItem('slNameMap', JSON.stringify(map));
  //       })
  //       .catch((error) => {
  //         console.error('Failed to fetch SL name map:', error);
  //       });
  //     fetchWHSLNameMap({ pageNum: 1, pageSize: 999999 })
  //       .then((res) => {
  //         const warehouseListString = JSON.stringify(res.list);
  //         localStorage.setItem('whslNameMap', warehouseListString);
  //         const locationMap = new Map();

  //         res.list.forEach((warehouse) => {
  //           warehouse.warehouseNamemap.forEach((location) => {
  //             locationMap.set(location.id, warehouse.id);
  //           });
  //         });

  //         const locationMapString = JSON.stringify(
  //           Array.from(locationMap.entries())
  //         );
  //         localStorage.setItem('location', locationMapString);
  //       })
  //       .catch((error) => {
  //         console.error('Error fetching warehouse data:', error);
  //       });
  //   }
  // }, []);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a
            onClick={() => {
              router.push(`${process.env.PATH_PREFIX}/home`);
            }}
          >
            Home
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
          }}
        >
          Operation
        </BreadcrumbItem>
        <BreadcrumbItem
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
          labelText="Auditing Type"
          value={formValue.type}
          onChange={onFormValueChange}
          required
        >
          <SelectItem disabled hidden value="" text="Choose an option" />
          <SelectItem value="Dynamic" text="Dynamic" />
          <SelectItem value="Static" text="Static" />
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
