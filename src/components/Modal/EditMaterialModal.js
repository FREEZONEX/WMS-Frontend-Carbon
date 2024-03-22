import React, { useEffect, useState, useRef } from 'react';
import {
  Modal,
  ComboBox,
  TextInput,
  Column,
  Grid,
  TextArea,
} from '@carbon/react';
import {
  updateMaterial,
  fetchWarehouses,
  fetchStorageLocations,
  fetchStorageLocationsByWId,
} from '@/actions/actions';

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
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [storageLocationOptions, setStorageLocationOptions] = useState([]);
  const [selectedWarehouseInfo, setSelectedWarehouseInfo] = useState({});
  const [selectedStorageLocation, setSelectedStorageLocation] = useState({});
  useEffect(() => {
    fetchWarehouses({ pageNum: 1, pageSize: 99999999 }).then((res) => {
      setWarehouseOptions(res.list);
      if (materialValues.expect_wh_id) {
        const selectedWarehouse = res.list.find(
          (wh) => wh.id === materialValues.expect_wh_id
        );
        setSelectedWarehouseInfo(selectedWarehouse || {});
      }
    });
    if (materialValues.expect_wh_id) {
      fetchStorageLocationsByWId(
        { warehouse_id: materialValues.expect_wh_id },
        { pageNum: 1, pageSize: 99999999 }
      ).then((res) => {
        setStorageLocationOptions(res.list);
        const selectedStorageLocation = res.list.find(
          (sl) => sl.id === materialValues.expact_stock_location_id
        );
        setSelectedStorageLocation(selectedStorageLocation || {});
      });
    }
  }, [materialValues]);

  useEffect(() => {
    setFormValues(materialValues);
  }, [materialValues]);

  const prevWarehouseInfoRef = useRef(null);
  useEffect(() => {
    const currentWarehouseInfo = selectedWarehouseInfo;

    if (
      currentWarehouseInfo?.id &&
      prevWarehouseInfoRef.current?.id !== currentWarehouseInfo.id
    ) {
      fetchStorageLocationsByWId(
        { warehouse_id: currentWarehouseInfo.id },
        { pageNum: 1, pageSize: 99999999 }
      ).then((res) => {
        setStorageLocationOptions(res.list);
      });
    }

    prevWarehouseInfoRef.current = currentWarehouseInfo;
  }, [selectedWarehouseInfo]);

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

  return (
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
        <Column sm={2} md={4} lg={8}>
          <ComboBox
            className="mb-8"
            titleText="Expect WH"
            items={warehouseOptions}
            itemToString={(item) => (item ? item.name : '')}
            placeholder="Choose a warehouse"
            onChange={(selectedItem) => {
              if (selectedItem) {
                setSelectedWarehouseInfo(selectedItem.selectedItem);
                setSelectedStorageLocation({});
                setFormValues({
                  ...formValue,
                  expect_wh_id: selectedItem.selectedItem
                    ? selectedItem.selectedItem?.id
                    : '',
                  expact_stock_location_id: '',
                });
              } else {
                setSelectedWarehouseInfo({});
                setSelectedStorageLocation({});
                setFormValues({
                  ...formValue,
                  expect_wh_id: '',
                  expact_stock_location_id: '',
                });
              }
            }}
            selectedItem={selectedWarehouseInfo}
          />
        </Column>
        <Column sm={2} md={4} lg={8}>
          <ComboBox
            className="mb-8"
            titleText="Expect Shelf"
            items={storageLocationOptions}
            itemToString={(item) => (item ? item.name : '')}
            placeholder="Choose a Shelf"
            onChange={(selectedItem) => {
              setSelectedStorageLocation(selectedItem.selectedItem);
              setFormValues({
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
            id="note"
            labelText="Note"
            placeholder="Note"
            value={formValue.note}
            onChange={onFormValueChange}
          />
        </Column>
      </Grid>
    </Modal>
  );
};

export default EditMaterialModal;
