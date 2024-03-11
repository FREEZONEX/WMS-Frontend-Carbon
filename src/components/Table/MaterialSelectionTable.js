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
  TextInput,
} from '@carbon/react';

function MaterialSelectionTable({ headers, rows, onSelectionChange }) {
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
                      const quantity =
                        document.getElementById(`quantity-${row.id}`)?.value ||
                        0;
                      onSelectionChange(row.id, quantity, checked);
                    }}
                  />
                  {headers.map((header) => {
                    const cell = row.cells.find(
                      (cell) => cell.id.split(':')[1] === header.key
                    );
                    if (cell.id.split(':')[1] === 'quantity') {
                      return (
                        <TableCell key={header.key}>
                          <TextInput
                            className="w-20"
                            id={`quantity-${row.id}`}
                            value={cell.value}
                            onChange={(e) => {
                              const checked = getSelectionProps({
                                row,
                              }).checked;
                              onSelectionChange(
                                row.id,
                                'quantity',
                                e.target.value,
                                checked
                              );
                            }}
                          ></TextInput>
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

export default MaterialSelectionTable;
