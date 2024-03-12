'use client';
import React, { useState } from 'react';
import {
  HeaderGlobalAction,
  StructuredListWrapper,
  StructuredListHead,
  StructuredListRow,
  StructuredListCell,
  StructuredListBody,
  Pagination,
  Link,
} from '@carbon/react';
import { Edit, Delete } from '@carbon/icons-react';
import './_table.scss';
import EditMaterialModal from '../Modal/EditMaterialModal';
import { deleteMaterial } from '@/actions/actions';
import StorageLocationModal from '../Modal/StorageLocationModal';

function MaterialTable({ headers, rows, setRefresh }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const rowsToShow = rows.slice((page - 1) * pageSize, page * pageSize);

  const [editRow, setEditRow] = useState({});
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState([]);
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
            <StructuredListRow key={row.id}>
              {headers.map((header) => {
                if (header.key === 'storage_location') {
                  return (
                    <StructuredListCell key={header.key}>
                      <Link
                        onClick={() => {
                          console.log(row);
                          setModalOpen(true);
                          setSelectedMaterial(row);
                        }}
                      >
                        Storage location details
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
                <HeaderGlobalAction aria-label="Edit">
                  <Edit size={15} onClick={() => handleEditRow(row)} />
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
        onChange={({ page }) => setPage(page)}
      />
      <EditMaterialModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        materialValues={editRow}
        setRefresh={setRefresh}
        setMaterialValues={setEditRow}
      />
      <StorageLocationModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
        material_info={selectedMaterial}
      ></StorageLocationModal>
    </div>
  );
}

export default MaterialTable;
