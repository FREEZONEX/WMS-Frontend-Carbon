import React, { useEffect, useState } from 'react';
import { Modal, TextInput, Column, Grid, TextArea } from '@carbon/react';
import { updateMaterial } from '@/actions/actions';

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
  useEffect(() => {
    setFormValues(materialValues);
  }, [materialValues]);
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
