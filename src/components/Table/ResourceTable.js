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

const rows = [
  {
    resource_id: 'S#24022901',
    resource_name: 'Resource 1',
    status: 'Active',
    starting_time: '2021-09-01',
    end_time: '2021-09-01',
  },
  {
    resource_id: 'S#24022902',
    resource_name: 'Resource 2',
    status: 'Inactive',
    starting_time: '2021-09-01',
    end_time: '2021-09-01',
  },
  {
    resource_id: 'S#24022903',
    resource_name: 'Resource 3',
    status: 'Active',
    starting_time: '2021-09-01',
    end_time: '2021-09-01',
  },
  {
    resource_id: 'S#24022904',
    resource_name: 'Resource 4',
    status: 'Active',
    starting_time: '2021-09-01',
    end_time: '2021-09-01',
  },
  {
    resource_id: 'S#24022905',
    resource_name: 'Resource 5',
    status: 'Inactive',
    starting_time: '2021-09-01',
    end_time: '2021-09-01',
  },
];
function ResourceTable({ headers, refresh, setRefresh }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const handleDeleteRow = async (id) => {
    deleteInbound({ id }).then(() => setRefresh({}));
  };
  //   const [rows, setRows] = useState([]);
  //   console.log(rows);
  useEffect(() => {}, [page, pageSize, refresh]);

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
          {rows.map((row, index) => (
            <StructuredListRow key={index}>
              {headers.map((header) => {
                if (header.key === 'status') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Tag
                        type={
                          row[header.key].toLowerCase() === 'inactive'
                            ? 'red'
                            : 'blue'
                        }
                      >
                        {row[header.key] === null ? '' : row[header.key]}
                      </Tag>
                    </StructuredListCell>
                  );
                }
                if (
                  header.key === 'starting_time' ||
                  header.key === 'end_time'
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
    </div>
  );
}

export default ResourceTable;
