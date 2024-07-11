'use client';
import React, { useState, useEffect } from 'react';
import {
  addStorageLocation,
  fetchStorageLocationsByWId,
} from '@/actions/actions';
import { TextInput, Heading, Button, Search } from '@carbon/react';
import { ArrowLeft, Add } from '@carbon/icons-react';
import ShowMessageModal from '@/components/Modal/ShowMessageModal';
import StorageLocationCard from './StorageLocationCard';
import { useRouter } from 'next/navigation';

function AddStorageLocationForm({
  warehouse,
  setShowAddStorageLocation,
  setRefresh,
}) {
  const [formValue, setFormValues] = useState({
    name: '',
    material: '',
    quantity: '',
  });
  const onFormValueChange = (e) => {
    const { id, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const handleSaveClick = () => {
    addStorageLocation({
      warehouse_id: warehouse.id,
      name: formValue.name,
      material: formValue.material,
      quantity: formValue.quantity,
    }).then(() => {
      setRefresh({});
      setShowAddStorageLocation(false);
      setFormValues({
        name: '',
        material: '',
        quantity: '',
      });
    });
  };
  return (
    <div className="mt-[30px]">
      <div
        className="flex"
        onClick={() => {
          setShowAddStorageLocation(false);
        }}
      >
        <ArrowLeft width="14px" height="14px" />
        <Heading className="text-[#525252] text-sm font-normal leading-[12px] tracking-[0.16px]">
          All Storage Locations
        </Heading>
      </div>

      <div className="flex flex-col gap-[9px] mt-[1rem]">
        <Heading className="text-[18px] font-normal">
          Add a Storage Location
        </Heading>

        <TextInput
          id="name"
          labelText="Name"
          required
          placeholder="Name"
          value={formValue.name}
          onChange={onFormValueChange}
        />
        <TextInput
          id="material"
          labelText="Material"
          placeholder="Material"
          value={formValue.material}
          onChange={onFormValueChange}
        />
        <TextInput
          id="quantity"
          labelText="Quantity"
          placeholder="Quantity"
          value={formValue.quantity}
          onChange={onFormValueChange}
        />
        <div className="flex justify-center gap-2">
          <Button
            size="sm"
            className="w-[67px] h-[32px]"
            onClick={handleSaveClick}
          >
            Save
          </Button>
          <Button
            kind="tertiary"
            size="sm"
            className="w-[67px] h-[32px]"
            onClick={() => {
              setShowAddStorageLocation(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddStorageLocationForm;
