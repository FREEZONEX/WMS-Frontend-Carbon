import React, { useState } from 'react';
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
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  IconButton,
} from '@carbon/react';
import { Add, Subtract } from '@carbon/icons-react';

function TaskListTable({ headers }) {
  const defaultDetailValue = {
    name: '',
    product_code: '',
    specification: '',
    quantity: '',
    unit: '',
    expect_wh: '',
    expect_storage_location: '',
  };
  const [rows, setRows] = useState([]);
  return (
    <DataTable
      rows={rows}
      headers={headers}
      render={({
        rows,
        headers,
        getHeaderProps,
        getSelectionProps,
        onInputChange,
      }) => (
        <TableContainer>
          <TableToolbar>
            <TableToolbarContent>
              <TableToolbarSearch onChange={onInputChange} />
              <IconButton
                label="Add"
                onClick={() => {
                  setRows([...rows, defaultDetailValue]);
                }}
              >
                <Add />
              </IconButton>
              <IconButton label="Remove">
                <Subtract />
              </IconButton>
            </TableToolbarContent>
          </TableToolbar>
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
                    onChange={(checked) => {}}
                  />
                  {headers.map((header) => {
                    const cell = row.cells.find(
                      (cell) => cell.id.split(':')[1] === header.key
                    );
                    if (cell.id.split(':')[1] === 'name') {
                      return (
                        <TableCell key={header.key}>
                          <TextInput
                            className="w-40"
                            id={`name-${row.id}`}
                            value={cell.value}
                            onChange={(e) => {}}
                          ></TextInput>
                        </TableCell>
                      );
                    }
                    if (cell.id.split(':')[1] === 'product_code') {
                      return (
                        <TableCell key={header.key}>
                          <TextInput
                            className="w-40"
                            id={`product-code-${row.id}`}
                            value={cell.value}
                            onChange={(e) => {}}
                          ></TextInput>
                        </TableCell>
                      );
                    }
                    if (cell.id.split(':')[1] === 'quantity') {
                      return (
                        <TableCell key={header.key}>
                          <TextInput
                            className="w-20"
                            id={`quantity-${row.id}`}
                            value={cell.value}
                            onChange={(e) => {}}
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

export default TaskListTable;
