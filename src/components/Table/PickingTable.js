'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Pagination,
  Tag,
  Link,
  Button,
  Heading,
} from '@carbon/react';
import './_table.scss';
import MaterialModal from '../Task/MaterialModal';
import { getTask } from '@/actions/actions';
import moment from 'moment';
import { DateTimeFormat } from '@/utils/constants';
import { Icon, Email } from '@carbon/icons-react';
import AssignModal from '../Task/AssignModal';
import TableSkeleton from '../Skeleton/TableSkeleton';

function PickingTable({ headers, refresh, setRefresh }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [total, setTotal] = useState(0);
  const [selectedMaterials, setSelectedMaterials] = useState('');

  const [rows, setRows] = useState([]);
  console.log(rows);
  useEffect(() => {
    getTask({ pageNum: page, pageSize }, { type: 'pickup' }).then((res) => {
      setRows(res?.list);
      setTotal(res?.total);
      setLoading(false);
    });
  }, [page, pageSize, refresh]);

  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const handleAssignModalOpen = () => {
    setAssignModalOpen(true);
  };
  const handleAssignModalClose = () => {
    setAssignModalOpen(false);
  };
  const handleAssignModalConfirm = () => {
    setAssignModalOpen(false);
  };

  return (
    <div>
      {loading && <TableSkeleton headers={headers}></TableSkeleton>}
      <StructuredListWrapper isCondensed>
        {!loading && (
          <StructuredListHead>
            <StructuredListRow head className="headerRow">
              {headers.map((header, index) => (
                <StructuredListCell head key={header.key} onClick={() => {}}>
                  {header.header}
                  {sortKey === header.key && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </StructuredListCell>
              ))}
            </StructuredListRow>
          </StructuredListHead>
        )}
        <StructuredListBody>
          {rows?.map((row, index) => (
            <StructuredListRow key={index}>
              {headers.map((header) => {
                if (header.key === 'inbound_status') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Tag
                        type={
                          row[header.key].toLowerCase() === 'pending'
                            ? 'red'
                            : 'blue'
                        }
                      >
                        {row[header.key] === null ? '' : row[header.key]}
                      </Tag>
                    </StructuredListCell>
                  );
                }
                if (header.key === 'materials') {
                  return (
                    <StructuredListCell key={header.key}>
                      {row[header.key] &&
                        Object.keys(row[header.key]).join(',')}
                      <Link
                        className="ml-2"
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedMaterials(row[header.key]);
                        }}
                      >
                        More
                      </Link>
                    </StructuredListCell>
                  );
                }
                if (
                  header.key === 'create_time' ||
                  header.key === 'inbound_delivery_date'
                ) {
                  return (
                    <StructuredListCell key={header.key}>
                      {row[header.key] &&
                        moment(row[header.key]).format(
                          DateTimeFormat.shortDate
                        )}
                    </StructuredListCell>
                  );
                }
                if (header.key === 'resources') {
                  return (
                    <StructuredListCell key={header.key}>
                      {row[header.key] &&
                        Object.keys(row[header.key]).join(',')}
                    </StructuredListCell>
                  );
                }
                if (header.key === 'assigned_to') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Button
                        size="xs"
                        kind="secondary"
                        onClick={handleAssignModalOpen}
                      >
                        <Heading className="mt-1 ml-2 text-[13px]">
                          Click
                        </Heading>
                      </Button>
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
        }}
      />
      <MaterialModal
        materials={selectedMaterials}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      ></MaterialModal>
      <AssignModal
        isOpen={assignModalOpen}
        onClose={handleAssignModalClose}
        onConfirm={handleAssignModalConfirm}
      ></AssignModal>
    </div>
  );
}

export default PickingTable;
