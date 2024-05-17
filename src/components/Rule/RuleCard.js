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
      <div className="flex flex-row items-center space-x-3 w-full p-4 shadow rounded-md relative">
        <div>
          <Draggable className="w-[26px] h-[26px]" />
        </div>
        <div className="space-y-3 w-full">
          <div className="flex flex-row justify-between">
            <Heading className="font-medium text-[20px]">{rule.name}</Heading>
            <Button
              className="bg-[#E0E0E0] w-[57px] h-[24px] rounded-none text-[#525252] hover:text-white"
              onClick={() => onEdit()}
            >
              Edit
            </Button>
          </div>
          <Heading className="font-normal text-[14px]">
            Conditions:
            {/* TaskType:{rule.task_type} & WarehouseId:
            {rule.warehouse_id} & Location include:{rule.location_expression} */}
          </Heading>
          <div>
            <div>Task Type:{rule.task_type}</div>
            <div>Warehouse:{rule.warehouse_id}</div>
            <div>Locations:{rule.location_expression}</div>
          </div>
          <Heading className="font-normal text-[14px]">
            Action: Assign to Worker[{rule.people_name}] and can use resources:[
            {rule.resource_id_list}].
          </Heading>
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
