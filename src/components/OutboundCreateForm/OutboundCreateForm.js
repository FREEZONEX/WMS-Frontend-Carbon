'use client';
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Column,
  Select,
  SelectItem,
  Button,
  TextArea,
  SwitcherDivider,
  IconButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tag,
  InlineNotification,
} from '@carbon/react';
import { Add, Close } from '@carbon/icons-react';
import '@/components/MaterialCreateForm/_materialcreateform.scss';
import MaterialSelectionTable from '../Table/MaterialSelectionTable';
import {
  fetchWarehouses,
  fetchStorageLocationsByWId,
  fetchMaterial,
  addOutboundRecord,
} from '@/actions/actions';
import { useRouter } from 'next/navigation';

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
const headers = [
  { key: 'name', header: 'Material Name' },
  { key: 'product_code', header: 'Material Code' },
  { key: 'unit', header: 'Unit' },
  { key: 'quantity', header: 'Quantity' },
];

function OutboundCreateForm() {
  const router = useRouter();
  const [fieldValidation, setFieldValidation] = useState({
    sourceInvalid: false,
    typeInvalid: false,
  });
  const [formValue, setFormValues] = useState({
    type: '',
    source: 'manual',
    status: '',
    note: '',
  });
  const onFormValueChange = (e) => {
    const { id, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const [taskList, setTaskList] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [storageLocationOptions, setStorageLocationOptions] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('');
  const [selectedStorageLocation, setSelectedStorageLocation] = useState('');
  const [materials, setMaterials] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  useEffect(() => {
    fetchWarehouses().then((res) => {
      setWarehouseOptions(res);
    });
    fetchMaterial().then((res) => {
      setMaterials(res);
    });
  }, []);
  console.log(formValue, taskList);
  useEffect(() => {
    console.log(selectedWarehouse);
    if (selectedWarehouse != '') {
      fetchStorageLocationsByWId({ warehouse_id: selectedWarehouse }).then(
        (res) => setStorageLocationOptions(res)
      );
    }
  }, [selectedWarehouse]);

  function handleAddTask() {
    if (selectedWarehouse && selectedStorageLocation) {
      const newTask = findInfoById(selectedWarehouse, selectedStorageLocation);
      setTaskList([...taskList, newTask]);
      setSelectedWarehouse('');
      setSelectedStorageLocation('');
    }
  }
  function findInfoById(wid, slid) {
    const selectedWarehouse = warehouseOptions.find(
      (warehouse) => warehouse.id === wid
    );

    const selectedStorageLocation = storageLocationOptions.find(
      (location) => location.id === slid
    );

    return {
      warehouse: selectedWarehouse,
      shelf_location: selectedStorageLocation,
      materials: [],
    };
  }
  const handleMaterialSelection = (
    taskIndex,
    materialId,
    field,
    value,
    checked
  ) => {
    console.log(field);
    setTaskList((prevTaskList) => {
      const updatedTaskList = [...prevTaskList];
      if (checked) {
        const selectedMaterial = materials.find(
          (material) => material.id === materialId
        );
        const existingMaterialIndex = updatedTaskList[
          taskIndex
        ].materials.findIndex((material) => material.id === materialId);

        if (existingMaterialIndex !== -1) {
          updatedTaskList[taskIndex].materials[existingMaterialIndex][field] =
            value;
        } else {
          updatedTaskList[taskIndex].materials.push({
            ...selectedMaterial,
            [field]: value,
          });
        }
      } else {
        updatedTaskList[taskIndex].materials = updatedTaskList[
          taskIndex
        ].materials.filter((material) => material.id !== materialId);
      }

      return updatedTaskList;
    });
  };
  const handleRemoveTask = (taskIndex) => {
    setTaskList((prevTaskList) => {
      const updatedTaskList = [...prevTaskList];
      updatedTaskList.splice(taskIndex, 1);
      return updatedTaskList;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newValidation = {
      sourceInvalid: !formValue.source || formValue.source === '',
      typeInvalid: !formValue.type || formValue.type === '',
    };
    setFieldValidation(newValidation);

    if (Object.values(newValidation).some((v) => v)) {
      setFieldValidation(newValidation);
      return;
    }
    if (taskList.length === 0) {
      setIsAlert(true);
      return;
    } else {
      setIsAlert(false);
    }
    const body = {
      ...formValue,
      shelf_records: convertTaskListToFormat(taskList),
    };
    console.log(body);
    addOutboundRecord(body).then(() => {
      setFieldValidation({ sourceInvalid: false, typeInvalid: false });
      setFormValues({ type: '', source: '', status: '', note: '' });
      setTaskList([]);
      router.push('/operation/outbound');
    });
  };

  function convertTaskListToFormat(taskList) {
    const shelfRecords = taskList.map((task) => {
      const inventory = task.materials.map((material) => ({
        material_id: material.id,
        quantity: parseInt(material.quantity),
      }));

      return {
        storage_location_id: task.shelf_location.id,
        inventory,
      };
    });

    return shelfRecords;
  }

  return (
    <div>
      <div className=" mt-12">
        <Grid className="pl-0">
          <Column sm={1} md={3} lg={5}>
            <Select
              className="mb-10"
              id="type"
              defaultValue=""
              labelText="Outbound Type"
              invalid={fieldValidation.typeInvalid}
              invalidText="This field cannot be empty"
              value={formValue.type}
              onChange={onFormValueChange}
              required
            >
              <SelectItem disabled hidden value="" text="Choose an option" />
              <SelectItem value="material outbound" text="Material Outbound" />
              <SelectItem value="product outbound" text="Product Outbound" />
              <SelectItem value="mix outbound" text="Mix Outbound" />
            </Select>
          </Column>
          <Column sm={1} md={3} lg={5}>
            <Select
              className="mb-10"
              id="source"
              defaultValue=""
              labelText="Source"
              invalid={fieldValidation.sourceInvalid}
              invalidText="This field cannot be empty"
              value={formValue.source}
              onChange={onFormValueChange}
              disabled
              required
            >
              <SelectItem disabled hidden value="" text="Choose an option" />
              <SelectItem value="PDA" text="PDA" />
              <SelectItem value="manual" text="Manual" />
            </Select>
          </Column>
          <Column sm={1} md={3} lg={5}>
            <Select
              className="mb-10"
              id="status"
              defaultValue=""
              labelText="Status"
              value={formValue.status}
              onChange={onFormValueChange}
              required
            >
              <SelectItem disabled hidden value="" text="Choose an option" />
              <SelectItem value="Done" text="Done" />
              <SelectItem value="Executing" text="Executing" />
              <SelectItem value="To-do" text="To-do" />
            </Select>
          </Column>
          <Column sm={1} md={3} lg={4}>
            <TextArea
              className="mb-10 w-full"
              labelText="Note"
              rows={4}
              id="note"
              value={formValue.note}
              onChange={onFormValueChange}
              placeholder="Note Placeholder"
            />
          </Column>
        </Grid>
        <SwitcherDivider className="w-full mb-10 pl-0" />
        <Grid className="pl-0">
          <Column sm={4} md={3} lg={4}>
            <Select
              className="mb-10"
              id="warehouse"
              defaultValue=""
              labelText="Warehouse"
              value={selectedWarehouse}
              onChange={(e) => {
                setSelectedWarehouse(e.target.value);
              }}
              required
            >
              <SelectItem disabled hidden value="" text="Choose an option" />
              {warehouseOptions.map((warehouse) => {
                return (
                  <SelectItem
                    key={warehouse.id}
                    value={warehouse.id}
                    text={warehouse.name}
                  />
                );
              })}
            </Select>
          </Column>
          <Column sm={4} md={3} lg={4}>
            <Select
              className="mb-10"
              id="shelf_location"
              defaultValue=""
              labelText="Shelf Location"
              value={selectedStorageLocation}
              onChange={(e) => {
                setSelectedStorageLocation(e.target.value);
              }}
              required
            >
              <SelectItem disabled hidden value="" text="Choose an option" />
              {storageLocationOptions.map((location) => {
                return (
                  <SelectItem
                    key={location.id}
                    value={location.id}
                    text={location.name}
                  />
                );
              })}
            </Select>
          </Column>
          <Column sm={1} md={1} lg={2}>
            <IconButton className="mb-10 " size="md" onClick={handleAddTask}>
              <Add />
            </IconButton>
          </Column>
        </Grid>
        <div className="mb-10">
          {taskList.map((task, index) => {
            return (
              <Tag key={index} type={tagColors[index % tagColors.length]}>
                <div className="flex ">
                  {task.warehouse.name}-{task.shelf_location.name}
                  <Close
                    className="ml-1"
                    size={16}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTask(index);
                    }}
                  />
                </div>
              </Tag>
            );
          })}
        </div>
        {taskList && taskList.length > 0 ? (
          <>
            <Tabs>
              <TabList aria-label="List of tabs" contained>
                {taskList.map((task, index) => {
                  return (
                    <Tab key={index}>
                      {task.warehouse.name}-{task.shelf_location.name}
                    </Tab>
                  );
                })}
              </TabList>
              <TabPanels>
                {taskList.map((task, index) => {
                  return (
                    <TabPanel key={index}>
                      <MaterialSelectionTable
                        headers={headers}
                        rows={materials}
                        onSelectionChange={(
                          materialId,
                          field,
                          value,
                          checked
                        ) =>
                          handleMaterialSelection(
                            index,
                            materialId,
                            field,
                            value,
                            checked
                          )
                        }
                      />
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </>
        ) : null}
      </div>
      {isAlert && (
        <InlineNotification
          className="w-full"
          title="Notice: "
          subtitle="No outbound material"
        />
      )}
      <div className="flex space-x-4 mt-10 justify-center ">
        <Button size="sm" onClick={handleSubmit}>
          Submit
        </Button>
        <Button size="sm" kind="tertiary" href="/operation/outbound">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default OutboundCreateForm;
