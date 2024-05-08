import React, { useEffect, useState, useRef } from 'react';
import {
  Modal,
  TextInput,
  Button,
  Tag,
  Column,
  Grid,
  TextArea,
} from '@carbon/react';
import { IbmDb2Warehouse } from '@carbon/icons-react';
import { updateMaterial, fetchWarehouses } from '@/actions/actions';

import ExpectLocationModal from './ExpectLocationModal';

const EditMaterialModal = ({
  isOpen,
  onClose,
  setRefresh,
  materialValues,
  setMaterialValues,
}) => {
  const [fieldValidation, setFieldValidation] = useState({
    codeInvalid: false,
    nameInvalid: false,
  });
  const [formValue, setFormValues] = useState(materialValues);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState({});
  const [selectItem, setSelectItem] = useState({ whId: null, shelves: [] });
  const [isOpenExpect, setIsOpenExpect] = useState(false);
  const [selectLocations, setSelectLocations] = useState([]);

  useEffect(() => {
    if (isOpen) {
      if (materialValues.expect_wh_id) {
        fetchWarehouses({ pageNum: 1, pageSize: 99999999 }).then((res) => {
          const selectedWarehouse = res.list.find(
            (wh) => wh.id === materialValues.expect_wh_id
          );
          setSelectedWarehouseInfo(selectedWarehouse || {});
        });

        setSelectItem((prevData) => ({
          ...prevData,
          whId: materialValues.expect_wh_id,
        }));
      }
      if (materialValues.expect_storage_locations) {
        setSelectItem((prevData) => ({
          ...prevData,
          shelves: materialValues.expect_storage_locations.split(','),
        }));
      }
    }
  }, [materialValues, isOpen]);

  useEffect(() => {
    setFormValues(materialValues);
  }, [materialValues]);

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
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const handleCancelClicked = () => {
    setMaterialValues({});
    setFieldValidation({
      codeInvalid: false,
      nameInvalid: false,
    });
    onClose();
  };

  const handleSubmit = async () => {
    const newValidation = {
      codeInvalid: !formValue.product_code || formValue.product_code === '',
      nameInvalid: !formValue.name || formValue.name === '',
    };
    setFieldValidation(newValidation);

    if (Object.values(fieldValidation).some((v) => v)) {
      setFieldValidation(newValidation);
      return;
    }
    updateMaterial(formValue).then((res) => {
      onClose();
      setRefresh({});
    });
  };

  const onSelectExpectLocation = () => {
    setIsOpenExpect(true);
  };
  const onCloseExpectLocationModal = () => {
    setIsOpenExpect(false);
  };
  const onConfirmExpectLocationModal = (data) => {
    setSelectLocations([]);
    setFormValues((prevData) => ({
      ...prevData,
      expact_stock_location_id: data.shelves.join(','),
      expect_wh_id: data.warehouseInfo?.id,
    }));
    setSelectLocations(data.shelves);
    setSelectedWarehouseInfo(data.warehouseInfo);
    //  console.log(formValue);
    setIsOpenExpect(false);
  };

  return (
    <>
      <Modal
        open={isOpen}
        modalHeading="Edit a Material"
        modalLabel="Material Management"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onRequestClose={handleCancelClicked}
        onRequestSubmit={handleSubmit}
      >
        <Grid className="pl-0 pr-0">
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-5"
              id="product_code"
              labelText="Material Code"
              placeholder="Material Code"
              required
              invalid={fieldValidation.codeInvalid}
              invalidText="This field cannot be empty"
              value={formValue.product_code}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-5"
              id="name"
              labelText="Material Name"
              placeholder="Material name"
              required
              invalid={fieldValidation.nameInvalid}
              invalidText="This field cannot be empty"
              value={formValue.name}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-5"
              id="specification"
              labelText="Specification"
              placeholder="Specification"
              required
              invalidText="This field cannot be empty"
              value={formValue.specification}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-5"
              id="product_type"
              labelText="Type"
              placeholder="type"
              required
              value={formValue.product_type}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-5"
              id="unit"
              labelText="Unit"
              placeholder="Unit"
              value={formValue.unit}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-5"
              id="max"
              labelText="Maximum Safty Stock"
              placeholder="Maximum Safty Stock"
              value={formValue.max}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-5"
              id="min"
              labelText="Minimum Safty Stock"
              placeholder="Minimum Safty Stock"
              value={formValue.min}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={8}>
            <TextInput
              className="mb-5"
              id="status"
              labelText="Status"
              placeholder="Status"
              value={formValue.status}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={4} md={8} lg={16}>
            <div>
              <span className="text-xs" style={{ color: '#525252' }}>
                Expect Location
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
                  {selectedWarehouseInfo?.name
                    ? selectedWarehouseInfo?.name
                    : 'Warehouse'}
                </Button>
              </div>
              <div className="ml-5">
                {selectLocations?.map((shelf, index) => {
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
              id="note"
              labelText="Note"
              placeholder="Note"
              value={formValue.note}
              onChange={onFormValueChange}
            />
          </Column>
        </Grid>
      </Modal>
      <ExpectLocationModal
        isOpen={isOpenExpect}
        onClose={onCloseExpectLocationModal}
        onConfirm={onConfirmExpectLocationModal}
        selectedItem={selectItem}
      ></ExpectLocationModal>
    </>
  );
};

export default EditMaterialModal;
