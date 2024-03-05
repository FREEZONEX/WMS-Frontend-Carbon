import React from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableContainer,
  TableCell,
  TableSelectRow,
  TableSelectAll,
} from '@carbon/react';

function WMSDataTable({ headers, rows }) {
  return (
    <DataTable rows={rows} headers={headers}>
      {({ rows, headers, getHeaderProps, getRowProps, getSelectionProps }) => (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />
                {headers.map((header, i) => (
                  <TableHeader
                    key={i}
                    {...getHeaderProps({
                      header,
                    })}
                  >
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => {
                return (
                  <TableRow
                    key={i}
                    {...getRowProps({
                      row,
                    })}
                  >
                    <TableSelectRow
                      {...getSelectionProps({
                        row,
                      })}
                    />
                    {row.cells.map((cell) => {
                      return <TableCell key={cell.id}>{cell.value}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </DataTable>
  );
}

export default WMSDataTable;
