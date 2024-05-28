'use client';
import React, { useState, useEffect } from 'react';
import { ComboBox, Modal } from '@carbon/react';
import UserListComboBox from '../Task/UserListComboBox';
import { Heading, TextInput, MultiSelect, Button, Tag } from '@carbon/react';
import { Close } from '@carbon/icons-react';
import { tagColors } from '@/utils/constants';
import { updateRule, fetchWarehouses, getResource } from '@/actions/actions';
import { taskTypes } from '@/utils/constants';

function RuleEditModal({ isOpen, onClose, defaultValue }) {
  const [ruleName, setRuleName] = useState('');
  const [wareHouses, setWarehouses] = useState([]);
  const [selectWarehouse, setSelectWarehouse] = useState('1');
  const [locationExpression, setLocationExpression] = useState();
  const [selectedResources, setSelectedResources] = useState([]);
  const [resources, setRources] = useState([]);
  const [worker, setWorker] = useState();
  const [taskType, setTaskType] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchWarehouses({ pageNum: 1, pageSize: 99999999 }).then((res) => {
        setWarehouses(res.list);
      });
      getResource({ pageNum: 1, pageSize: 99999999 }).then((res) => {
        setRources(res.list);
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (defaultValue) {
      console.log(defaultValue);
      setRuleName(defaultValue.name);
      setLocationExpression(defaultValue.location_expression);
      const warehouse = wareHouses.find(
        (t) => t.id == defaultValue.warehouse_id
      );
      setSelectWarehouse(warehouse || '');
      setTaskType(defaultValue.task_type || '');
      setWorker(defaultValue.people_name || '');
      const resourceItems = [];
      resources.forEach((t) => {
        if (defaultValue.resource_id_list.split(',').find((r) => r == t.id)) {
          resourceItems.push(t);
        }
      });
      setSelectedResources(resourceItems);
    }
  }, [defaultValue, wareHouses, resources]);

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
    if (!defaultValue.id) {
      alert('please select one item');
      return;
    }
    updateRule({
      id: defaultValue.id,
      location_expression: locationExpression,
      name: ruleName,
      people_name: worker,
      resource_id_list: selectedResources.map((t) => t.id).join(','),
      warehouse_id: selectWarehouse?.id,
      task_type: taskType,
    })
      .then(() => {
        console.log('success');
        onClose(true);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onCancel = () => {
    onClose(false);
  };
  return (
    <Modal
      open={isOpen}
      modalHeading="Edit Rule"
      modalLabel=""
      primaryButtonText="Ok"
      secondaryButtonText="Cancel"
      onRequestClose={onCancel}
      onRequestSubmit={onSave}
      isFullWidth={true}
      size="md"
    >
      <div className="p-4 shadow rounded-md bg-white">
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
          <Heading className="font-[500] text-[16px]">
            If the Location is
          </Heading>
          <TextInput
            light
            style={{ width: '300px' }}
            placeholder="Enter location name"
            value={locationExpression}
            onChange={(e) => setLocationExpression(e.target?.value)}
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
              itemToString={(item) => item || ''}
              placeholder="Choose Task Type"
              selectedItem={taskType}
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
              <UserListComboBox
                onChange={onSelectWorker}
                defaultValue={worker}
              ></UserListComboBox>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <Heading className="font-normal text-[14px]">Allocate </Heading>
            <div style={{ width: '60%', marginLeft: '10px' }}>
              <MultiSelect
                label={
                  selectedResources && selectedResources.length > 0
                    ? selectedResources.map((t) => t.name).join(',')
                    : 'Resource Names'
                }
                titleText="Resource"
                items={resources}
                itemToString={(item) => (item ? item.name : '')}
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
                    {item.name}
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
        </div>
      </div>
    </Modal>
  );
}

export default RuleEditModal;
