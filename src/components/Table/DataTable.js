import React from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableContainer,
  TableCell,
  Tag,
} from '@carbon/react';

function WMSDataTable({ headers, rows }) {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableHeader key={header.key} header>
                {header.header}
              </TableHeader>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
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
                        }
                      >
                        {row[header.key]}
                      </Tag>
                    </TableCell>
                  );
                }
                return (
                  <TableCell key={header.key}>{row[header.key]}</TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default WMSDataTable;
