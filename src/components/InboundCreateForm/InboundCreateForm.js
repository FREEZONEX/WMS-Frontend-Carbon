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
  TextInput,
  InlineNotification,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';
import { Add, Close } from '@carbon/icons-react';
import '@/components/MaterialCreateForm/_materialcreateform.scss';
import TaskListTable from '../Table/TaskListTable';
import {
  fetchWarehouses,
  fetchStorageLocationsByWId,
  fetchMaterial,
  addInboundRecord,
} from '@/actions/actions';
import { useRouter } from 'next/navigation';

const headers = [
  { key: 'name', header: 'Material Name' },
  { key: 'product_code', header: 'Material Code' },
  { key: 'specification', header: 'Specification' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'unit', header: 'Unit' },
  { key: 'expect_wh', header: 'WH' },
  { key: 'expect_storage_location', header: 'Shelf' },
];

function InboundCreateForm() {
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
    }
    const body = {
      ...formValue,
      shelf_records: convertTaskListToFormat(taskList),
    };
    console.log(body);
    addInboundRecord(body).then(() => {
      setFieldValidation({ sourceInvalid: false, typeInvalid: false });
      setFormValues({ type: '', source: '', status: '', note: '' });
      setTaskList([]);
      router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
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
      <Grid className="p-0 mt-[50px] gap-[9px]">
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Creator"
            id="creator"
            placeholder="Creator"
            value={formValue.creator}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Purchase order No."
            id="purchase_order_no"
            placeholder="Purchase order No."
            value={formValue.purchase_order_no}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Supplier"
            id="supplier"
            placeholder="Supplier"
            value={formValue.supplier}
            onChange={onFormValueChange}
          />
        </Column>

        <Column className="ml-0" sm={2} md={4} lg={4}>
          <DatePicker>
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Delivery Date"
              id="delivery_date"
            />
          </DatePicker>
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            readOnly
            className="flex-auto "
            labelText="Status"
            id="status"
            placeholder="Status"
            value="Pending"
            color="red"
          />
        </Column>
      </Grid>
      <SwitcherDivider className="w-full mt-10 mb-10 pl-0" />

      <div className="mb-10">
        <TaskListTable headers={headers} />
      </div>

      {isAlert && (
        <InlineNotification
          className="w-full"
          title="Notice: "
          subtitle="No inbound material"
        />
      )}
      <div className="flex space-x-4 mt-10 justify-center ">
        <Button size="sm" onClick={handleSubmit}>
          Submit
        </Button>
        <Button size="sm" kind="tertiary" href="/operation/inbound">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default InboundCreateForm;
