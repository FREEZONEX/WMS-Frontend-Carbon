'use client';
import React, { useState, useEffect } from 'react';
import {
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Tag,
  Pagination,
  Link,
} from '@carbon/react';
import './_table.scss';
import { fetchStocktaking } from '@/actions/actions';
import StocktakingResultModal from '../Modal/StocktakingResultModal';
import moment from 'moment';
import { DateTimeFormat } from '@/utils/constants';
import TableSkeleton from '../Skeleton/TableSkeleton';

function StocktakingTable({
  headers,
  refresh,
  setRefresh,
  filters,
  isSearchClicked,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    let filteredFormValue = {};
    filteredFormValue = Object.entries(filters).reduce((acc, [key, value]) => {
      if (value !== '') {
        acc[key] = value;
      }
      return acc;
    }, {});
    fetchStocktaking(filteredFormValue, { pageNum: page, pageSize }).then(
      (res) => {
        if (res) {
          setRows(res.list);
          setTotal(res.total);
          setLoading(false);
        }
      }
    );
  }, [page, pageSize, refresh, filters, isSearchClicked]);
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');

  return (
    <div>
      {loading && <TableSkeleton headers={headers}></TableSkeleton>}
      <StructuredListWrapper isCondensed>
        {!loading && (
          <StructuredListHead>
            <StructuredListRow head className="headerRow">
              {headers.map((header, index) => (
                <StructuredListCell
                  head
                  key={header.key}
                  // onClick={() => handleSort(header.key)}
                >
                  {header.header}
                  {/* {sortKey === header.key && (
                    <span>{sortDirection === 'asc' ? ' ▲' : ' ▼'}</span>
                  )} */}
                </StructuredListCell>
              ))}
            </StructuredListRow>
          </StructuredListHead>
        )}
        <StructuredListBody>
          {rows?.map((row, index) => (
            <StructuredListRow key={index}>
              {headers.map((header) => {
                if (header.key === 'status') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Tag
                        type={
                          row[header.key]?.toLowerCase() === 'pending'
                            ? 'red'
                            : 'blue'
                        }
                      >
                        {row[header.key] === null ? '' : row[header.key]}
                      </Tag>
                    </StructuredListCell>
                  );
                }

                if (header.key === 'details') {
                  return (
                    <Link
                      key={header.key}
                      className="ml-2"
                      onClick={() => {
                        setModalOpen(true);
                        setDetails(row[header.key]);
                      }}
                    >
                      View Detail
                    </Link>
                  );
                }
                if (
                  header.key === 'create_time' ||
                  header.key == 'delivery_date'
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
                if (header.key === 'details') {
                  return (
                    <StructuredListCell
                      key={header.key}
                      className="flex justify-between"
                    >
                      <div className="w-[100px] text-nowrap whitespace-nowrap overflow-hidden text-ellipsis">
                        {row[header.key] &&
                          row[header.key].map((m) => {
                            return m.material_name;
                          })}
                      </div>
                      <Link
                        className="ml-2 mr-2"
                        onClick={() => {
                          setModalOpen(true);
                          setMaterials(row[header.key]);
                        }}
                      >
                        More
                      </Link>
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
      <StocktakingResultModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        details={details}
      ></StocktakingResultModal>
    </div>
  );
}

export default StocktakingTable;
