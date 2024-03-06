import React from 'react';
import {
  Modal,
  TextInput,
  Select,
  SelectItem,
  Column,
  Grid,
} from '@carbon/react';

const CreateWarehouseModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      modalHeading="Create a New Warehouse"
      modalLabel="Warehouse Management"
      primaryButtonText="Save"
      secondaryButtonText="Cancel"
      onRequestClose={onClose}
      onRequestSubmit={() => {}}
    >
      <Grid className="pl-0 pr-0">
        <Column sm={2} md={4} lg={8}>
          <TextInput
            className="mb-5"
            id="warehouse-name"
            labelText="Warehouse Name"
            placeholder="Warehouse name"
            required
          />
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
            className="mb-5"
            id="warehouse-id"
            labelText="Warehouse ID"
            placeholder="house#1"
            required
          />
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
            className="mb-5"
            id="warehouse-type"
            labelText="Type"
            placeholder="type"
            required
          />
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
            className="mb-5"
            id="warehouse-manager"
            labelText="Manager"
            placeholder="Manager"
            required
          />
        </Column>

        <Column sm={2} md={4} lg={8}>
          <Select
            className="mb-5"
            id="warehouse-department"
            defaultValue="placeholder-item"
            labelText="Department"
            required
          >
            <SelectItem
              disabled
              hidden
              value="placeholder-item"
              text="Choose an option"
            />
            <SelectItem value="option-1" text="department 1" />
            <SelectItem value="option-2" text="department 2" />
          </Select>
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
            className="mb-5"
            id="warehouse-email"
            labelText="Email"
            placeholder="Enter email"
            type="email"
            required
          />
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
            id="warehouse-project-group"
            labelText="Project Group"
            placeholder="Project Group"
            required
          />
        </Column>
        <Column sm={2} md={4} lg={8}>
          <TextInput
            id="warehouse-Note"
            labelText="Note"
            placeholder="Note"
            required
          />
        </Column>
      </Grid>
    </Modal>
  );
};

export default CreateWarehouseModal;
