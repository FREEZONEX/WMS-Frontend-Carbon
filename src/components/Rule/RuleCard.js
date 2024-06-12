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
            <Heading className="font-medium md:text-[20px] sm:text-sm">
              {rule.name}
            </Heading>
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
              <span className="mr-2 ml-4 font-semibold text-[14px]">
                Task Type:
              </span>
              <span className="mr-2 ml-4 text-[14px]">{rule.task_type}</span>
            </div>
            <div>
              <span className="mr-2 ml-4 font-semibold text-[14px]">
                Warehouse:
              </span>
              <span className="mr-2 ml-4 text-[14px]">
                {rule.warehouse_name}
              </span>
            </div>
          </div>
          <div>
            <span className="mr-2 ml-4 font-semibold text-[14px]">
              Locations:
            </span>
            <span className="mr-2 ml-4 text-[14px]">
              {rule.location_expression}
            </span>
          </div>
          <Heading className="font-bold text-[14px] ">Actions</Heading>
          <div>
            <div>
              <span className="mr-2 ml-4 font-semibold text-[14px]">
                Assign to:
              </span>
              <span className="mr-2 ml-4 text-[14px]">{rule.people_name}</span>
            </div>
            <div>
              <span className="mr-2 ml-4 font-semibold text-[14px]">
                Resources:
              </span>
              <span className="mr-2 ml-4 text-[14px]">
                {rule.resource_name_list}
              </span>
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
