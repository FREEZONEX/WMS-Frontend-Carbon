'use client';
import '@/components/Task/_task.scss';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  ProgressBar,
} from '@carbon/react';
import { SimpleBarChart, GaugeChart, MeterChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PortInputIcon from '@/utils/pic/Port--input.svg';
import PortOutputIcon from '@/utils/pic/Port--output.svg';
import Time from '@/utils/pic/Time.svg';
import Money from '@/utils/pic/Money.svg';
import {
  CaretRight,
  CaretLeft,
  Maximize,
  NextOutline,
} from '@carbon/icons-react';
import moment from 'moment';
import { DateTimeFormat } from '@/utils/constants';
import TaskTable from '@/components/Task/TaskTable';

const lineStyle = {
  width: '260px',
  height: '0px',
  borderTop: '2px solid #333',
  marginTop: '150px',
  transform: 'rotate(45deg)',
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
      assigned_to: null,
    });
  }
  console.log(datas);
  return datas;
};

const ProgressDatas = () => {
  let datas = [];
  for (let i = 0; i < 4; i++) {
    datas.push({
      label: `Forklift-${i}`,
      subLabel: `1h2m9s`,
      value: Math.floor(Math.random() * 100),
    });
  }
  return datas;
};

export default function Task() {
  const router = useRouter();
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
      <div id="taskContent" className="flex-grow bg-transparent mt-3">
        <div className="flex w-full gap-4">
          <div className="w-4/5">
            <div className="flex flex-row bg-white shadow">
              <div className="w-[257px] bg-[#E0E0E0] text-black h-[368px] relative">
                <div className="flex p-2.5 items-center justify-between">
                  <Heading className="mr-2 text-[16px] font-bold">
                    Open Putaway Tasks
                  </Heading>
                  <Image
                    onClick={() => {
                      router.push(
                        `${process.env.PATH_PREFIX}/operation/task/putaway`
                      );
                    }}
                    className=" text-[#333] cursor-pointer"
                    src={PortInputIcon}
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div style={lineStyle}></div>
                <div className="absolute left-[127px] top-[70px] text-[#4A85F6]">
                  <p className="text-[70px] font-[300]">27 </p>
                  <p className="relative top-[-20px]  font-[600]">
                    task pending
                  </p>
                </div>
                <div className="absolute bottom-[70px] left-6">
                  <p className="text-[70px] font-[300]">50</p>
                  <p className="relative top-[-20px]  font-[600]">
                    task pending
                  </p>
                </div>
                <div className=" absolute bottom-6 w-[100%] pl-3 pr-3">
                  <hr className="border-[#333] border-2 border-solid"></hr>
                </div>
              </div>
              <div className="p-4 flex-auto">
                <Heading className="mr-2  font-bold flex flex-row justify-between">
                  <div> List Of Putaway Tasks</div>
                  <div>
                    <Maximize />
                  </div>
                </Heading>
                <div className="pt-4">
                  <TaskTable rows={rowData()} headers={headerData}></TaskTable>
                </div>
              </div>
            </div>
            <div className="flex flex-row mt-4 bg-white shadow">
              <div className="w-[257px] bg-[#E0E0E0] text-black h-[368px] relative">
                <div className="flex p-2.5 items-center justify-between">
                  <Heading className="mr-2 text-[16px] font-bold">
                    Open Picking Tasks
                  </Heading>
                  <Image
                    onClick={() => {
                      router.push(
                        `${process.env.PATH_PREFIX}/operation/task/picking`
                      );
                    }}
                    className=" text-[#333] cursor-pointer"
                    src={PortOutputIcon}
                    alt="arrow"
                    width={24}
                    height={24}
                  />
                </div>
                <div style={lineStyle}></div>
                <div className="absolute left-[127px] top-[70px] text-[#4A85F6]">
                  <p className="text-[70px] font-[300]">27 </p>
                  <p className="relative top-[-20px]  font-[600]">
                    task pending
                  </p>
                </div>
                <div className="absolute bottom-[70px] left-6">
                  <p className="text-[70px] font-[300]">50</p>
                  <p className="relative top-[-20px]  font-[600]">
                    task pending
                  </p>
                </div>
                <div className=" absolute bottom-6 w-[100%] pl-3 pr-3">
                  <hr className="border-[#333] border-[2px] border-solid"></hr>
                </div>
              </div>
              <div className="p-4 flex-auto">
                <Heading className="mr-2  font-bold flex flex-row justify-between">
                  <div> List Of Picking Tasks</div>
                  <div>
                    <Maximize />
                  </div>
                </Heading>
                <div className="pt-4">
                  <TaskTable rows={rowData()} headers={headerData}></TaskTable>
                </div>
              </div>
            </div>
          </div>

          <div className="w-1/5 flex flex-col gap-4">
            <div className="h-[160px]  p-4  pl-6  pr-6 shadow  bg-white">
              <Heading className="font-bold ">Average Time To Process</Heading>
              <div className="mt-6 flex items-center text-[50px]">
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
            <div className="shadow ">
              <Heading className="mt-3 font-bold ">
                Resource Occupation Rate
              </Heading>
              <div className="bg-white mt-2  p-2 pl-6  pr-6 h-[330px] text-[14px]">
                <Heading className=" font-bold ">
                  <div className="flex flex-row justify-between">
                    <div> Time Of Resource In Use</div>
                    <div className="flex">
                      <CaretLeft /> <CaretRight />
                    </div>
                  </div>
                </Heading>
                <div className="h-[230px]">
                  {ProgressDatas().map((item, index) => {
                    return (
                      <ProgressBar
                        className="mt-4"
                        size="small"
                        key={index}
                        label={item.label}
                        helperText={item.subLabel}
                        value={item.value}
                      />
                    );
                  })}

                  {/* <div className="h-1/4">
                    <MeterChart data={data2} options={options}></MeterChart>
                  </div>
                  <div className="h-1/4">
                    <MeterChart data={data3} options={options}></MeterChart>
                  </div>
                  <div className="h-1/4">
                    <MeterChart data={data4} options={options}></MeterChart>
                  </div> */}
                </div>
              </div>
            </div>
            <div className=" bg-white p-4  pl-6  pr-6 shadow flex-auto">
              <Heading className="font-bold ">
                <div className="flex flex-row justify-between">
                  <div>Time Of Resource Idle</div>
                  <div className="flex">
                    <CaretLeft /> <CaretRight />
                  </div>
                </div>
              </Heading>
              <div className="bg-white mt-4 text-[14px]">
                <div className="flex flex-row justify-between">
                  <div className="italic font-[400]">Forklift 05</div>
                  <div>1h2min9s</div>
                </div>
                <div className="flex flex-row justify-between mt-2 ">
                  <div className="italic font-[400]">Forklift 05</div>
                  <div>1h2min9s</div>
                </div>
                <div className="flex flex-row justify-between mt-2 ">
                  <div className="italic font-[400]">Trays 05</div>
                  <div>1h2min9s</div>
                </div>
                <div className="flex flex-row justify-between mt-2 ">
                  <div className="italic font-[400]">Forklift 05</div>
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
