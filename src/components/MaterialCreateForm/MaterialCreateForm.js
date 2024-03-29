'use client';
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Grid,
  Column,
  TextArea,
  Button,
  ComboBox,
} from '@carbon/react';
import './_materialcreateform.scss';
import { useRouter } from 'next/navigation';
import { addMaterial, fetchStorageLocationsByWId } from '@/actions/actions';
import { fetchWarehouses } from '@/actions/actions';

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
          <Column sm={2} md={4} lg={4}>
            <ComboBox
              className="mb-8"
              titleText="Expect WH"
              items={warehouseOptions}
              itemToString={(item) => (item ? item.name : '')}
              placeholder="Choose a warehouse"
              onChange={(selectedItem) => {
                if (selectedItem) {
                  setSelectedWarehouseInfo(selectedItem);
                  setSelectedStorageLocation({});
                  setFormValue({
                    ...formValue,
                    expect_wh_id: selectedItem.selectedItem
                      ? selectedItem.selectedItem?.id
                      : '',
                    expact_stock_location_id: '',
                  });
                } else {
                  setSelectedWarehouseInfo({});
                  setSelectedStorageLocation({});
                  setFormValue({
                    ...formValue,
                    expect_wh_id: '',
                    expact_stock_location_id: '',
                  });
                }
              }}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <ComboBox
              className="mb-8"
              titleText="Expect Shelf"
              items={storageLocationOptions}
              itemToString={(item) => (item ? item.name : '')}
              placeholder="Choose a Shelf"
              onChange={(selectedItem) => {
                setSelectedStorageLocation(selectedItem.selectedItem);
                setFormValue({
                  ...formValue,
                  expact_stock_location_id: selectedItem.selectedItem
                    ? selectedItem.selectedItem?.id
                    : '',
                });
              }}
              selectedItem={selectedStorageLocation}
            />
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
    </div>
  );
}

export default MaterialCreateForm;
