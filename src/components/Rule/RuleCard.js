'use client';
import React from 'react';
import { Draggable } from '@carbon/icons-react';
import { Heading } from '@carbon/react';
import { Button } from '@/components/ui/button';

function RuleCard({ rule }) {
  return (
    <div className="flex flex-row items-center space-x-3 w-full border-2 border-slate-300 rounded-md relative">
      <div>
        <Draggable className="w-[26px] h-[26px]" />
      </div>
      <div className="space-y-3 w-full">
        <div className="flex flex-row justify-between">
          <Heading className="font-normal font-medium text-[20px]">
            {rule.name}
          </Heading>
          <Button className="bg-[#E0E0E0] w-[57px] h-[24px] rounded-none text-[#525252] hover:text-white">
            Edit
          </Button>
        </div>
        <Heading className="font-normal text-[14px]">
          Conditions: The materials include 1 tonne of cement.
        </Heading>
        <Heading className="font-normal text-[14px]">
          Action: Assign 1 forklift and 2 pallets to this task.
        </Heading>
      </div>
    </div>
  );
}

export default RuleCard;
