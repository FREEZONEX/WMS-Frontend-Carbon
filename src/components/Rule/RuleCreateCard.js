'use client';
import React, { useState, useEffect } from 'react';
import { ComboBox } from '@carbon/react';
import UserListComboBox from '../Task/UserListComboBox';
import { Heading, TextInput, MultiSelect, Button, Tag } from '@carbon/react';
import { Close } from '@carbon/icons-react';
import { useRouter } from 'next/navigation';
import { tagColors } from '@/utils/constants';
import { addRule, fetchWarehouses } from '@/actions/actions';

function RuleCreateCard() {
  const router = useRouter();

  const [ruleName, setRuleName] = useState('');
  const [wareHouses, setWarehouses] = useState([]);
  const [selectWarehouse, setSelectWarehouse] = useState('1');
  const [locationExpression, setLocationExpression] = useState();
  const [selectedResources, setSelectedResources] = useState([]);
  const [resource, setRource] = useState([]);
  const [worker, setWorker] = useState();
  const [taskType, setTaskType] = useState(1);

  const taskTypes = [
    { name: 'Inbound', value: 1 },
    { name: 'Outbound', value: 2 },
  ];

  useEffect(() => {
    let resources = [];
    for (let i = 0; i < 5; i++) {
      resources.push(`Tray-${i}`);
    }
    setRource(resources);
    fetchWarehouses({ pageNum: 1, pageSize: 99999999 }).then((res) => {
      setWarehouses(res.list);
    });
  }, []);

  const onSelectWorker = (item) => {
    setWorker(item.selectedItem);
  };
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

  const onSelectWarehouse = (e) => {
    setSelectWarehouse(e.selectedItem);
  };
  const onSave = async () => {
    addRule({
      location_expression: locationExpression,
      name: ruleName,
      people_name: worker,
      resource_id_list: selectedResources.join(','),
      warehouse_id: selectWarehouse?.id,
      task_type: taskType,
    })
      .then(() => {
        console.log('success');
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <div className="p-4 shadow rounded-md bg-white w-2/3">
      <div className="flex items-center space-x-2">
        <Heading className="font-normal text-[20px]"> Rule Name</Heading>
        <TextInput
          value={ruleName}
          light
          style={{ width: '300px', marginLeft: '30px' }}
          onChange={(e) => setRuleName(e.target?.value)}
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
      <div className="gap-4 mt-4 flex items-center">
        <Heading className="font-[500] text-[16px]">And</Heading>
        <div className="flex gap-4 " style={{ marginLeft: '15px' }}>
          <ComboBox
            titleText="Warehouse"
            items={wareHouses}
            itemToString={(item) => (item ? item.name : '')}
            placeholder="Choose warehouse"
            selectedItem={selectWarehouse}
            onChange={(selectedItem) => onSelectWarehouse(selectedItem)}
          />
          <ComboBox
            titleText="Task Type"
            items={taskTypes}
            itemToString={(item) => (item ? item.name : '')}
            placeholder="Choose Task Type"
            onChange={(selectedItem) => {
              setTaskType(selectedItem.selectedItem);
            }}
          />
        </div>
      </div>
      <div className="mt-6">
        <Heading className="text-[16px] font-[500]">
          Make the following action
        </Heading>
        <div className="flex mt-6 items-center">
          <Heading className="font-normal text-[14px]">Allocate </Heading>
          <div style={{ width: '60%', marginLeft: '10px' }}>
            <UserListComboBox onChange={onSelectWorker}></UserListComboBox>
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
