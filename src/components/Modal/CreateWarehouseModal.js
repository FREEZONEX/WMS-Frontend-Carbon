import React, { useState } from 'react';
import {
  Modal,
  TextInput,
  Select,
  SelectItem,
  Column,
  Grid,
} from '@carbon/react';
import { AddWarehouses } from '@/actions/actions';
import ShowMessageModal from '@/components/Modal/ShowMessageModal';

const CreateWarehouseModal = ({ isOpen, onClose, setRefresh }) => {
  const [fieldValidation, setFieldValidation] = useState({
    nameInvalid: false,
    warehouseIdInvalid: false,
    typeInvalid: false,
  });
  const [formValue, setFormValues] = useState({
    name: '',
    warehouse_id: '',
    type: '',
    manager: '',
    department: '',
    email: '',
    project_group: '',
    note: '',
  });

  const onFormValueChange = (e) => {
    const { id, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleCancelClicked = () => {
    setFormValues({
      name: '',
      warehouse_id: '',
      type: '',
      manager: '',
      department: '',
      email: '',
      project_group: '',
      note: '',
    });
    setFieldValidation({
      nameInvalid: false,
      warehouseIdInvalid: false,
      typeInvalid: false,
    });
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newValidation = {
      nameInvalid: !formValue.name || formValue.name === '',
      warehouseIdInvalid:
        !formValue.warehouse_id || formValue.warehouse_id === '',
      typeInvalid: !formValue.type || formValue.type === '',
    };
    setFieldValidation(newValidation);

    if (Object.values(fieldValidation).some((v) => v)) {
      setFieldValidation(newValidation);
      return;
    }
    AddWarehouses(formValue)
      .then((res) => {
        setFormValues({
          name: '',
          warehouse_id: '',
          type: '',
          manager: '',
          department: '',
          email: '',
          project_group: '',
          note: '',
        });
        setFieldValidation({
          nameInvalid: false,
          warehouseIdInvalid: false,
          typeInvalid: false,
        });
      })
      .then(() => {
        ShowMessageModal.showSuccess();
        onClose();
        setRefresh({});
      });
  };

  return (
    <Modal
      open={isOpen}
      modalHeading="Create a New Warehouse"
      modalLabel="Warehouse Management"
      primaryButtonText="Save"
      secondaryButtonText="Cancel"
      onRequestClose={handleCancelClicked}
      onRequestSubmit={handleSubmit}
    >
      <Grid className="pl-0 pr-0">
        <Column sm={2} md={4} lg={8}>
          <TextInput
            className="mb-5"
            id="name"
            labelText="Warehouse Name"
            placeholder="Warehouse name"
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
            id="warehouse_id"
            labelText="Warehouse ID"
            placeholder="house#1"
            required
            invalid={fieldValidation.warehouseIdInvalid}
            invalidText="This field cannot be empty"
            value={formValue.warehouse_id}
            onChange={onFormValueChange}
          />
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
            className="mb-5"
            id="type"
            labelText="Type"
            placeholder="type"
            required
            invalid={fieldValidation.typeInvalid}
            invalidText="This field cannot be empty"
            value={formValue.type}
            onChange={onFormValueChange}
          />
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
            className="mb-5"
            id="manager"
            labelText="Manager"
            placeholder="Manager"
            value={formValue.manager}
            onChange={onFormValueChange}
          />
        </Column>

        <Column sm={2} md={4} lg={8}>
          <Select
            className="mb-5"
            id="department"
            defaultValue=""
            labelText="Department"
            value={formValue.department}
            onChange={onFormValueChange}
          >
            <SelectItem value="" text="Choose an option" />
            <SelectItem value="department-1" text="department 1" />
            <SelectItem value="department-2" text="department 2" />
            <SelectItem value="LSG" text="LSG" />
          </Select>
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
            className="mb-5"
            id="email"
            labelText="Email"
            placeholder="Enter email"
            type="email"
            value={formValue.email}
            onChange={onFormValueChange}
          />
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
            id="project_group"
            labelText="Project Group"
            placeholder="Project Group"
            value={formValue.project_group}
            onChange={onFormValueChange}
          />
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
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

export default CreateWarehouseModal;
