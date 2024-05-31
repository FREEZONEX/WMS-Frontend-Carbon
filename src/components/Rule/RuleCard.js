'use client';
import '@/components/Task/_task.scss';
import React, { useState } from 'react';
import { Draggable } from '@carbon/icons-react';
import { Heading } from '@carbon/react';
import { Button } from '@/components/ui/button';
import RuleEditModal from './RuleEditModal';

function RuleCard({ rule, setRefresh }) {
  const [isOpen, setIsOpen] = useState(false);

  const onEdit = () => {
    setIsOpen(true);
  };
  const onModalClose = (isRefresh) => {
    if (isRefresh) {
      setRefresh({});
    }
    setIsOpen(false);
  };
  return (
    <>
      <div className="flex flex-row items-center space-x-3 w-full p-4 shadow rounded-md relative bg-white">
        <div>
          <Draggable className="w-[26px] h-[26px]" />
        </div>
        <div className="w-full space-y-2">
          <div className="flex flex-row justify-between">
            <Heading className="font-medium text-[20px]">{rule.name}</Heading>
            <Button
              className="bg-[#E0E0E0] w-[57px] h-[24px] rounded-none text-[#525252] hover:text-white"
              onClick={() => onEdit()}
            >
              Edit
            </Button>
          </div>
          <Heading className="font-bold text-[14px]">Conditions</Heading>
          <div className="flex space-x-6">
            <div>
              <span className="mr-2 ml-4 font-semibold">Task Type:</span>
              {rule.task_type}
            </div>
            <div>
              <span className="mr-2 ml-4 font-semibold">Warehouse:</span>
              {rule.warehouse_name}
            </div>
          </div>
          <div>
            <span className="mr-2 ml-4 font-semibold">Locations:</span>
            {rule.location_expression}
          </div>
          <Heading className="font-bold text-[14px]">Actions</Heading>
          <div>
            <div>
              <span className="mr-2 ml-4 font-semibold">Assign to:</span>
              {rule.people_name}
            </div>
            <div>
              <span className="mr-2 ml-4 font-semibold">Resources:</span>
              {rule.resource_name_list}
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <RuleEditModal
          isOpen={isOpen}
          onClose={(isRefresh) => onModalClose(isRefresh)}
          defaultValue={rule}
        ></RuleEditModal>
      )}
    </>
  );
}

export default RuleCard;
