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
} from '@carbon/react';
import { Edit, Delete } from '@carbon/icons-react';
import './_table.scss';
import { deleteStocktaking, fetchStocktakingDetails } from '@/actions/actions';
import StocktakingResultModal from '../Modal/StocktakingResultModal';

function StocktakingTable({ headers, rows, setRefresh }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const rowsToShow = rows.slice((page - 1) * pageSize, page * pageSize);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const handleDeleteRow = async (id) => {
    deleteStocktaking({ id }).then(() => setRefresh({}));
  };
  const [selectedMaterial, setSelectedMaterial] = useState([]);
  const [detailRows, setDetailRows] = useState({});

  useEffect(() => {
    const fetchDetails = async () => {
      const updatedRows = await Promise.all(
        rows.map(async (row) => {
          console.log({
            id: row.id,
            ref_id: row.ref_id,
          });
          const details = await fetchStocktakingDetails({
            id: row.id,
            ref_id: row.ref_id,
          });
          const storageLocations = [
            ...new Set(details.map((detail) => detail.storage_location)),
          ].join(', ');
          return {
            ...row,
            storage_location: storageLocations,
            material: details,
          };
        })
      );
      setDetailRows(
        updatedRows.reduce((acc, row) => {
          acc[row.id] = row;
          return acc;
        }, {})
      );
    };

    fetchDetails();
  }, [rows]);
  console.log(detailRows);
  return (
    <div>
      <StructuredListWrapper isCondensed>
        <StructuredListHead>
          <StructuredListRow head>
            {headers.map((header, index) => (
              <StructuredListCell head key={header.key}>
                {header.header}
              </StructuredListCell>
            ))}
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {rowsToShow.map((row, index) => (
            <StructuredListRow key={index}>
              {headers.map((header) => {
                if (header.key === 'status') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Tag type="blue">
                        {row[header.key] === '' ? 'Done' : row[header.key]}
                      </Tag>
                    </StructuredListCell>
                  );
                }
                if (header.key === 'storage_location') {
                  return (
                    <StructuredListCell key={header.key}>
                      {detailRows[row.id]?.storage_location || ''}
                    </StructuredListCell>
                  );
                }
                if (header.key === 'material') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Link
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedMaterial(
                            detailRows[row.id]?.material || []
                          );
                        }}
                      >
                        More
                      </Link>
                    </StructuredListCell>
                  );
                }
                if (header.key === 'result') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Link
                        onClick={() => {
                          setModalOpen(true);
                          setSelectedMaterial(
                            detailRows[row.id]?.material || []
                          );
                        }}
                      >
                        view Detail
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
              <StructuredListCell>
                <HeaderGlobalAction aria-label="Edit" disabled>
                  <Edit size={15} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="Delete"
                  onClick={() => handleDeleteRow(row.id)}
                >
                  <Delete size={15} />
                </HeaderGlobalAction>
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
        totalItems={rows.length}
        onChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
      />
      <StocktakingResultModal
        material={selectedMaterial}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      ></StocktakingResultModal>
    </div>
  );
}

export default StocktakingTable;
