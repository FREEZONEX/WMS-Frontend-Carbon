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
  Link,
} from '@carbon/react';
import { TaskApproved } from '@carbon/icons-react';
import AssignModal from './AssignModal';
import moment from 'moment';
import { DateTimeFormat } from '@/utils/constants';
import MaterialModal from './MaterialModal';

function TaskTable({ headers, rows }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setModalOpen] = React.useState(false);
  const [selectedMaterials, setSelectedMaterials] = useState('');
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
                // if (header.key == 'assigned_to') {
                //   return (
                //     <TableHeader
                //       style={{ width: '120px' }}
                //       key={header.key}
                //       header>
                //       {header.header}
                //     </TableHeader>
                //   );
                // }
                return (
                  <TableHeader key={header.key} header>
                    {header.header}
                  </TableHeader>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, i) => (
              <TableRow key={i}>
                {headers.map((header) => {
                  // if (header.key == 'assigned_to') {
                  //   if (row[header.key] == null) {
                  //     return (
                  //       <TableCell key={header.key}>
                  //         <Button
                  //           size="sm"
                  //           kind="secondary"
                  //           onClick={onOpenAssign}
                  //         >
                  //           Click
                  //         </Button>
                  //         {/* <TaskApproved onClick={onOpenAssign} /> */}
                  //       </TableCell>
                  //     );
                  //   }
                  //   return (
                  //     <TableCell key={header.key}>{row[header.key]}</TableCell>
                  //   );
                  // }
                  if (header.key == 'create_time') {
                    return (
                      <TableCell
                        key={header.key}
                        style={{ width: header.width }}
                      >
                        {row[header.key] &&
                          moment(row[header.key]).format(
                            DateTimeFormat.shortDate
                          )}
                      </TableCell>
                    );
                  }
                  if (header.key == 'materials') {
                    return (
                      <TableCell
                        key={header.key}
                        style={{ width: header.width }}
                      >
                        <div className="flex justify-between">
                          <div className="w-[100px] text-nowrap whitespace-nowrap overflow-hidden text-ellipsis">
                            {row[header.key] &&
                              Object.keys(row[header.key]).join(',')}
                          </div>
                          <Link
                            className="ml-2"
                            onClick={() => {
                              setModalOpen(true);
                              setSelectedMaterials(row[header.key]);
                            }}
                          >
                            More
                          </Link>
                        </div>
                      </TableCell>
                    );
                  }
                  if (header.key == 'resources') {
                    return (
                      <TableCell
                        key={header.key}
                        style={{ width: header.width }}
                      >
                        <div className="overflow-hidden text-nowrap  whitespace-nowrap text-ellipsis">
                          {row[header.key] &&
                            Object.values(row[header.key]).join(',')}
                        </div>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell key={header.key} style={{ width: header.width }}>
                      {row[header.key]}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <MaterialModal
        materials={selectedMaterials}
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      ></MaterialModal>
      <AssignModal
        isOpen={isOpen}
        onClose={onCloseAssignModal}
        onConfirm={onConfirmAssignModal}
      ></AssignModal>
    </>
  );
}

export default TaskTable;
