'use client';
import React, { useState, useEffect } from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Pagination,
  Tag,
  IconButton,
} from '@carbon/react';
import { Edit, Delete } from '@carbon/icons-react';
import './_table.scss';
import EditMaterialModal from '../Modal/EditMaterialModal';
import {
  deleteMaterial,
  fetchMaterial,
  fetchMaterialWithFilters,
} from '@/actions/actions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import './_table.scss';

function MaterialTable({
  headers,
  refresh,
  setRefresh,
  filters,
  isSearchClicked,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [editRow, setEditRow] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  // const [isModalOpen, setModalOpen] = useState(false);
  // const [selectedMaterial, setSelectedMaterial] = useState([]);
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
        fetchMaterialWithFilters(filteredFormValue, {
          pageNum: page,
          pageSize,
        }).then((res) => {
          setRows(res.list);
          setTotal(res.total);
        });
      }
    } else {
      fetchMaterial({ pageNum: page, pageSize }, {}).then((res) => {
        setRows(res.list);
        setTotal(res.total);
      });
    }
  }, [page, pageSize, refresh, isSearchClicked]);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleEditRow = (row) => {
    setEditRow(row);
    setEditModalOpen(true);
  };
  const handleDeleteRow = async (id) => {
    deleteMaterial({ id }).then((res) => setRefresh({}));
  };
  return (
    <div>
      <StructuredListWrapper isCondensed>
        <StructuredListHead>
          <StructuredListRow head className="headerRow">
            {headers.map((header, index) => (
              <StructuredListCell head key={header.key}>
                {header.header}
              </StructuredListCell>
            ))}
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {rows.map((row, index) => (
            <StructuredListRow key={row.id}>
              {headers.map((header) => {
                if (header.key === 'product_type') {
                  return (
                    <StructuredListCell key={header.key}>
                      {row[header.key] === 'FIFO' ? (
                        <RadioGroup defaultValue="FIFO">
                          <div className="flex align-middle">
                            <RadioGroupItem disabled value={row[header.key]} />
                            <span className="ml-2 text-sky-600 font-semibold">
                              {row[header.key]}
                            </span>
                          </div>
                        </RadioGroup>
                      ) : (
                        <span className="ml-2">{row[header.key]}</span>
                      )}
                    </StructuredListCell>
                  );
                }
                if (header.key === 'status') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Tag
                        type={row[header.key] === 'Inactive' ? 'red' : 'blue'}
                      >
                        {row[header.key] === null ? '' : row[header.key]}{' '}
                      </Tag>
                    </StructuredListCell>
                  );
                }
                return (
                  <StructuredListCell key={header.key}>
                    {row[header.key]}
                  </StructuredListCell>
                );
              })}
              <StructuredListCell>
                <IconButton size="xs" kind="ghost" className="mr-[0.5rem]">
                  <Edit size={15} onClick={() => handleEditRow(row)} />
                </IconButton>
                <IconButton
                  size="xs"
                  kind="ghost"
                  onClick={() => handleDeleteRow(row.id)}
                >
                  <Delete size={15} />
                </IconButton>
              </StructuredListCell>
            </StructuredListRow>
          ))}
        </StructuredListBody>
      </StructuredListWrapper>
      <Pagination
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        page={page}
        pageNumberText="Page Number"
        pageSize={pageSize}
        pageSizes={[5, 10, 20, 30, 40, 50]}
        totalItems={total}
        onChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
      />
      <EditMaterialModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        materialValues={editRow}
        setRefresh={setRefresh}
        setMaterialValues={setEditRow}
      />
      {/* <StorageLocationModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        material_info={selectedMaterial}></StorageLocationModal> */}
    </div>
  );
}

export default MaterialTable;
