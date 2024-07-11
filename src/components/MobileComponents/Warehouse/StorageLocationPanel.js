'use client';
import React, { useState, useEffect } from 'react';
import {
  deleteWarehouse,
  deleteStorageLocation,
  fetchStorageLocationsByWId,
} from '@/actions/actions';
import { TextInput, Heading, Button, Search } from '@carbon/react';
import { ArrowLeft, Add } from '@carbon/icons-react';
import ShowMessageModal from '@/components/Modal/ShowMessageModal';
import StorageLocationCard from './StorageLocationCard';
import AddStorageLocationForm from './AddStorageLocationForm';
import { useRouter } from 'next/navigation';

function StorageLocationPanel({
  selectedWarehouseInfo,
  setShowStorageLocation,
}) {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [showAddStorageLocation, setShowAddStorageLocation] = useState(false);
  const [refresh, setRefresh] = useState({});
  useEffect(() => {
    if (selectedWarehouseInfo) {
      fetchStorageLocationsByWId(
        {
          warehouse_id: selectedWarehouseInfo.id,
        },
        { pageNum: page, pageSize }
      ).then((res) => {
        setRows(res.list);
      });
    }
  }, [selectedWarehouseInfo, page, pageSize, refresh]);

  console.log(rows);

  const handleDeleteRow = (id) => {
    console.log(id);
    ShowMessageModal.showConfirm(
      'Are you sure to delete this storage location?',
      () => {
        deleteStorageLocation({ id: id }).then(() => {
          fetchStorageLocationsByWId({
            warehouse_id: selectedWarehouseInfo.id,
          }).then((res) => setRows(res.list));
        });
      }
    );
  };

  return (
    <div className="mt-[30px]">
      {!showAddStorageLocation && (
        <>
          <div
            className="flex"
            onClick={() => {
              setShowStorageLocation(false);
            }}
          >
            <ArrowLeft width="14px" height="14px" />
            <Heading className="text-[#525252] text-sm font-normal leading-[12px] tracking-[0.16px]">
              Home
            </Heading>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-[6px] mt-[1rem]">
              <Heading className="text-[18px] font-normal">
                All Storage Locations
              </Heading>
              <Heading className="text-sm">
                Under {selectedWarehouseInfo.warehouse_name}
              </Heading>
            </div>
            <Button
              style={{
                backgroundColor: '#0F62FE',
                color: 'white',
              }}
              size="md"
              renderIcon={Add}
              hasIconOnly
              onClick={() => {
                setShowAddStorageLocation(true);
              }}
            />
          </div>
          <Search
            className="mt-[1rem] mb-[1rem]"
            size="md"
            placeholder="Find your items"
            labelText="Search"
            closeButtonLabelText="Clear search input"
            id="search-1"
            onChange={() => {}}
            onKeyDown={() => {}}
          />
          <div className="flex flex-col gap-2">
            {rows.map((row) => (
              <StorageLocationCard
                key={row.id}
                storageLocation={row}
                handleDeleteRow={handleDeleteRow}
              ></StorageLocationCard>
            ))}
          </div>
        </>
      )}
      {showAddStorageLocation && (
        <AddStorageLocationForm
          warehouse={selectedWarehouseInfo}
          setShowAddStorageLocation={setShowAddStorageLocation}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
}

export default StorageLocationPanel;
