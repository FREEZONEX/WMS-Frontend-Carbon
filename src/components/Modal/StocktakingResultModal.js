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
  Heading,
} from '@carbon/react';

const headers = [
  { key: 'materialName', header: 'Material Name' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'stock_quantity', header: 'Stock Quantity' },
  { key: 'discrepancy', header: 'Discrepancy' },
  { key: 'storage_location', header: 'Storage Location' },
];

function StocktakingResultModal({ isModalOpen, setModalOpen, material }) {
  console.log(material);
  const rows = material.flatMap((item, itemIndex) =>
    item.inventory.map((inventory, inventoryIndex) => ({
      id: `${itemIndex}-${inventoryIndex}`,
      materialName: inventory.material_name,
      quantity: inventory.quantity,
      stock_quantity: inventory.stock_quantity,
      discrepancy: inventory.discrepancy,
      storage_location: item.storage_location,
    }))
  );
  console.log(rows);
  return (
    <Modal
      open={isModalOpen}
      modalHeading="Result"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="lg"
    >
      <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
        The following products entered the designated warehouse in this inbound
        task.
      </Heading>
      <DataTable
        rows={rows}
        headers={headers}
        render={({ headers, getHeaderProps, getRowProps, onInputChange }) => (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader key={header} {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      {headers.map((header) => {
                        return (
                          <TableCell key={header.key}>
                            {row[header.key]}
                          </TableCell>
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
