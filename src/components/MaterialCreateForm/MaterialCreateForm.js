'use client';
import React, { useState } from 'react';
import { TextInput, Grid, Column, TextArea, Button } from '@carbon/react';
import './_materialcreateform.scss';
import { useRouter } from 'next/navigation';
import { addMaterial } from '@/actions/actions';

function MaterialCreateForm() {
  const [fieldValidation, setFieldValidation] = useState({
    codeInvalid: false,
    nameInvalid: false,
  });
  const [formValue, setFormValue] = useState({
    product_code: '',
    name: '',
    product_type: '',
    unit: '',
    note: '',
  });

  const router = useRouter();

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
      codeInvalid: !formValue.product_code || formValue.product_code === '',
      nameInvalid: !formValue.name || formValue.name === '',
    };
    setFieldValidation(newValidation);

    if (Object.values(fieldValidation).some((v) => v)) {
      setFieldValidation(newValidation);
      return;
    }
    addMaterial(formValue)
      .then(() => {
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
      })
      .then(() => {
        router.push('/warehouse/material');
      });
  };
  return (
    <div>
      <div className=" mt-8">
        <Grid className="pl-0">
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
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
              className="mb-4"
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
              className="mb-4"
              labelText="Material Type"
              id="product_type"
              placeholder="Material Type"
              value={formValue.product_type}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="Unit"
              id="unit"
              placeholder="Unit"
              value={formValue.unit}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={4} md={8} lg={16}>
            <TextArea
              className="mb-4 w-full"
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
          Save
        </Button>
        <Button size="sm" kind="tertiary" href="/warehouse/material">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default MaterialCreateForm;
