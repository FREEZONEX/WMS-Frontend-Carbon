'use client';
import React, { useEffect, useState } from 'react';
import {
  Grid,
  Column,
  DatePicker,
  DatePickerInput,
  Button,
  FormLabel,
  SwitcherDivider,
  TextInput,
  InlineNotification,
} from '@carbon/react';
import '@/components/MaterialCreateForm/_materialcreateform.scss';
import TaskListTable from '../Table/TaskListTable';
import {
  updateOutboundRecord,
  fetchOutboundDetails,
  addOutboundRecord,
} from '@/actions/actions';
import { useRouter, usePathname } from 'next/navigation';
import moment from 'moment';
import { DateTimeFormat } from '@/utils/constants';

const headers = [
  { key: 'name', header: 'Material Name' },
  { key: 'product_code', header: 'Material Code' },
  { key: 'specification', header: 'Specification' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'unit', header: 'Unit' },
  { key: 'expect_wh_id', header: 'WH' },
  { key: 'expact_stock_location_id', header: 'Shelf' },
];

function OutboundCreateForm({ id }) {
  const router = useRouter();
  const pathName = usePathname();
  // const [fieldValidation, setFieldValidation] = useState({
  //   sourceInvalid: false,
  //   typeInvalid: false,
  // });
  const [formValue, setFormValues] = useState({
    creator: '',
    purchase_order_no: '',
    supplier: '',
    delivery_date: '',
  });
  const [dateShow, setDateShow] = useState('');
  const onFormValueChange = (e) => {
    const { id, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };
  const onDateChange = (e) => {
    if (!e) {
      return;
    }
    setFormValues((prevValues) => ({
      ...prevValues,
      delivery_date: moment(e[0]).format(),
    }));
    setDateShow(moment(e[0]).format(DateTimeFormat.shortDate));
  };
  const [taskList, setTaskList] = useState([]);

  const [isAlert, setIsAlert] = useState(false);

  useEffect(() => {
    if (id) {
      fetchOutboundDetails({ id })
        .then((data) => {
          console.log(data);
          setFormValues({
            creator: data.list[0].outbound_creator,
            purchase_order_no: data.list[0].outbound_purchase_order_no,
            supplier: data.list[0].outbound_supplier,
            delivery_date: data.list[0].outbound_delivery_date,
          });
          setDateShow(
            moment(data.list[0].outbound_delivery_date).format(
              DateTimeFormat.shortDate
            )
          );
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
    } else {
      setIsAlert(false);
    }
    if (pathName === `${process.env.PATH_PREFIX}/operation/outbound/create`) {
      let body = {
        ...formValue,
        source: 'manual',
        request_detail: convertTaskListToFormat(taskList),
      };
      console.log(body);
      addOutboundRecord(body).then(() => {
        setFormValues({
          creator: '',
          purchase_order_no: '',
          supplier: '',
          delivery_date: '',
        });
        setTaskList([]);
        router.push(`${process.env.PATH_PREFIX}/operation/outbound`);
      });
    } else {
      let body = {
        ...formValue,
        source: 'manual',
        status: 'done',
        id,
      };
      console.log(body);
      updateOutboundRecord(body).then(() => {
        setFormValues({
          creator: '',
          purchase_order_no: '',
          supplier: '',
          delivery_date: '',
        });
        setTaskList([]);
        router.push(`${process.env.PATH_PREFIX}/operation/outbound`);
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
          <DatePicker datePickerType="single" onChange={onDateChange}>
            <DatePickerInput
              placeholder="dd/mm/yyyy"
              labelText="Delivery Date"
              id="delivery_date"
              value={dateShow}
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
              pathName ===
              `${process.env.PATH_PREFIX}/operation/outbound/create`
                ? 'Pending'
                : 'Outbound'
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
        <Button
          size="sm"
          kind="tertiary"
          href={`${process.env.PATH_PREFIX}/operation/outbound`}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default OutboundCreateForm;
