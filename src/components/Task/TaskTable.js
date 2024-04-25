import React, { useState } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableContainer,
  TableCell,
  Tag,
  Button,
} from '@carbon/react';
import { TaskApproved } from '@carbon/icons-react';
import AssignModal from './AssignModal';

function TaskTable({ headers, rows }) {
  const [isOpen, setIsOpen] = useState(false);
  const onOpenAssign = () => {
    setIsOpen(true);
  };

  const onCloseAssignModal = () => {
    setIsOpen(false);
  };
  const onConfirmAssignModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header) => {
                if (header.key == 'assigned_to') {
                  return (
                    <TableHeader
                      style={{ width: '120px' }}
                      key={header.key}
                      header
                    >
                      {header.header}
                    </TableHeader>
                  );
                }
                return (
                  <TableHeader key={header.key} header>
                    {header.header}
                  </TableHeader>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                {headers.map((header) => {
                  if (header.key == 'assigned_to') {
                    if (row[header.key] == null) {
                      return (
                        <TableCell key={header.key}>
                          {/* <Button
                            size="sm"
                            className="h-[20px]"
                            onClick={onOpenAssign}>
                            Assign
                          </Button> */}
                          <TaskApproved onClick={onOpenAssign} />
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell key={header.key}>{row[header.key]}</TableCell>
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
      <AssignModal
        isOpen={isOpen}
        onClose={onCloseAssignModal}
        onConfirm={onConfirmAssignModal}
      ></AssignModal>
    </>
  );
}

export default TaskTable;
