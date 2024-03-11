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
  TableSelectRow,
  TableSelectAll,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Heading,
  IconButton,
  TextInput,
  Button,
} from '@carbon/react';
import { Add, Subtract } from '@carbon/icons-react';
import {
  addStorageLocation,
  deleteStorageLocation,
  fetchStorageLocationsByWId,
} from '@/actions/actions';

const headers = [
  { key: 'name', header: 'Shelf Location' },
  { key: 'occupied', header: 'Occupied' },
  { key: 'material', header: 'Material' },
];

function ShelfLocationModal({ isModalOpen, setModalOpen, warehouse_info }) {
  const [rows, setRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isCreate, setIsCreate] = useState(false);
  const [formValue, setFormValues] = useState({
    name: '',
  });

  console.log(warehouse_info);
  const onFormValueChange = (e) => {
    const { id, value } = e.target; // Destructure the name and value from the event target

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value, // Use the name to update the correct property
    }));
  };
  useEffect(() => {
    if (isModalOpen && warehouse_info?.shelf_location) {
      setRows(warehouse_info.shelf_location);
    }
  }, [isModalOpen, warehouse_info]);

  const handleAddShelfLocation = () => {
    console.log();
    addStorageLocation({
      warehouse_id: warehouse_info.id,
      name: formValue.name,
    }).then(() => {
      setIsCreate(false);
      setFormValues({
        name: '',
      });
      fetchStorageLocationsByWId({
        warehouse_id: warehouse_info.warehouse_id,
      }).then((res) => setRows(res));
    });
  };
  const handleDeleteSelectedRows = () => {
    console.log(selectedRows);
    const deletePromises = selectedRows.map((row) =>
      deleteStorageLocation({ id: row.id })
    );

    Promise.all(deletePromises)
      .then(() => {
        setSelectedRows([]);
        fetchStorageLocationsByWId({ warehouse_id: warehouse_info.id }).then(
          (res) => setRows(res)
        );
      })
      .catch((error) => {
        console.error('Delete Storage Location Error:', error);
      });
  };
  return (
    <Modal
      open={isModalOpen}
      modalHeading="All Shelf Location"
      passiveModal
      onRequestClose={() => setModalOpen(false)}
      size="lg"
    >
      {!isCreate && (
        <>
          <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
            All shelf location under this warehouse - {warehouse_info.id} -
            {warehouse_info.warehouse_name}.
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
                    <IconButton
                      className="mr-1"
                      label="Add"
                      onClick={() => {
                        setIsCreate(true);
                      }}
                    >
                      <Add />
                    </IconButton>
                    <IconButton
                      label="Remove"
                      onClick={handleDeleteSelectedRows}
                    >
                      <Subtract />
                    </IconButton>
                  </TableToolbarContent>
                </TableToolbar>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableSelectAll {...getSelectionProps()} />
                      {headers.map((header) => (
                        <TableHeader
                          key={header.key}
                          {...getHeaderProps({ header })}
                        >
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
        </>
      )}
      {isCreate && (
        <div>
          <Heading className="text-sm font-normal leading-tight tracking-tight mb-3">
            Add a shelf Location
          </Heading>
          <TextInput
            labelText="Name"
            id="name"
            placeholder="Name"
            value={formValue.name}
            onChange={onFormValueChange}
          />
          <div className="flex space-x-4 mt-4 justify-center ">
            <Button size="sm" onClick={handleAddShelfLocation}>
              Save
            </Button>
            <Button
              size="sm"
              kind="tertiary"
              onClick={() => {
                setIsCreate(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ShelfLocationModal;
