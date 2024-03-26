import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableContainer,
  TableCell,
  TextInput,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  IconButton,
  Checkbox,
} from '@carbon/react';
import { Add, Subtract, CheckmarkFilled } from '@carbon/icons-react';
import { fetchMaterial } from '@/actions/actions';
import './_table.scss';
import { usePathname } from 'next/navigation';

function TaskListTable({ headers, rows, setRows }) {
  const defaultDetailValue = {
    name: '',
    product_code: '',
    specification: '',
    quantity: '',
    unit: '',
    expect_wh_id: '',
    expact_stock_location_id: '',
  };
  const [loadingRows, setLoadingRows] = useState([]);
  const [successRows, setSuccessRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([0]);
  const whNameMap = JSON.parse(localStorage.getItem('whNameMap'));
  const slNameMap = JSON.parse(localStorage.getItem('slNameMap'));
  const whslMap = JSON.parse(localStorage.getItem('location'));
  const pathName = usePathname();
  const checkIsEdit = () => {
    if (
      pathName === `${process.env.PATH_PREFIX}/operation/inbound/create` ||
      pathName === `${process.env.PATH_PREFIX}/operation/outbound/create` ||
      pathName === `${process.env.PATH_PREFIX}/operation/stocktaking/create`
    ) {
      return false;
    }
    return true;
  };
  const handleBlurFetch = async (rowId, field, value) => {
    if (field === 'name' || field === 'product_code') {
      if (value !== '') {
        setLoadingRows((prevLoadingRows) => [...prevLoadingRows, rowId]);
        try {
          const materialData = await fetchMaterial({}, { [field]: value });
          console.log(materialData);
          if (materialData.list.length > 0) {
            const materialCurr = materialData.list[0];

            setRows((prevRows) =>
              prevRows.map((row, i) => {
                if (i === rowId) {
                  return {
                    name: materialCurr.name,
                    product_code: materialCurr.product_code,
                    specification: materialCurr.specification,
                    quantity: '',
                    unit: materialCurr.unit,
                    expect_wh_id: materialCurr.expect_wh_id.toString(),
                    expect_wh_name:
                      whNameMap[materialCurr.expect_wh_id.toString()],
                    expact_stock_location_id:
                      materialCurr.expact_stock_location_id.toString(),
                    expact_stock_location_name:
                      slNameMap[
                        materialCurr.expact_stock_location_id.toString()
                      ],
                  };
                }
                return row;
              })
            );
            setSuccessRows((prevSuccessRows) => [...prevSuccessRows, rowId]);
          } else {
            setSuccessRows((prevSuccessRows) =>
              prevSuccessRows.filter((id) => id !== rowId)
            );
            setRows((prevRows) =>
              prevRows.map((row, i) => {
                if (i === rowId) {
                  return defaultDetailValue;
                }
                return row;
              })
            );
          }
        } catch (error) {
          console.error('Failed to fetch material data:', error);
        }
        setLoadingRows((prevLoadingRows) =>
          prevLoadingRows.filter((id) => id !== rowId)
        );
      }
    }
  };

  const handleInputChange = (rowId, field, e) => {
    setRows((prevRows) =>
      prevRows.map((prevRow, i) => {
        if (i === rowId) {
          if (field === 'expact_stock_location_id') {
            const slName = slNameMap[e.target.value] || '';
            if (slName !== '') {
              const locationMap = new Map(whslMap);
              const getWarehouseId = (locationId) =>
                locationMap.get(locationId);
              const wh_id = getWarehouseId(e.target.value);
              const wh_name = whNameMap[wh_id];
              console.log(wh_id, wh_name);
              return {
                ...prevRow,
                expect_wh_id: wh_id,
                expect_wh_name: wh_name,
                [field]: e.target.value,
                expact_stock_location_name: slName,
              };
            }
            return {
              ...prevRow,
              [field]: e.target.value,
              expact_stock_location_name: slName,
            };
          } else {
            return {
              ...prevRow,
              [field]: e.target.value,
            };
          }
        }
        return prevRow;
      })
    );
    if (
      (field === 'name' || field === 'product_code') &&
      e.target.value === ''
    ) {
      setSuccessRows((prevSuccessRows) =>
        prevSuccessRows.filter((id) => id !== rowId)
      );
      setRows((prevRows) =>
        prevRows.map((row, i) => {
          if (i === rowId) {
            return defaultDetailValue;
          }
          return row;
        })
      );
    }
  };
  console.log(rows);
  const checkQuantity = (value) => {
    console.log('parse int check', parseInt(value), isNaN(value));
    if (value === '' || isNaN(value)) {
      return false;
    } else {
      return true;
    }
  };
  console.log(rows);
  return (
    <TableContainer>
      <TableToolbar>
        <TableToolbarContent>
          <TableToolbarSearch />
          <IconButton
            label="Add"
            onClick={() => {
              setRows([...rows, { ...defaultDetailValue, id: rows.length }]);
            }}
          >
            <Add />
          </IconButton>
          <IconButton
            label="Remove"
            onClick={() => {
              setRows((prevRows) =>
                prevRows.filter((row, i) => !selectedRows.includes(i))
              );
              setSelectedRows([]);
              setSuccessRows((prevRows) =>
                prevRows.filter((row, i) => !selectedRows.includes(i))
              );
              setLoadingRows((prevRows) =>
                prevRows.filter((row, i) => !selectedRows.includes(i))
              );
            }}
          >
            <Subtract />
          </IconButton>
        </TableToolbarContent>
      </TableToolbar>
      <Table>
        <TableHead>
          <TableRow
            onClick={() => {
              selectedRows.length === rows.length
                ? setSelectedRows([])
                : setSelectedRows(rows.map((row, i) => i));
            }}
          >
            {!checkIsEdit() && (
              <TableHeader>
                <Checkbox
                  checked={
                    selectedRows.length === rows.length &&
                    selectedRows.length != 0
                  }
                  onChange={(checked) =>
                    setSelectedRows(checked ? rows.map((row, i) => i) : [])
                  }
                />
              </TableHeader>
            )}
            {headers.map((header) => (
              <TableHeader key={header.key}>{header.header}</TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              key={i}
              onClick={() => {
                setSelectedRows((prevSelectedRows) =>
                  selectedRows.includes(i)
                    ? prevSelectedRows.filter((id) => id !== i)
                    : [...prevSelectedRows, i]
                );
              }}
            >
              {!checkIsEdit() && (
                <TableCell>
                  <Checkbox
                    checked={selectedRows.includes(i)}
                    onChange={(checked) => {
                      setSelectedRows((prevSelectedRows) =>
                        checked
                          ? [...prevSelectedRows, i]
                          : prevSelectedRows.filter((id) => id !== i)
                      );
                    }}
                  />
                </TableCell>
              )}
              {headers.map((header) => {
                if (header.key === 'name') {
                  console.log(
                    'row status',
                    rows,
                    loadingRows,
                    successRows,
                    selectedRows
                  );
                  return (
                    <TableCell key={header.key}>
                      {checkIsEdit() ? (
                        row[header.key]
                      ) : (
                        <div className="flex items-center w-48 gap-[0.5rem]">
                          <TextInput
                            className="w-40"
                            id={`name-${i}`}
                            value={row[header.key]}
                            onChange={(e) => {
                              handleInputChange(i, header.key, e);
                            }}
                            onBlur={(e) => {
                              handleBlurFetch(i, header.key, e.target.value);
                            }}
                          />
                          {loadingRows.includes(i) && (
                            <div className="loading-spinner" />
                          )}
                          {successRows.includes(i) && (
                            <CheckmarkFilled
                              color={
                                checkQuantity(row['quantity'])
                                  ? 'green'
                                  : '#c6c6c6'
                              }
                            />
                          )}
                        </div>
                      )}
                    </TableCell>
                  );
                }
                if (header.key === 'product_code') {
                  return (
                    <TableCell key={header.key}>
                      {checkIsEdit() ? (
                        row[header.key]
                      ) : (
                        <TextInput
                          className="w-40"
                          id={`product-code-${i}`}
                          value={row[header.key]}
                          onChange={(e) => {
                            handleInputChange(i, header.key, e);
                          }}
                          onBlur={(e) => {
                            handleBlurFetch(i, header.key, e.target.value);
                          }}
                        />
                      )}
                    </TableCell>
                  );
                }
                if (header.key === 'quantity') {
                  return (
                    <TableCell key={header.key}>
                      {checkIsEdit() ? (
                        row[header.key]
                      ) : (
                        <TextInput
                          className="w-20"
                          id={`quantity-${i}`}
                          value={row[header.key]}
                          onChange={(e) => {
                            setRows((prevRows) =>
                              prevRows.map((prevRow, index) => {
                                if (index === i) {
                                  return {
                                    ...prevRow,
                                    quantity: e.target.value,
                                  };
                                }
                                return prevRow;
                              })
                            );
                          }}
                        />
                      )}
                    </TableCell>
                  );
                }
                if (header.key === 'expect_wh_id') {
                  return (
                    <TableCell key={header.key}>
                      {whNameMap[row[header.key]]}
                    </TableCell>
                  );
                }
                if (header.key === 'expact_stock_location_id') {
                  return (
                    <TableCell key={header.key}>
                      {checkIsEdit() ? (
                        slNameMap[row[header.key]]
                      ) : (
                        <TextInput
                          className="w-40"
                          id={`expact-stock-location-id-${i}`}
                          value={row.expact_stock_location_name || ''}
                          onChange={(e) => {
                            handleInputChange(i, header.key, e);
                          }}
                        />
                      )}
                    </TableCell>
                  );
                }
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

export default TaskListTable;
