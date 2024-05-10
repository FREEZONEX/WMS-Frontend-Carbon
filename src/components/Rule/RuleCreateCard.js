'use client';
import React, { useState, useEffect } from 'react';
import {
  Heading,
  TextInput,
  ComboBox,
  MultiSelect,
  Button,
  Tag,
} from '@carbon/react';
import { Close } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';

function RuleCreateCard() {
  const router = useRouter();

  const [selectedResources, setSelectedResources] = useState([]);
  const [worker, setWorker] = useState([]);
  const [resource, setRource] = useState([]);

  useEffect(() => {
    let resources = [];
    let workers = [];
    for (let i = 0; i < 5; i++) {
      resources.push(`Tray-${i}`);
      workers.push(`Worker-${i}`);
    }
    setWorker(workers);
    setRource(resources);
  }, []);

  const tagColors = [
    'red',
    'magenta',
    'purple',
    'blue',
    'cyan',
    'teal',
    'green',
    'gray',
    'cool-gray',
    'outline',
  ];

  const onSelectWorker = (item) => {};
  const onSelectResource = (item) => {
    setSelectedResources(item.selectedItems);
  };

  const onRemoveResource = (item) => {
    const index = selectedResources.indexOf(item);
    setSelectedResources((prvItems) => {
      const newItems = [...prvItems];
      newItems.splice(index, 1);
      return newItems;
    });
  };

  const onSave = async () => {};
  return (
    <div className="p-4 shadow rounded-md bg-white w-2/3">
      <div className="flex items-center space-x-2">
        <Heading className="font-normal text-[20px]"> Rule Name</Heading>
        <TextInput
          light
          style={{ width: '300px', marginLeft: '30px' }}
          placeholder="Enter rule name"
        />
      </div>
      <div className="gap-4 mt-4 flex items-center">
        <Heading className="font-[500] text-[16px]">If the Location is</Heading>
        <TextInput
          light
          style={{ width: '300px' }}
          placeholder="Enter location name"
        />
      </div>
      <div className="mt-6">
        <Heading className="text-[16px] font-[500]">
          Make the following action
        </Heading>
        <div className="flex mt-6 items-center">
          <Heading className="font-normal text-[14px]">Allocate </Heading>
          <div style={{ width: '60%', marginLeft: '10px' }}>
            <ComboBox
              titleText="Worker"
              items={worker}
              itemToString={(item) => (item ? item : '')}
              placeholder="Choose worker"
              onChange={(selectedItem) => onSelectWorker(selectedItem)}
            />
          </div>
        </div>
        <div className="flex items-center mt-4">
          <Heading className="font-normal text-[14px]">Allocate </Heading>
          <div style={{ width: '60%', marginLeft: '10px' }}>
            <MultiSelect
              label={
                selectedResources && selectedResources.length > 0
                  ? selectedResources.join(',')
                  : 'Resource Name'
              }
              titleText="Resource"
              items={resource}
              itemToString={(item) => (item ? item : '')}
              selectionFeedback="top-after-reopen"
              selectedItems={selectedResources}
              onChange={(selectedItem) => onSelectResource(selectedItem)}
            />
          </div>
        </div>
        <div className="mt-2 pl-[60px]">
          {selectedResources?.map((item, index) => {
            return (
              <Tag
                key={index}
                type={tagColors[index % tagColors.length]}
                className="ml-0"
              >
                <div className="flex ">
                  {item}
                  <Close
                    className="ml-1"
                    size={16}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveResource(item);
                    }}
                  />
                </div>
              </Tag>
            );
          })}
        </div>
        <div className="flex justify-center mb-8 mt-8">
          <Button size="sm" onClick={onSave}>
            Save
          </Button>
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
    </div>
  );
}

export default RuleCreateCard;
