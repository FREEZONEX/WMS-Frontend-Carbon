import React, { useState, useEffect } from 'react';
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
  Pagination,
} from '@carbon/react';
import { fetchMaterial } from '@/actions/actions';

function MaterialSelectionTable({ headers, onSelectionChange }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    fetchMaterial({ pageNum: page, pageSize }, {}).then((res) => {
      console.log(res);
      setRows(res.list);
      setTotal(res.total);
    });
  }, [page, pageSize]);
  return (
    <>
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
                        const quantity =
                          document.getElementById(`quantity-${row.id}`)
                            ?.value || 0;

                        onSelectionChange(
                          row.cells.find(
                            (cell) => cell.id.split(':')[1] === 'product_code'
                          ).value,
                          row.cells.find(
                            (cell) => cell.id.split(':')[1] === 'name'
                          ).value,
                          'quantity',
                          quantity,
                          checked
                        );
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
                                  row.cells.find(
                                    (cell) =>
                                      cell.id.split(':')[1] === 'product_code'
                                  ).value,
                                  row.cells.find(
                                    (cell) => cell.id.split(':')[1] === 'name'
                                  ).value,
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
      <Pagination
        backwardText="Previous page"
        forwardText="Next page"
        itemsPerPageText="Items per page:"
        page={page}
        pageNumberText="Page Number"
        pageSize={pageSize}
        pageSizes={[5, 10, 20, 30, 40, 50]}
        totalItems={total}
        onChange={({ page, pageSize }) => {
          setPage(page);
          setPageSize(pageSize);
        }}
      />
    </>
  );
}

export default MaterialSelectionTable;
