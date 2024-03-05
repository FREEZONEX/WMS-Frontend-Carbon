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
  { key: 'shelfLocation', header: 'Shelf Location' },
  { key: 'occupied', header: 'Occupied' },
  { key: 'material', header: 'Material' },
];

const rows = [
  {
    id: '1',
    shelfLocation: 'E01',
    occupied: 'Yes',
    material: 'Apple',
    edit: 'Edit',
  },
  {
    id: '2',
    shelfLocation: 'E02',
    occupied: 'Yes',
    material: 'Apple',
    edit: 'Edit',
  },
  {
    id: '3',
    shelfLocation: 'E03',
    occupied: 'Yes',
    material: 'Apple',
    edit: 'Edit',
  },
  {
    id: '4',
    shelfLocation: 'E04',
    occupied: 'Yes',
    material: 'Apple',
    edit: 'Edit',
  },
  {
    id: '5',
    shelfLocation: 'E05',
    occupied: 'No',
    material: 'Apple',
    edit: 'Edit',
  },
];

function ShelfLocationModal({ isModalOpen, setModalOpen }) {
  return (
    <Modal
      open={isModalOpen}
      modalHeading="All Shelf Location"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="lg"
    >
      <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
        All shelf location under this warehouse.
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

export default ShelfLocationModal;
