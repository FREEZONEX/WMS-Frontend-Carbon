'use client';
import React from 'react';
import {
  Modal,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  TableSelectRow,
  TableSelectAll,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Heading,
  Button,
  IconButton,
} from '@carbon/react';
import { Add, Subtract } from '@carbon/icons-react';

const headers = [
  { key: 'productName', header: 'Product Name' },
  { key: 'carryingAmount', header: 'Carrying Amount' },
  { key: 'inventoriedAmount', header: 'Inventoried Amount' },
  { key: 'profitLossAmount', header: 'Profit and Loss Amount' },
];

const rows = [
  {
    id: '1',
    productName: 'Apple',
    carryingAmount: 1300,
    inventoriedAmount: 700,
    profitLossAmount: -600,
  },
  {
    id: '2',
    productName: 'Banana',
    carryingAmount: 200,
    inventoriedAmount: 500,
    profitLossAmount: 300,
  },
  {
    id: '3',
    productName: 'Orange',
    carryingAmount: 300,
    inventoriedAmount: 300,
    profitLossAmount: 0,
  },
  {
    id: '4',
    productName: 'Watermelon',
    carryingAmount: 500,
    inventoriedAmount: 525,
    profitLossAmount: 25,
  },
  {
    id: '5',
    productName: 'Pear',
    carryingAmount: 1200,
    inventoriedAmount: 1310,
    profitLossAmount: 110,
  },
];

function StocktakingResultModal({ isModalOpen, setModalOpen }) {
  return (
    <Modal
      open={isModalOpen}
      modalHeading="Result"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="lg"
    >
      <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
        The results of this inventory task are as follows:
      </Heading>
      <DataTable
        rows={rows}
        headers={headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getSelectionProps,
          onInputChange,
        }) => (
          <TableContainer>
            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                <IconButton className="mr-1" label="Add">
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
                    <TableHeader key={header} {...getHeaderProps({ header })}>
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
                        return (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      />
    </Modal>
  );
}

export default StocktakingResultModal;
