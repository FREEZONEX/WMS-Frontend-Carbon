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
  console.log(rows);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableSelectAll />
            {headers.map((header) => (
              <TableHeader key={header.key} header>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableSelectRow
                onChange={(checked) => {
                  if (checked) {
                    setSelectedRows((prevSelectedRows) => [
                      ...prevSelectedRows,
                      row,
                    ]);
                  } else {
                    setSelectedRows((prevSelectedRows) =>
                      prevSelectedRows.filter(
                        (selectedRow) => selectedRow.id !== row.id
                      )
                    );
                  }
                }}
              />
              {headers.map((header) => {
                return (
                  <TableCell key={header.key}>
                    {row[header.key] ? row[header.key] : ''}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WMSDataTable;
