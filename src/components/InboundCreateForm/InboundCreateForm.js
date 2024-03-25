'use client';
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Column,
  Button,
  SwitcherDivider,
  TextInput,
  InlineNotification,
  DatePicker,
  DatePickerInput,
  FormLabel,
} from '@carbon/react';
import '@/components/MaterialCreateForm/_materialcreateform.scss';
import TaskListTable from '../Table/TaskListTable';
import {
  addInboundRecord,
  fetchInboundDetails,
  updateInboundRecord,
} from '@/actions/actions';
import { useRouter, usePathname } from 'next/navigation';

const headers = [
  { key: 'name', header: 'Material Name' },
  { key: 'product_code', header: 'Material Code' },
  { key: 'specification', header: 'Specification' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'unit', header: 'Unit' },
  { key: 'expect_wh_id', header: 'WH' },
  { key: 'expact_stock_location_id', header: 'Shelf' },
];

function InboundCreateForm({ id }) {
  const router = useRouter();
  // const [fieldValidation, setFieldValidation] = useState({
  //   purchase_order_noInvalid: false,
  //   creatorInvalid: false,
  //   deliveryDateInvalid: false,
  // });
  const pathName = usePathname();
  console.log(pathName);
  const [taskList, setTaskList] = useState([]);
  const [isAlert, setIsAlert] = useState(false);
  const [formValue, setFormValues] = useState({
    creator: '',
    purchase_order_no: '',
    supplier: '',
    delivery_date: '',
  });
  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    if (id === 'delivery_date') {
      const formattedDate = new Date(value).toISOString();
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: formattedDate,
      }));
    } else {
      setFormValues((prevValues) => ({
        ...prevValues,
        [id]: value,
      }));
    }
  };
  console.log(formValue, taskList, 'id', id);

  useEffect(() => {
    if (id) {
      fetchInboundDetails({ id })
        .then((data) => {
          console.log(data);
          setFormValues({
            creator: data.list[0].inbound_creator,
            purchase_order_no: data.list[0].inbound_purchase_order_no,
            supplier: data.list[0].inbound_supplier,
            delivery_date: data.list[0].inbound_delivery_date,
          });
          const taskList = data.list.map((item) => ({
            name: item.name,
            product_code: item.product_code,
            specification: item.specification,
            quantity: item.quantity,
            unit: item.unit,
            expect_wh_id: item.warehouse_id,
            expact_stock_location_id: item.stock_location_id,
          }));
          setTaskList(taskList);
        })
        .catch((error) => {
          console.error('Failed to fetch inbound details:', error);
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const newValidation = {
    //   sourceInvalid: !formValue.source || formValue.source === '',
    //   typeInvalid: !formValue.type || formValue.type === '',
    // };
    // setFieldValidation(newValidation);

    // if (Object.values(newValidation).some((v) => v)) {
    //   setFieldValidation(newValidation);
    //   return;
    // }
    if (taskList.length === 0) {
      setIsAlert(true);
      return;
    }
    if (pathName === `${process.env.PATH_PREFIX}/operation/inbound/create`) {
      let body = {
        ...formValue,
        source: 'manual',
        request_detail: convertTaskListToFormat(taskList),
      };
      addInboundRecord(body).then(() => {
        setFormValues({
          creator: '',
          purchase_order_no: '',
          supplier: '',
          delivery_date: '',
        });
        setTaskList([]);
        router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
      });
    } else {
      let body = {
        ...formValue,
        source: 'manual',
        status: 'done',
        id,
      };
      console.log(body);
      updateInboundRecord(body).then(() => {
        setFormValues({
          creator: '',
          purchase_order_no: '',
          supplier: '',
          delivery_date: '',
        });
        setTaskList([]);
        router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
      });
    }
  };

  function convertTaskListToFormat(taskList) {
    const shelfRecords = taskList.map((task) => {
      return {
        material_code: task.product_code,
        quantity: task.quantity,
        stock_location_id: task.expact_stock_location_id,
        wh_id: task.expect_wh_id,
      };
    });

    return shelfRecords;
  }

  return (
    <div>
      <Grid className="p-0 mt-[50px] gap-[9px]">
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Creator"
            id="creator"
            placeholder="Creator"
            value={formValue.creator}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Purchase order No."
            id="purchase_order_no"
            placeholder="Purchase order No."
            value={formValue.purchase_order_no}
            onChange={onFormValueChange}
          />
        </Column>
        <Column className="ml-0" sm={2} md={4} lg={4}>
          <TextInput
            className="flex-auto "
            labelText="Supplier"
            id="supplier"
            placeholder="Supplier"
            value={formValue.supplier}
            onChange={onFormValueChange}
          />
        </Column>

        <Column className="ml-0" sm={2} md={4} lg={4}>
          <DatePicker datePickerType="single">
            <DatePickerInput
              placeholder="mm/dd/yyyy"
              labelText="Delivery Date"
              id="delivery_date"
              value={formValue.delivery_date}
              onChange={onFormValueChange}
            />
          </DatePicker>
        </Column>
        <Column sm={2} md={4} lg={4}>
          <TextInput
            readOnly
            className="flex-auto"
            labelText="Status"
            id="status"
            placeholder="Status"
            value={
              pathName === `${process.env.PATH_PREFIX}/operation/inbound/create`
                ? 'Pending'
                : 'Inbound'
            }
          />
        </Column>
      </Grid>
      <SwitcherDivider className="w-full mt-10 mb-10 pl-0" />

      <div className="mb-10">
        <FormLabel className="mb-2">Material List</FormLabel>
        <TaskListTable
          headers={headers}
          rows={taskList}
          setRows={setTaskList}
        />
      </div>

      {isAlert && (
        <InlineNotification
          className="w-full"
          title="Notice: "
          subtitle="No inbound material"
        />
      )}
      <div className="flex space-x-4 mt-10 justify-center ">
        <Button size="sm" onClick={handleSubmit}>
          Submit
        </Button>
        <Button size="sm" kind="tertiary" href="/operation/inbound">
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default InboundCreateForm;
