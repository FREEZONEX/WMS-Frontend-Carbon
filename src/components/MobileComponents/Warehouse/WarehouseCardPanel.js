'use client';
import React, { useState, useEffect } from 'react';
import {
  deleteWarehouse,
  fetchWarehouses,
  fetchWarehousesWithFilters,
} from '@/actions/actions';
import ShowMessageModal from '@/components/Modal/ShowMessageModal';
import WarehouseCard from './WarehouseCard';

function WarehouseCardPanel({ handleShowStorageLocation, isSearchClicked }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9999);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (isSearchClicked) {
      const filteredFormValue = Object.entries(filters).reduce(
        (acc, [key, value]) => {
          if (value !== '') {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      if (Object.entries(filteredFormValue).length > 0) {
        fetchWarehousesWithFilters(filteredFormValue, {
          pageNum: page,
          pageSize,
        }).then((res) => {
          setRows(res.list);
        });
      }
    } else {
      fetchWarehouses({ pageNum: page, pageSize }).then((res) => {
        setRows(res.list);
      });
    }
  }, [isSearchClicked, page, pageSize]);

  const handleDeleteRow = async (id) => {
    ShowMessageModal.showConfirm('Are you sure to delete?', () => {
      deleteWarehouse(id).then((res) => setRefresh({}));
    });
  };

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => (
        <WarehouseCard
          key={row.id}
          warehouse={row}
          handleDeleteRow={handleDeleteRow}
          handleShowStorageLocation={handleShowStorageLocation}
        ></WarehouseCard>
      ))}
    </div>
  );
}

export default WarehouseCardPanel;
