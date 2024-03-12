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
    <DataTable
      rows={rows}
      headers={headers}
      render={({ rows, headers, getHeaderProps, getSelectionProps }) => (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableSelectAll {...getSelectionProps()} />
                {headers.map((header) => (
                  <TableHeader key={header.key} {...getHeaderProps({ header })}>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableSelectRow
                    {...getSelectionProps({ row })}
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
                    const cell = row.cells.find(
                      (cell) => cell.id.split(':')[1] === header.key
                    );
                    if (cell.id.split(':')[1] === 'occupied') {
                      return (
                        <TableCell key={header.key}>
                          {cell ? (cell.value ? 'true' : 'false') : ''}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={header.key}>
                        {cell ? cell.value : ''}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    />
  );
}

export default WMSDataTable;
