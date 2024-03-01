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
} from '@carbon/react';
import { Edit, Delete } from '@carbon/icons-react';
import './_table.scss';

const rows = [
  {
    id: '01',
    code: 'Product#1',
    name: 'oil',
    type: 'Shell',
    unit: 'Tondasfw',
    note: '-asfffffffffffff',
  },
  {
    id: '02',
    code: 'Product#2',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '03',
    code: 'Product#3',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '04',
    code: 'Product#4',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '05',
    code: 'Product#5',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '06',
    code: 'Product#6',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '07',
    code: 'Product#7',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '08',
    code: 'Product#8',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '09',
    code: 'Product#9',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '10',
    code: 'Product#10',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '11',
    code: 'Product#11',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '12',
    code: 'Product#12',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
  {
    id: '13',
    code: 'Product#13',
    name: 'oil',
    type: 'Shell',
    unit: 'Ton',
    note: '-',
  },
];

function WMSTable({ headers }) {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  // Calculate the rows to show based on the current page and page size
  const rowsToShow = rows.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div>
      <StructuredListWrapper isCondensed>
        <StructuredListHead>
          <StructuredListRow head>
            {headers.map((header, index) => (
              <StructuredListCell head key={index}>
                {header}
              </StructuredListCell>
            ))}
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {rowsToShow.map((row, index) => (
            <StructuredListRow key={index}>
              <StructuredListCell>{row.id}</StructuredListCell>
              <StructuredListCell>{row.code}</StructuredListCell>
              <StructuredListCell>{row.name}</StructuredListCell>
              <StructuredListCell>{row.type}</StructuredListCell>
              <StructuredListCell>{row.unit}</StructuredListCell>
              <StructuredListCell>{row.note}</StructuredListCell>
              <StructuredListCell>
                <HeaderGlobalAction aria-label="Search">
                  <Edit size={15} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Search">
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
    </div>
  );
}

export default WMSTable;
