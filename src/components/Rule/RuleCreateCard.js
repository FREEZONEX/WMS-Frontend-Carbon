'use client';
import React from 'react';
import { Heading, TextInput, Select, SelectItem, Button } from '@carbon/react';
import { AddAlt, SubtractAlt } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';

function RuleCreateCard() {
  const router = useRouter();
  return (
    <div className="p-4 shadow rounded-md bg-white w-2/3 p-4">
      <div className="mb-8 flex items-center space-x-2">
        <Heading className="font-normal text-[20px]"> Rule Name</Heading>
        {/* <TextInput
          light
          style={{ width: '40%' }}
          placeholder="Enter rule name"
        /> */}
      </div>
      <div className="gap-4 mb-8 flex items-center">
        <Heading className="font-medium text-[16px]">
          If the material includes
        </Heading>
        <Select labelText="Quantity" className="w-[100px]"></Select>
        <Select labelText="Unit" defaultValue="" className="w-[100px]">
          <SelectItem value="" text="" />
          <SelectItem value="kg" text="kg" />
          <SelectItem value="ton" text="ton" />
        </Select>
        <Select labelText="Material Name" defaultValue="" className="w-[160px]">
          <SelectItem value="" text=""></SelectItem>
        </Select>
      </div>
      <div className="mb-14">
        <Heading className="mb-8 font-medium text-[16px]">
          Make the following action
        </Heading>
        <div className="gap-4 flex items-center">
          <Heading className="font-normal text-[14px]">Allocate </Heading>
          <Select labelText="Quantity" defaultValue="">
            <SelectItem value="" text="" />
          </Select>
          <TextInput
            labelText="Resource Name"
            placeholder="Enter resource name"
          />
          <AddAlt size={20} />
          <SubtractAlt size={20} />
        </div>
      </div>
      <div className="flex justify-center mb-8">
        <Button size="sm">Save</Button>
        <Button
          className="ml-2"
          kind="tertiary"
          size="sm"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/task/rules`);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default RuleCreateCard;
