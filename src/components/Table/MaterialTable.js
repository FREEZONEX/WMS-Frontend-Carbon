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
  CheckboxGroup,
  Checkbox,
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
import TableSkeleton from '../Skeleton/TableSkeleton';
import ShowMessageModal from '../Modal/ShowMessageModal';
import { hasPermission } from '@/utils/utils';

function MaterialTable({
  headers,
  refresh,
  setRefresh,
  filters,
  isSearchClicked,
  setMaterialCodes,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [editRow, setEditRow] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const filteredFormValue = Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value !== '') {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    fetchMaterialWithFilters(filteredFormValue, {
      pageNum: page,
      pageSize,
    }).then((res) => {
      setRows(res.list);
      setTotal(res.total);
      setLoading(false);
    });
  }, [page, pageSize, refresh, isSearchClicked, filters]);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };
  const handleEditRow = (row) => {
    setEditRow(row);
    setEditModalOpen(true);
  };
  const handleDeleteRow = async (id) => {
    ShowMessageModal.showConfirm('Are you sure to delete this item?', () => {
      deleteMaterial({ id }).then((res) => setRefresh({}));
    });
  };
  const checkboxOnChange = (event, { checked, id }) => {
    if (id == 'checkbox-all') {
      const codes = [];
      const checks = document.getElementsByClassName('cds--checkbox');
      console.log(checks);
      if (checked) {
        for (let i = 0; i < checks.length; i++) {
          checks[i].checked = true;
          if (checks[i].defaultValue) {
            codes.push(checks[i].defaultValue);
          }
        }
        setMaterialCodes(codes);
      } else {
        for (let i = 0; i < checks.length; i++) {
          checks[i].checked = false;
        }
        setMaterialCodes([]);
      }
    } else {
      const signleCheck = document.getElementById(id);
      if (checked) {
        setMaterialCodes((prev) => [...prev, signleCheck.defaultValue]);
      } else {
        setMaterialCodes((prev) =>
          prev.filter((t) => t != signleCheck.defaultValue)
        );
      }
    }
  };
  return (
    <div>
      {loading && <TableSkeleton headers={headers} />}
      <StructuredListWrapper isCondensed>
        {!loading && (
          <StructuredListHead>
            <StructuredListRow head className="headerRow">
              <StructuredListCell>
                <Checkbox id="checkbox-all" onChange={checkboxOnChange} />
              </StructuredListCell>
              {headers.map((header, index) => (
                <StructuredListCell head key={header.key}>
                  {header.header}
                </StructuredListCell>
              ))}
            </StructuredListRow>
          </StructuredListHead>
        )}
        <StructuredListBody>
          {rows.map((row, index) => (
            <StructuredListRow key={row.id}>
              <StructuredListCell>
                <Checkbox
                  id={`checkbox-${row.id}`}
                  hideLabel={true}
                  defaultValue={row['material_code']}
                  onChange={checkboxOnChange}
                />
              </StructuredListCell>
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
                if (header.key == 'operation') {
                  return (
                    <StructuredListCell key={header.key} className="w-[100px]">
                      <IconButton
                        size="xs"
                        kind="ghost"
                        className="mr-[0.5rem]"
                        disabled={!hasPermission()}
                      >
                        <Edit size={15} onClick={() => handleEditRow(row)} />
                      </IconButton>
                      <IconButton
                        size="xs"
                        kind="ghost"
                        onClick={() => handleDeleteRow(row.id)}
                        disabled={!hasPermission()}
                      >
                        <Delete size={15} />
                      </IconButton>
                    </StructuredListCell>
                  );
                }
                return (
                  <StructuredListCell key={header.key}>
                    {row[header.key]}
                  </StructuredListCell>
                );
              })}
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
          checkboxOnChange(null, { checked: false, id: 'checkbox-all' });
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
