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
import OperationDetailModal from '../Modal/OperationDetailModal';
import {
  deleteInbound,
  fetchInbound,
  fetchInboundWithFilter,
} from '@/actions/actions';
import { useRouter, useSearchParams } from 'next/navigation';
import moment from 'moment';
import { DateTimeFormat } from '@/utils/constants';
import { Icon, Email } from '@carbon/icons-react';
import AssignModal from '../Task/AssignModal';

function PutawayTable({ headers, refresh, setRefresh }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleDeleteRow = async (id) => {
    deleteInbound({ id }).then(() => setRefresh({}));
  };
  const [selectedId, setSelectedId] = useState('');
  const [rows, setRows] = useState([]);
  console.log(rows);
  useEffect(() => {
    const body = { inbound_status: 'pending' };
    fetchInboundWithFilter(body, {
      pageNum: page,
      pageSize,
    }).then((res) => {
      setRows(res.list);
      setTotal(res.total);
    });
  }, [page, pageSize, refresh]);
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');
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
  // const sortedRows = React.useMemo(() => {
  //   if (!sortKey) {
  //     return rows;
  //   }

  //   const sortedRows = [...rows];
  //   sortedRows.sort((a, b) => {
  //     if (a[sortKey] < b[sortKey]) {
  //       return sortDirection === 'asc' ? -1 : 1;
  //     }
  //     if (a[sortKey] > b[sortKey]) {
  //       return sortDirection === 'asc' ? 1 : -1;
  //     }
  //     return 0;
  //   });
  //   return sortedRows;
  // }, [rows, sortKey, sortDirection]);
  // const rowsToShow = sortedRows.slice((page - 1) * pageSize, page * pageSize);
  // const handleSort = (key) => {
  //   if (sortKey === key) {
  //     setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     setSortKey(key);
  //     setSortDirection('asc');
  //   }
  // };
  return (
    <div>
      <StructuredListWrapper isCondensed>
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
        <StructuredListBody>
          {rows.map((row, index) => (
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
                // if (header.key === 'storage_location') {
                //   return (
                //     <StructuredListCell
                //       key={header.key}
                //       className="truncate"
                //       title={row[header.key]}
                //       onClick={(e) => {
                //         e.currentTarget.classList.toggle('expanded');
                //       }}
                //     >
                //       {detailRows[row.id]?.storage_location || ''}
                //     </StructuredListCell>
                //   );
                // }
                if (header.key === 'material') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Link
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedId(row['inbound_id']);
                        }}
                      >
                        More
                      </Link>
                    </StructuredListCell>
                  );
                }
                if (header.key === 'operate') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Button
                        size="sm"
                        kind="secondary"
                        disabled={
                          row['inbound_status'].toLowerCase() === 'pending'
                            ? false
                            : true
                        }
                        onClick={() => {
                          router.push(
                            `${process.env.PATH_PREFIX}/operation/inbound/operate` +
                              '?' +
                              createQueryString('id', row.inbound_id)
                          );
                        }}
                      >
                        Inbound
                      </Button>
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
                if (header.key === 'resource') {
                  return (
                    <StructuredListCell key={header.key}>
                      {'xxxxx'}
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
                if (header.key === 'automation') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Button size="xs" kind="secondary" onClick={() => {}}>
                        <div className="mt-1.5 ml-[-8px] flex align-middle space-x-1">
                          <Email></Email>
                          <Heading className="text-[13px]">EmailRule</Heading>
                        </div>
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
      <OperationDetailModal
        id={selectedId}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      ></OperationDetailModal>
      <AssignModal
        isOpen={assignModalOpen}
        onClose={handleAssignModalClose}
        onConfirm={handleAssignModalConfirm}
      ></AssignModal>
    </div>
  );
}

export default PutawayTable;
