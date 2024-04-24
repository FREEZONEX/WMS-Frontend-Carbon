'use client';
import '@/components/Task/_task.scss';
import React, { useState, useEffect, useCallback } from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { SimpleBarChart, GaugeChart, MeterChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PortInputIcon from '@/utils/pic/Port--input.svg';
import PortOutputIcon from '@/utils/pic/Port--output.svg';
import Time from '@/utils/pic/Time.svg';
import Money from '@/utils/pic/Money.svg';
import { CaretRight, CaretLeft } from '@carbon/icons-react';
import WMSDataTable from '@/components/Table/DataTable';
import moment from 'moment';
import { DateTimeFormat } from '@/utils/constants';

const lineStyle = {
  width: '190px',
  height: '0px',
  borderTop: '1px solid #333',
  marginTop: '85px',
  transform: 'rotate(49deg)',
};

const headerData = [
  {
    header: 'Creation Time',
    key: 'create_time',
  },
  {
    header: 'Material',
    key: 'material',
  },
  {
    header: 'Quantity',
    key: 'quantity',
  },
  {
    header: 'Resource',
    key: 'resource',
  },
  {
    header: 'Assigned To',
    key: 'assigned_to',
  },
];

const rowData = () => {
  let datas = [];
  for (let i = 0; i < 6; i++) {
    datas.push({
      create_time: moment().format(DateTimeFormat.shortDate),
      material: 'Planks',
      quantity: '100',
      resource: 'Resource',
      assigned_to: 'admin',
    });
  }
  console.log(datas);
  return datas;
};

const data1 = [
  {
    group: 'Forklift',
    value: 0,
  },
];
const data2 = [
  {
    group: 'Forklift',
    value: 50,
  },
];
const data3 = [
  {
    group: 'Tray',
    value: 100,
  },
];
const data4 = [
  {
    group: 'Forklift',
    value: 20,
  },
];
const options = {
  peek: '100',
  toolbar: {
    enabled: false, // Disables the entire toolbar
  },
  meter: {
    status: {
      ranges: [
        {
          range: [50, 100],
          status: 'success',
        },
        {
          range: [0, 50],
          status: 'warning',
        },
        // {
        //   range: [60, 100],
        //   status: 'danger',
        // },
      ],
    },
    height: '5px',
  },
};
export default function Task() {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <a
            onClick={() => {
              router.push(`${process.env.PATH_PREFIX}/home`);
            }}
          >
            Home
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem
          onClick={() => {
            router.push(`${process.env.PATH_PREFIX}/task`);
          }}
        >
          Task
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Task</Heading>
          <Heading className="mt-1 text-sm">
            An instant snapshot of inventory, order status, and efficiency,
            streamlining warehouse management.
          </Heading>
        </div>
      </div>
      <div id="taskContent" className="flex-grow bg-gray-100 mt-3">
        <div className="flex w-full gap-4">
          <div className="w-4/5">
            <div className="flex flex-row bg-white shadow h-[270px]">
              <div className="w-[186px] bg-[#E0E0E0] text-black h-[270px] relative">
                <div className="flex p-2.5 items-center justify-between">
                  <Heading className="mr-2 text-[12px] font-bold">
                    Open Putaway Tasks
                  </Heading>
                  <Image
                    className=" text-[#333]"
                    src={PortInputIcon}
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div style={lineStyle}></div>
                <div className="absolute right-3 top-[70px] text-[#4A85F6]">
                  <div className="text-4xl">27</div>
                  <div className="text-xs">task pending</div>
                </div>
                <div className="absolute bottom-[70px] left-4">
                  <div className="text-4xl">50</div>
                  <div className="text-xs">have been down</div>
                </div>
                <div className=" absolute bottom-1 w-[100%] pl-3 pr-3">
                  <hr className="border-[#333] border-1 border-solid"></hr>
                </div>
              </div>
              <div className="p-4 flex-auto">
                <Heading className="mr-2 text-[12px] font-bold">
                  List Of Putaway Tasks
                </Heading>
                <div className="pt-2">
                  <WMSDataTable
                    rows={rowData()}
                    headers={headerData}
                  ></WMSDataTable>
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-4 bg-white shadow h-[270px]">
              <div className="w-[186px] text-black bg-[#E0E0E0] h-[270px] relative">
                <div className="flex p-2.5 items-center justify-between">
                  <Heading className="mr-2 text-[12px] font-bold">
                    Open Picking Tasks
                  </Heading>
                  <Image
                    style={{ color: 'black' }}
                    src={PortInputIcon}
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div style={lineStyle}></div>
                <div className="absolute right-3 top-[70px] text-[#4A85F6]">
                  <div className="text-4xl">27</div>
                  <div className="text-xs">task pending</div>
                </div>
                <div className="absolute bottom-[70px] left-4">
                  <div className="text-4xl">50</div>
                  <div className="text-xs">have been down</div>
                </div>
                <div className=" absolute bottom-1 w-[100%] pl-3 pr-3">
                  <hr className="border-[#666] border-1 border-solid"></hr>
                </div>
              </div>
              <div className="p-4 flex-auto">
                <Heading className="mr-2 text-[12px] font-bold">
                  List Of Picking Tasks
                </Heading>
                <div className="pt-2">
                  <WMSDataTable
                    rows={rowData()}
                    headers={headerData}
                  ></WMSDataTable>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/5 bg-gray-100 h-128 gap-4">
            <div className="h-[100px] p-4 shadow  bg-white">
              <Heading className="text-[12px] font-bold ">
                Average Time To Process
              </Heading>
              <div className="mt-6 flex items-center text-[28px]">
                <div>2m34s</div>
                <Image
                  className="ml-6"
                  src={Time}
                  alt="arrow"
                  width={24}
                  height={24}
                />
              </div>
            </div>
            <div className="mt-4 shadow ">
              <Heading className="mt-3 text-[12px] font-bold ">
                <div className="flex flex-row justify-between">
                  <div> Resource Occupation Rate</div>
                  <div className="pr-4">
                    <CaretLeft /> <CaretRight />
                  </div>
                </div>
              </Heading>
              <div className="bg-white mt-2 p-4 h-[230px]">
                <Heading className="text-[12px] font-bold ">
                  Time Of Resource In Use
                </Heading>
                <div className="h-[180px] mt-2">
                  <div className="h-1/4">
                    <MeterChart data={data1} options={options}></MeterChart>
                  </div>
                  <div className="h-1/4">
                    <MeterChart data={data2} options={options}></MeterChart>
                  </div>
                  <div className="h-1/4">
                    <MeterChart data={data3} options={options}></MeterChart>
                  </div>
                  <div className="h-1/4">
                    <MeterChart data={data4} options={options}></MeterChart>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-white  p-4 shadow  h-[166px]">
              <Heading className="mt-2 text-[12px] font-bold ">
                <div className="flex flex-row justify-between">
                  <div>Time Of Resource Idle</div>
                  <div className="pr-4">
                    <CaretLeft /> <CaretRight />
                  </div>
                </div>
              </Heading>
              <div className="bg-white mt-4">
                <div className="flex flex-row justify-between">
                  <div className="italic">Forklift 05</div>
                  <div>1h2min9s</div>
                </div>
                <div className="flex flex-row justify-between mt-2 ">
                  <div className="italic">Forklift 05</div>
                  <div>1h2min9s</div>
                </div>
                <div className="flex flex-row justify-between mt-2 ">
                  <div className="italic">Trays 05</div>
                  <div>1h2min9s</div>
                </div>
                <div className="flex flex-row justify-between mt-2 ">
                  <div className="italic">Forklift 05</div>
                  <div>1h2min9s</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
