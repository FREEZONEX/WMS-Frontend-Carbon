'use client';
import React from 'react';
import { DataTableSkeleton } from '@carbon/react';

function TableSkeleton({ headers }) {
  return (
    <DataTableSkeleton
      className="width-full"
      headers={headers}
      columnCount={headers.length}
      showHeader={false}
      showToolbar={false}
      compact={true}
      rowCount={10}
    />
  );
}

export default TableSkeleton;
