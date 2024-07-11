'use client';
import React, { Suspense, useEffect, useState } from 'react';
import { TextInput, Heading, Button } from '@carbon/react';
import { ArrowLeft } from '@carbon/icons-react';
import { AddWarehouses } from '@/actions/actions';
import { useRouter } from 'next/navigation';
import ShowMessageModal from '@/components/Modal/ShowMessageModal';
import '@/app/page.scss';

function Page() {
  const router = useRouter();
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
    router.push(`${process.env.PATH_PREFIX}/warehouse`);
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
        router.push(`${process.env.PATH_PREFIX}/warehouse`);
      });
  };
  return (
    <div>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-1 text-[28px] font-normal">Warehouse</Heading>
          <Heading className="mt-1 text-sm">
            List of warehouses for your storage solutions
          </Heading>
        </div>
      </div>

      <div className="absolute left-[50%] right-[50%] mx-[-50vw] w-screen  mt-[30px]">
        <div className="p-[2rem] gap-[9px] pt-[1rem]">
          <div
            className="flex"
            onClick={() => {
              router.push(`${process.env.PATH_PREFIX}/warehouse`);
            }}
          >
            <ArrowLeft width="14px" height="14px" />
            <Heading className="text-[#525252] text-sm font-normal leading-[12px] tracking-[0.16px]">
              Home
            </Heading>
          </div>
          <div className="flex flex-col gap-[9px] mt-[1rem]">
            <Heading className="text-[18px] font-normal">
              Create a New Warehouse
            </Heading>
            <TextInput
              id="name"
              labelText="Warehouse Name"
              placeholder="Warehouse name"
              required
              invalid={fieldValidation.nameInvalid}
              invalidText="This field cannot be empty"
              value={formValue.name}
              onChange={onFormValueChange}
            />
            <TextInput
              id="warehouse_id"
              labelText="Warehouse ID"
              placeholder="house#1"
              required
              invalid={fieldValidation.warehouseIdInvalid}
              invalidText="This field cannot be empty"
              value={formValue.warehouse_id}
              onChange={onFormValueChange}
            />
            <TextInput
              id="type"
              labelText="Type"
              placeholder="type"
              required
              invalid={fieldValidation.typeInvalid}
              invalidText="This field cannot be empty"
              value={formValue.type}
              onChange={onFormValueChange}
            />
            <TextInput
              id="manager"
              labelText="Manager"
              placeholder="Manager"
              value={formValue.manager}
              onChange={onFormValueChange}
            />
            <TextInput
              id="department"
              labelText="Department"
              placeholder="Department"
              value={formValue.department}
              onChange={onFormValueChange}
            />
            <TextInput
              id="email"
              labelText="Email"
              placeholder="Enter email"
              type="email"
              value={formValue.email}
              onChange={onFormValueChange}
            />
            <TextInput
              id="project_group"
              labelText="Project Group"
              placeholder="Project Group"
              value={formValue.project_group}
              onChange={onFormValueChange}
            />
            <TextInput
              id="note"
              labelText="Note"
              placeholder="Note"
              value={formValue.note}
              onChange={onFormValueChange}
            />
            <div className="flex justify-center gap-2">
              <Button
                size="sm"
                className="w-[67px] h-[32px]"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                kind="tertiary"
                size="sm"
                className="w-[67px] h-[32px]"
                onClick={handleCancelClicked}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
