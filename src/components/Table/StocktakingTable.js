'use client';
import React, { useState, useEffect } from 'react';
import {
  HeaderGlobalAction,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Tag,
  Pagination,
  Link,
  Button,
} from '@carbon/react';
import { Edit, Delete } from '@carbon/icons-react';
import './_table.scss';
import {
  deleteStocktaking,
  fetchStocktaking,
  fetchStocktakingDetails,
  fetchStocktakingWithFilter,
} from '@/actions/actions';
import StocktakingResultModal from '../Modal/StocktakingResultModal';
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
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState('');

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
        console.log(filteredFormValue);
        fetchStocktakingWithFilter(filteredFormValue, {
          pageNum: page,
          pageSize,
        }).then((res) => {
          setRows(res.list);
          setTotal(res.total);
        });
      }
    } else {
      fetchStocktaking({ pageNum: page, pageSize }).then((res) => {
        setRows(res.list);
        setTotal(res.total);
      });
    }
  }, [page, pageSize, refresh, filters, isSearchClicked]);
  const [sortKey, setSortKey] = useState('');
  const [sortDirection, setSortDirection] = useState('desc');
  console.log(rows);
  return (
    <div>
      <StructuredListWrapper isCondensed>
        <StructuredListHead>
          <StructuredListRow head>
            {headers.map((header, index) => (
              <StructuredListCell
                head
                key={header.key}
                onClick={() => handleSort(header.key)}
              >
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
                if (header.key === 'status') {
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

                if (header.key === 'result') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Link
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedId(row['id']);
                        }}
                      >
                        View Detail
                      </Link>
                    </StructuredListCell>
                  );
                }
                if (header.key === 'create_time') {
                  return (
                    <StructuredListCell key={header.key}>
                      {row[header.key]?.split('T')[0]}
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
        id={selectedId}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      ></StocktakingResultModal>
    </div>
  );
}

export default StocktakingTable;
