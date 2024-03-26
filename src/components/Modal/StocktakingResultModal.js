'use client';
import React, { useState, useEffect } from 'react';
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
  Tag,
} from '@carbon/react';
import { fetchStocktakingDetails } from '@/actions/actions';
import WMSDataTable from '../Table/DataTable';
const headers = [
  { key: 'material_name', header: 'Material Name' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'stock_quantity', header: 'Stock Quantity' },
  { key: 'discrepancy', header: 'Discrepancy' },
];

function StocktakingResultModal({ isModalOpen, setModalOpen, ref_id }) {
  const [locationGroups, setlocationGroups] = useState([]);
  const [locations, setLocations] = useState([]);
  useEffect(() => {
    if (ref_id) {
      fetchStocktakingDetails({ ref_id })
        .then((data) => {
          console.log(data);
          const locationGroups = data.list.reduce((groups, item) => {
            const { storage_location } = item;
            if (!groups[storage_location]) {
              groups[storage_location] = [];
            }
            groups[storage_location].push(...item.inventory);
            return groups;
          }, {});
          const locations = Object.keys(locationGroups);
          console.log(locationGroups);
          setLocations(locations);
          setlocationGroups(locationGroups);
        })
        .catch((error) => {
          console.error('Failed to fetch stocktaking details:', error);
        });
    }
  }, [ref_id]);
  console.log(ref_id, locationGroups);
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
                <WMSDataTable
                  headers={headers}
                  rows={locationGroups[location]}
                />
                {/* <DataTable
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
                                {...getHeaderProps({ header })}>
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
                                  if (header.key === 'discrepancy') {
                                    return (
                                      <TableCell key={header.key}>
                                        <Tag
                                          type={
                                            parseInt(row[header.key]) < 0
                                              ? 'red'
                                              : parseInt(row[header.key]) === 0
                                              ? 'blue'
                                              : 'green'
                                          }>
                                          {row[header.key]}
                                        </Tag>
                                      </TableCell>
                                    );
                                  }
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
                /> */}
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      )}
    </Modal>
  );
}

export default StocktakingResultModal;
