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
import TableSkeleton from '../Skeleton/TableSkeleton';

function InboundTable({
  headers,
  refresh,
  setRefresh,
  filters,
  isSearchClicked,
}) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [total, setTotal] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleDeleteRow = async (id) => {
    deleteInbound({ id }).then(() => setRefresh({}));
  };
  const [materials, setMaterials] = useState('');
  const [rows, setRows] = useState([]);
  const [detailRows, setDetailRows] = useState({});

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
        fetchInboundWithFilter(filteredFormValue, {
          pageNum: page,
          pageSize,
        }).then((res) => {
          setRows(res.list);
          setTotal(res.total);
          setLoading(false);
        });
      }
    } else {
      fetchInbound({ pageNum: page, pageSize }).then((res) => {
        setRows(res.list);
        setTotal(res.total);
        setLoading(false);
      });
    }
  }, [page, pageSize, refresh, filters, isSearchClicked]);
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <div>
      {loading && <TableSkeleton headers={headers} />}
      <StructuredListWrapper isCondensed>
        {!loading && (
          <StructuredListHead>
            <StructuredListRow head className="headerRow">
              {headers.map((header, index) => (
                <StructuredListCell head key={header.key} onClick={() => {}}>
                  {header.header}
                </StructuredListCell>
              ))}
            </StructuredListRow>
          </StructuredListHead>
        )}
        <StructuredListBody>
          {rows.map((row, index) => (
            <StructuredListRow key={index}>
              {headers.map((header) => {
                if (header.key === 'status') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Tag
                        type={
                          row[header.key] &&
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
                if (header.key === 'details') {
                  return (
                    <StructuredListCell key={header.key}>
                      {row[header.key] &&
                        row[header.key].map((m) => {
                          return m.material_name;
                        })}
                      <Link
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
                if (header.key === 'operate') {
                  return (
                    <StructuredListCell key={header.key} className="w-[100px]">
                      <Button
                        size="sm"
                        kind="secondary"
                        disabled={
                          row['status']?.toLowerCase() === 'pending'
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
                  header.key === 'delivery_date'
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
      <OperationDetailModal
        materials={materials}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      ></OperationDetailModal>
    </div>
  );
}

export default InboundTable;
