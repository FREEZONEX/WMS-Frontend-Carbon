'use client';
import React, { useState, useEffect } from 'react';
import {
  TextInput,
  Grid,
  Column,
  Button,
  Select,
  SelectItem,
} from '@carbon/react';
import './_materialcreateform.scss';
import { useRouter } from 'next/navigation';
import { addMaterialRFID, fetchMaterial } from '@/actions/actions';

function RFIDCreateForm() {
  const [fieldValidation, setFieldValidation] = useState({
    idInvalid: false,
    rfidInvalid: false,
    quantityInvalid: false,
  });
  const [formValue, setFormValue] = useState({
    material_id: '',
    rfid: '',
    quantity: '',
  });
  const [materialId, setMaterialId] = useState([]);
  const router = useRouter();

  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    setFormValue((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  useEffect(() => {
    fetchMaterial().then((res) => {
      setMaterialId(res);
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newValidation = {
      idInvalid: !formValue.material_id || formValue.material_id === '',
      rfidInvalid: !formValue.rfid || formValue.rfid === '',
      quantityInvalid: !formValue.quantity || formValue.quantity === '',
    };
    setFieldValidation(newValidation);

    if (Object.values(fieldValidation).some((v) => v)) {
      setFieldValidation(newValidation);
      return;
    }
    const body = {
      material_id: formValue.material_id,
      rfid: formValue.rfid,
      quantity: parseInt(formValue.quantity),
    };
    console.log(body);
    addMaterialRFID(body)
      .then(() => {
        setFormValue({
          material_id: '',
          rfid: '',
          quantity: '',
        });
        setFieldValidation({
          codeInvalid: false,
          nameInvalid: false,
        });
      })
      .then(() => {
        router.push('/warehouse/material/rfid');
      });
  };
  return (
    <div>
      <div className=" mt-8">
        <Grid className="pl-0">
          <Column sm={4} md={3} lg={4}>
            <Select
              className="mb-4"
              labelText="Material Name"
              id="material_id"
              placeholder="Material Name"
              invalid={fieldValidation.idInvalid}
              invalidText="This field cannot be empty"
              value={formValue.material_id}
              onChange={onFormValueChange}
              required
            >
              <SelectItem disabled hidden value="" text="Choose an option" />
              {materialId.map((material) => {
                return (
                  <SelectItem
                    key={material.id}
                    value={material.id}
                    text={material.name}
                  />
                );
              })}
            </Select>
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="Material Id"
              id="material_id"
              placeholder="Material Id"
              invalid={fieldValidation.idInvalid}
              invalidText="This field cannot be empty"
              value={formValue.material_id}
              onChange={onFormValueChange}
              readOnly
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="RFID"
              id="rfid"
              placeholder="RFID"
              invalid={fieldValidation.rfidInvalid}
              invalidText="This field cannot be empty"
              value={formValue.rfid}
              onChange={onFormValueChange}
            />
          </Column>
          <Column sm={2} md={4} lg={4}>
            <TextInput
              className="mb-4"
              labelText="Quantity"
              id="quantity"
              placeholder="Quantity"
              invalid={fieldValidation.quantityInvalid}
              invalidText="This field cannot be empty"
              value={formValue.quantity}
              onChange={onFormValueChange}
            />
          </Column>
        </Grid>
      </div>
      <div className="flex space-x-4 mt-4 justify-center ">
        <Button size="sm" onClick={handleSubmit}>
          Save
        </Button>
        <Button
          size="sm"
          kind="tertiary"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/warehouse/material/rfid`);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default RFIDCreateForm;
