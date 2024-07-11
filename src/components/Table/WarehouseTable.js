'use client';
import React, { useState, useEffect } from 'react';
import {
  HeaderGlobalAction,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Link,
  IconButton,
  Pagination,
} from '@carbon/react';
import { Edit, Delete, DataTable } from '@carbon/icons-react';
import './_table.scss';
import ShelfLocationModal from '../Modal/ShelfLocationModal';
import {
  deleteWarehouse,
  fetchWarehouses,
  fetchWarehousesWithFilters,
} from '@/actions/actions';
import EditWarehouseModal from '../Modal/EditWarehouseModal';
import TableSkeleton from '../Skeleton/TableSkeleton';
import ShowMessageModal from '../Modal/ShowMessageModal';
import WarehouseCard from '../MobileComponents/Warehouse/WarehouseCard';

function WarehouseCardPanel({
  headers,
  refresh,
  setRefresh,
  filters,
  isSearchClicked,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9999);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  //const rowsToShow = rows.slice((page - 1) * pageSize, page * pageSize);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editRow, setEditRow] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState({});
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
          setTotal(res.total);
        });
      }
    } else {
      fetchWarehouses({ pageNum: page, pageSize }).then((res) => {
        setRows(res.list);
        setTotal(res.total);
        setLoading(false);
      });
    }
  }, [page, pageSize, refresh, isSearchClicked, filters]);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleEditRow = (row) => {
    setEditRow(row);
    setEditModalOpen(true);
  };

  const handleDeleteRow = async (id) => {
    ShowMessageModal.showConfirm('Are you sure to delete?', () => {
      deleteWarehouse(id).then((res) => setRefresh({}));
    });
  };
  const handleShowShelves = (id, warehouse_id, name) => {
    setSelectedWarehouseInfo({
      id: id,
      warehouse_id: warehouse_id,
      warehouse_name: name,
    });
    setModalOpen(true);
  };
  console.log(rows);

  return (
    <div className="flex flex-col gap-2">
      {rows.map((row) => (
        <WarehouseCard
          key={row.id}
          warehouse={row}
          handleDeleteRow={handleDeleteRow}
        ></WarehouseCard>
      ))}
    </div>
  );
}

export default WarehouseCardPanel;
