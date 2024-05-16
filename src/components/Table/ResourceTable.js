'use client';
import './_table.scss';

import React, { useState, useEffect, useCallback } from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Pagination,
  IconButton,
} from '@carbon/react';
import { Edit, Delete } from '@carbon/icons-react';

import moment from 'moment';
import { DateTimeFormat } from '@/utils/constants';
import AddEditResourceModal from '../Task/resource/AddEditResourceModal';

import { deleteResource, getResource } from '@/actions/actions';
function ResourceTable({ refresh, setRefresh }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const headers = [
    { header: 'Resource ID', key: 'id', width: '150px' },
    { header: 'Resource Name', key: 'name', width: 'auto' },
    { header: 'Type', key: 'type', width: '150px' },
    { header: 'Create Time', key: 'create_time', width: '150px' },
    { header: 'Update Time', key: 'update_time', width: '150px' },
    { header: 'Operation', key: 'operation', width: '100px' },
  ];

  useEffect(() => {
    getResource({
      pageNum: page,
      pageSize,
    })
      .then((res) => {
        setRows(res.list);
        setTotal(res.total);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [page, pageSize, refresh]);

  const onEditRow = (row) => {
    setSelectedItem(row);
    console.log(row);
    setIsOpen(true);
  };
  const onDeleteRow = async (id) => {
    deleteResource({ id }).then(() => setRefresh({}));
  };

  const handleRefresh = () => {
    setIsOpen(false);
    setRefresh({});
  };

  return (
    <div>
      <StructuredListWrapper isCondensed>
        <StructuredListHead>
          <StructuredListRow head className="headerRow">
            {headers.map((header, index) => (
              <StructuredListCell head key={header.key} onClick={() => {}}>
                {header.header}
              </StructuredListCell>
            ))}
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {rows &&
            rows.map((row, index) => (
              <StructuredListRow key={index}>
                {headers.map((header) => {
                  if (
                    header.key === 'create_time' ||
                    header.key === 'update_time'
                  ) {
                    return (
                      <StructuredListCell
                        key={header.key}
                        style={{ width: header.width }}
                      >
                        {row[header.key] &&
                          moment(row[header.key]).format(
                            DateTimeFormat.shortDate
                          )}
                      </StructuredListCell>
                    );
                  }
                  if (header.key == 'operation') {
                    return (
                      <StructuredListCell
                        key={header.key}
                        style={{ width: header.width }}
                      >
                        <IconButton
                          size="xs"
                          kind="ghost"
                          className="mr-[0.5rem]"
                        >
                          <Edit size={15} onClick={() => onEditRow(row)} />
                        </IconButton>
                        <IconButton
                          size="xs"
                          kind="ghost"
                          onClick={() => onDeleteRow(row.id)}
                        >
                          <Delete size={15} />
                        </IconButton>
                      </StructuredListCell>
                    );
                  }
                  return (
                    <StructuredListCell
                      key={header.key}
                      style={{ width: header.width }}
                    >
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
        }}
      />
      <AddEditResourceModal
        isOpen={isOpen}
        isEdit={true}
        defaultValue={selectedItem}
        onRefresh={handleRefresh}
        onClose={() => {
          setIsOpen(false);
        }}
      ></AddEditResourceModal>
    </div>
  );
}

export default ResourceTable;
