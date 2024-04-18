'use client';
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Grid,
  Column,
  TextArea,
  Button,
  Tag,
  ComboBox,
  IconButton,
} from '@carbon/react';
import { IbmDb2Warehouse, Close } from '@carbon/icons-react';
import './_materialcreateform.scss';
import { useRouter } from 'next/navigation';
import { addMaterial, fetchStorageLocationsByWId } from '@/actions/actions';
import { fetchWarehouses } from '@/actions/actions';
import AddExpectLocationModal from '@/components/Modal/addExpectLocationModal';

function MaterialCreateForm() {
  const router = useRouter();
  const [fieldValidation, setFieldValidation] = useState({
    codeInvalid: false,
    nameInvalid: false,
  });
  const defaultFormValue = {
    product_code: '',
    name: '',
    product_type: '',
    unit: '',
    specification: '',
    max: '',
    min: '',
    status: '',
    expect_wh_id: '',
    expact_stock_location_id: '',
    note: '',
  };
  const [formValue, setFormValue] = useState(defaultFormValue);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [storageLocationOptions, setStorageLocationOptions] = useState([]);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState({});
  const [selectedStorageLocation, setSelectedStorageLocation] = useState({});
  const [isOpenExpect, setIsOpenExpect] = useState(false);

  useEffect(() => {
    //TODO: select all warehouse instead of with pagination
    fetchWarehouses({ pageNum: 1, pageSize: 99999999 }).then((res) => {
      setWarehouseOptions(res.list);
    });
  }, []);
  console.log(
    formValue,
    selectedWarehouseInfo,
    selectedStorageLocation,
    process.env.PATH_PREFIX + '/warehouse/material'
  );
  useEffect(() => {
    //TODO: select all warehouse instead of with pagination
    if (selectedWarehouseInfo.selectedItem) {
      fetchStorageLocationsByWId(
        { warehouse_id: selectedWarehouseInfo.selectedItem.id },
        { pageNum: 1, pageSize: 99999999 }
      ).then((res) => {
        setStorageLocationOptions(res.list);
      });
    } else {
      setStorageLocationOptions([]);
    }
  }, [selectedWarehouseInfo]);

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

  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    setFormValue((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newValidation = {
      codeInvalid: formValue.product_code === '',
      nameInvalid: formValue.name === '',
    };
    setFieldValidation(newValidation);
    console.log(newValidation, formValue);

    if (Object.values(newValidation).some((v) => v)) {
      return;
    }
    addMaterial(formValue).then(() => {
      setFormValue({
        product_code: '',
        name: '',
        product_type: '',
        unit: '',
        note: '',
      });
      setFieldValidation({
        codeInvalid: false,
        nameInvalid: false,
      });
    });
    router.push(`${process.env.PATH_PREFIX}/warehouse/material`);
  };
  const onSelectExpectLocation = () => {
    setIsOpenExpect(true);
  };
  const onCloseExpectLocationModal = () => {
    setIsOpenExpect(false);
  };
  const onConfirmExpectLocationModal = (datas) => {
    setFormValue((prevData) => ({
      ...prevData,
      locations: [],
    }));
    setFormValue((prevData) => ({
      ...prevData,
      locations: datas,
    }));
    setIsOpenExpect(false);
  };
  return (
    <div>
      <div className=" mt-8">
        <Grid className="pl-0">
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Material Code"
              id="product_code"
              placeholder="Material Code"
              invalid={fieldValidation.codeInvalid}
              invalidText="This field cannot be empty"
              value={formValue.product_code}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Material Name"
              id="name"
              placeholder="Material Name"
              invalid={fieldValidation.nameInvalid}
              invalidText="This field cannot be empty"
              value={formValue.name}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Material Type"
              id="product_type"
              placeholder="Material Type"
              value={formValue.product_type}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Unit"
              id="unit"
              placeholder="Unit"
              value={formValue.unit}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Specification"
              id="specification"
              placeholder="Specification"
              value={formValue.specification}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Maximum safty stock"
              id="max"
              placeholder="Maximum safty stock"
              value={formValue.max}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Minimum safty stock"
              id="min"
              placeholder="Minimum safty stock"
              value={formValue.min}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-8"
              labelText="Status"
              id="status"
              placeholder="Status"
              value={formValue.status}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={16} md={16} lg={16}>
            <div>
              <span className="text-xs" style={{ color: '#525252' }}>
                Except Location
              </span>
            </div>
            <div className="flex flex-row mt-2 mb-5">
              <div>
                <Button
                  onClick={onSelectExpectLocation}
                  kind="tertiary"
                  size="sm"
                  renderIcon={IbmDb2Warehouse}
                >
                  Warehouse
                </Button>
              </div>
              <div className="ml-5">
                {formValue.locations?.map((shelf, index) => {
                  return (
                    <Tag
                      key={index}
                      type={tagColors[index % tagColors.length]}
                      className="ml-0"
                    >
                      <div className="flex w-10 justify-center">{shelf}</div>
                    </Tag>
                  );
                })}
              </div>
            </div>
          </Column>
          <Column sm={4} md={8} lg={16}>
            <TextArea
              className="mb-8 w-full"
              labelText="Note"
              rows={4}
              id="note"
              value={formValue.note}
              onChange={onFormValueChange}
            />
          </Column>
        </Grid>
      </div>
      <div className="flex space-x-4 mt-4 justify-center ">
        <Button size="sm" onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          size="sm"
          kind="tertiary"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/warehouse/material`);
          }}
        >
          Cancel
        </Button>
      </div>
      <AddExpectLocationModal
        isOpen={isOpenExpect}
        onClose={onCloseExpectLocationModal}
        onConfirm={onConfirmExpectLocationModal}
      ></AddExpectLocationModal>
    </div>
  );
}

export default MaterialCreateForm;
