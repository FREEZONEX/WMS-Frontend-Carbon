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
import moment from 'moment';
import { DateTimeFormat } from '@/utils/constants';
import ShowMessageModal from '../Modal/ShowMessageModal';

const headers = [
  { key: 'name', header: 'Material Name' },
  { key: 'material_code', header: 'Material Code' },
  { key: 'specification', header: 'Specification' },
  { key: 'quantity', header: 'Quantity' },
  { key: 'unit', header: 'Unit' },
  { key: 'expect_wh_id', header: 'WH' },
  { key: 'suggested_storage_location_name', header: 'Location' },
];

function InboundCreateForm({ id }) {
  const router = useRouter();
  const [fieldValidation, setFieldValidation] = useState({
    purchase_order_noInvalid: false,
    creatorInvalid: false,
    deliveryDateInvalid: false,
    supplierInvalid: false,
  });
  const pathName = usePathname();
  const [taskList, setTaskList] = useState([]);
  const [alert, setAlert] = useState({ isAlert: false, msg: '' });
  const [formValue, setFormValues] = useState({
    creator: '',
    purchase_order_no: '',
    supplier: '',
    delivery_date: '',
    status:
      pathName === `${process.env.PATH_PREFIX}/operation/inbound/create`
        ? 'Pending'
        : 'Inbound',
    delivery_date_show: '',
  });
  const [dateShow, setDateShow] = useState('');
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

  const onFormValueChange = (e) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
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
          setDateShow(
            moment(data.list[0].inbound_delivery_date).format(
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
    setAlert({ isAlert: false, msg: '' });
    e.preventDefault();
    const newValidation = {
      creatorInvalid: !formValue.creator || formValue.creator === '',
      purchase_order_noInvalid:
        !formValue.purchase_order_no || formValue.purchase_order_no === '',
      deliveryDateInvalid:
        !formValue.delivery_date || formValue.delivery_date === '',
      supplierInvalid: !formValue.supplier || formValue.supplier === '',
    };
    setFieldValidation(newValidation);

    if (Object.values(newValidation).some((v) => v)) {
      setFieldValidation(newValidation);
      setAlert({ isAlert: true, msg: 'Please check some field required.' });
      return;
    }

    if (taskList.length === 0) {
      setAlert({
        isAlert: true,
        msg: 'At least one inbound materail requred.',
      });
      return;
    }
    if (pathName === `${process.env.PATH_PREFIX}/operation/inbound/create`) {
      let body = {
        ...formValue,
        source: 'manual',
        details: convertTaskListToFormat(taskList),
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
        material_id: task.id,
        material_name: task.name,
        operation_id: '',
        rf_id: '',
        stock_quantity: 0,
        quantity: task.quantity,
        location_id: task.suggested_storage_location_id,
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
          <DatePicker
            datePickerType="single"
            id="delivery_date"
            onChange={onDateChange}
          >
            <DatePickerInput
              placeholder="dd/mm/yyyy"
              labelText="Delivery Date"
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
            value={formValue.status}
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

      {alert.isAlert && (
        <InlineNotification
          className="w-full"
          title="Notice: "
          subtitle={alert.msg}
          onClose={() => setAlert({ isAlert: false, msg: '' })}
        />
      )}
      <div className="flex space-x-4 mt-10 justify-center ">
        <Button size="sm" onClick={handleSubmit}>
          Submit
        </Button>
        <Button
          size="sm"
          kind="tertiary"
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/operation/inbound`);
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default InboundCreateForm;
