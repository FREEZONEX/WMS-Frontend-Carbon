'use client';
import React, { useState } from 'react';
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
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
} from '@carbon/react';

const headers = [
  { key: 'material_name', header: 'Material Name' },
  { key: 'quantity', header: 'Quantity' },
];

function ProductModal({ isModalOpen, setModalOpen, material }) {
  console.log(material);

  const locationGroups = material.reduce((groups, item) => {
    const { storage_location } = item;
    if (!groups[storage_location]) {
      groups[storage_location] = [];
    }
    groups[storage_location].push(...item.inventory);
    return groups;
  }, {});
  const locations = Object.keys(locationGroups);
  console.log(locationGroups);
  return (
    <Modal
      open={isModalOpen}
      modalHeading="All Material"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="lg"
    >
      <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
        The following meterils entered the designated warehouse in this task.
      </Heading>
      {locations.length !== 0 && (
        <Tabs>
          <TabList aria-label="List of tabs" contained>
            {locations.map((location, index) => (
              <Tab key={index}>{location}</Tab>
            ))}
          </TabList>
          <TabPanels>
            {locations.map((location, index) => (
              <TabPanel key={index}>
                <DataTable
                  rows={locationGroups[location]}
                  headers={headers}
                  render={({ headers, getHeaderProps }) => (
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            {headers.map((header) => (
                              <TableHeader
                                key={header}
                                {...getHeaderProps({ header })}
                              >
                                {header.header}
                              </TableHeader>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {locationGroups[location].map((row, index) => {
                            return (
                              <TableRow key={index}>
                                {headers.map((header) => {
                                  return (
                                    <TableCell key={header.key}>
                                      {row[header.key.toLowerCase()]}
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
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </Modal>
  );
}

export default ProductModal;
