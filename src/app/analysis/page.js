'use client';
import React from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { SimpleBarChart, GaugeChart, MeterChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { ContainedList, ContainedListItem } from '@carbon/react';
import { useRouter } from 'next/navigation';
// import './analysis.module.css';
import {
  Add,
  Apple,
  Fish,
  Strawberry,
  Close,
  Wheat,
} from '@carbon/icons-react';
function Page() {
  const router = useRouter();
  const data = [
    {
      group: 'inbound 1245',
      key: 'turnover rate',
      value: 96.8,
    },
    {
      group: 'inbound 4095',
      key: 'turnover rate',
      value: 87.8,
    },
    {
      group: 'inbound 133',
      key: 'turnover rate',
      value: 88.5,
    },

    {
      group: 'inbound 1984',
      key: 'turnover rate',
      value: 80,
    },
    {
      group: 'inbound 985',
      key: 'turnover rate',
      value: 91.2,
    },

    // {
    //   "group": "Dataset 6",
    //   "key": "turnover rate",
    //   "value": 96.5
    // },
    // {
    //   "group": "Dataset 7",
    //   "key": "turnover rate",
    //   "value": 99.5
    // },
    // {
    //   "group": "Dataset 8",
    //   "key": "turnover rate",
    //   "value": 97.5
    // },
    // {
    //   "group": "Dataset 9",
    //   "key": "turnover rate",
    //   "value": 95.5
    // },
    // {
    //   "group": "Dataset 10",
    //   "key": "turnover rate",
    //   "value": 94.5
    // },
  ];

  const options = {
    axes: {
      left: {
        mapsTo: 'value',
        scaleType: 'linear',
        title: 'Rate%',
      },
      bottom: {
        scaleType: 'labels',
        mapsTo: 'group',
      },
    },
    height: '400px',
  };

  const data2 = [
    {
      group: 'value',
      value: 42,
    },
    {
      group: 'delta',
      value: -13.37,
    },
  ];

  const options2 = {
    toolbar: {
      enabled: false, // Disables the entire toolbar
    },
    resizable: true,
    height: '105px',
    width: '100%',
  };

  const data3 = [
    {
      group: 'value',
      value: 77,
    },
    {
      group: 'delta',
      value: 340,
    },
  ];

  const options3 = {
    color: {
      scale: {
        value: '#00f', // 示例：设置“value”组的颜色为蓝色
        delta: '#f00', // 示例：设置“delta”组的颜色为红色
      },
    },
    gauge: {
      type: 'semi',
      status: 'danger',
    },
    toolbar: {
      enabled: false, // Disables the entire toolbar
    },
    resizable: true,
    height: '105px',
    width: '100%',
  };

  const data4 = [
    {
      group: 'SUPCON',
      value: 56,
    },
  ];
  const options4 = {
    peek: '100',
    toolbar: {
      enabled: false, // Disables the entire toolbar
    },
    meter: {
      status: {
        ranges: [
          {
            range: [0, 50],
            status: 'success',
          },
          {
            range: [50, 60],
            status: 'warning',
          },
          {
            range: [60, 100],
            status: 'danger',
          },
        ],
      },
      height: '25px',
    },
  };
  const data5 = [
    {
      group: 'SIEMENS',
      value: 78,
    },
  ];
  const options5 = {
    peek: '100',
    toolbar: {
      enabled: false, // Disables the entire toolbar
    },
    meter: {
      status: {
        ranges: [
          {
            range: [0, 50],
            status: 'success',
          },
          {
            range: [50, 60],
            status: 'warning',
          },
          {
            range: [60, 100],
            status: 'danger',
          },
        ],
      },
      height: '25px',
    },
  };

  const data6 = [
    {
      group: 'IMI',
      value: 30,
    },
  ];
  const options6 = {
    peek: '100',
    toolbar: {
      enabled: false, // Disables the entire toolbar
    },
    meter: {
      status: {
        ranges: [
          {
            range: [0, 50],
            status: 'success',
          },
          {
            range: [50, 60],
            status: 'warning',
          },
          {
            range: [60, 100],
            status: 'danger',
          },
        ],
      },
      height: '25px',
    },
  };

  const arrowIconStyle = {
    width: '24px',
    height: '24px',
    verticalAlign: 'middle',
  };

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
            router.push(`${process.env.PATH_PREFIX}/analysis`);
          }}
        >
          Analysis
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="bx--col-lg-16 flex justify-between items-center">
        <div>
          <Heading className="mt-2 text-[28px] font-normal">Dashboard</Heading>
          <Heading className="mt-1 text-sm">
            An instant snapshot of inventory, order status, and efficiency,
            streamlining warehouse management.
          </Heading>
        </div>
      </div>
      <div id="mainContent" className="flex-grow bg-gray-100 p-8">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-6 shadow-md max-w-lg  relative">
              <Heading className="mt-2 text-[24px] font-normal">
                Inbound
              </Heading>
              <div className="absolute bottom-5 left-0 mb-4 ml-6">
                <div className="flex items-baseline  text-3xl">
                  <Heading className="text-5xl font-semibold fontIBM">
                    27
                  </Heading>
                  /<Heading className="text-3xl ml-2 fontIBM">80</Heading>
                </div>
              </div>
              <div className="absolute bottom-5 right-0 mb-4 mr-6">
                <img src="/Port--input.svg" alt="arrow" className="w-8 h-8" />
              </div>
            </div>
            <div className="bg-white p-6 shadow-md max-w-lg  relative">
              <Heading className="mt-3 text-[24px] font-normal ">
                Outbound Number
              </Heading>
              <div className="absolute bottom-5 left-0 mb-4 ml-6">
                <div className="flex items-baseline text-3xl">
                  <Heading className="text-5xl font-semibold ">27</Heading>/
                  <Heading className="text-3xl ml-2 ">80</Heading>
                </div>
              </div>
              <div className="absolute bottom-5 right-0 mb-4 mr-6">
                <img src="/Port--output.svg" alt="arrow" className="w-8 h-8" />
              </div>
            </div>
            <div className="bg-white p-6 shadow-md max-w-lg  relative">
              <Heading className="mt-3 text-[24px] font-normal ">
                Longest awaiting time
              </Heading>
              <div className="absolute bottom-5 left-0 mb-4 ml-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-['IBM Plex Sans'] font-semibold">
                    2m38s
                  </span>
                </div>
              </div>
              <div className="absolute bottom-5 right-0 mb-4 mr-6">
                <img src="/Time.svg" alt="arrow" className="w-8 h-8" />
              </div>
            </div>

            <div className="shadow-md bg-white p-6 shadow lg:col-span-2 lg:row-span-2">
              <Heading className="mt-2 text-[24px] font-normal absolute">
                Turnover Rate Top5
              </Heading>
              <SimpleBarChart
                className="absolute top-0"
                data={data}
                options={options}
              />
            </div>

            <div className="bg-white p-6 shadow-md max-w-lg  relative">
              <Heading className="mt-3 text-[24px] font-normal ">
                Comm Efficiency Rate
              </Heading>
              <div className="absolute bottom-3  mb-2 ml-3 pr-6">
                <div className="flex  items-center justify-center w-full h-full">
                  <GaugeChart
                    data={data2}
                    options={options2}
                    className="w-full h-full"
                  >
                    {' '}
                  </GaugeChart>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 shadow-md max-w-lg relative">
              <Heading className="mt-3 text-[24px] font-normal ">
                Space Occupancy
              </Heading>
              <div className="absolute bottom-3 mb-2 ml-3 pr-6">
                <div className="flex items-center justify-center w-full h-full">
                  <GaugeChart
                    data={data3}
                    options={options3}
                    className="w-full h-full"
                  >
                    {' '}
                  </GaugeChart>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 shadow-md max-w-lg  relative">
              <Heading className="mt-3 text-[24px] font-normal ">Value</Heading>
              <div className="absolute bottom-5 left-0 mb-4 ml-6">
                <div className="flex items-baseline">
                  <Heading className="text-5xl font-semibold fontIBM">
                    6000$
                  </Heading>
                </div>
              </div>
              <div className="absolute bottom-5 right-0 mb-4 mr-6">
                <img src="/Money.svg" alt="arrow" className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex py-8 w-full h-1/2-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div className="bg-white p-6 shadow lg:col-span-2 h-full">
              <Heading className="mt-3 text-[20px] font-normal ">
                Recently Supplier
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 w-full h-1/16">
                <div className="bg-white  p-1  mt-5 relative">
                  <img
                    src="/picture/20240322-141125.png"
                    alt="arrow"
                    className="w-full h-full"
                  />
                </div>
                <div className=" col-span-7 bg-white p-3  mt-2  relative">
                  <MeterChart data={data4} options={options4}></MeterChart>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2  w-full h-1/16">
                <div className="bg-white p-1  mt-5  relative">
                  <img
                    src="/picture/20240322-141213.png"
                    alt="arrow"
                    className="w-full h-full"
                  />
                </div>
                <div className="col-span-7 bg-white p-3 mt-2  relative">
                  <MeterChart data={data5} options={options5}></MeterChart>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2  w-full h-1/16">
                <div className="bg-white p-1 mt-5 relative">
                  <img
                    src="/picture/20240322-141217.png"
                    alt="arrow"
                    className="w-full h-full"
                  />
                </div>
                <div className="col-span-7 bg-white p-3 mt-2   relative">
                  <MeterChart data={data6} options={options6}></MeterChart>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 shadow lg:col-span-2 h-full">
              <Heading className="mt-3 text-[20px] font-normal ">
                Recently Supplier
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 w-full h-1/16">
                <div className="bg-white  p-1  mt-5 relative">
                  <img
                    src="/picture/20240322-141220.png"
                    alt="arrow"
                    className="w-full h-full"
                  />
                </div>
                <div className=" col-span-7 bg-white p-3  mt-2  relative">
                  <MeterChart data={data4} options={options4}></MeterChart>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2  w-full h-1/16">
                <div className="bg-white p-1 mt-5 relative">
                  <img
                    src="/picture/20240322-141223.png"
                    alt="arrow"
                    className="w-full h-full"
                  />
                </div>
                <div className="col-span-7 bg-white p-3 mt-2   relative">
                  <MeterChart data={data5} options={options5}></MeterChart>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2  w-full h-1/16">
                <div className="bg-white p-1 mt-5 relative">
                  <img
                    src="/picture/20240322-141226.png"
                    alt="arrow"
                    className="w-full h-full"
                  />
                </div>
                <div className="col-span-7 bg-white p-3 mt-2   relative">
                  <MeterChart data={data6} options={options6}></MeterChart>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full">
          <div className="w-1/3 bg-white p-6 shadow h-128">
            <Heading className="mt-3 text-[20px] font-normal ">
              Current Worker
            </Heading>
            <div className="shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-1 w-full">
              <div className="bg-white  items-center justify-center  col-span-2  p-3 mt-4 relative ">
                <img
                  src="/picture/20240322-145020.png"
                  alt="arrow"
                  className="ml-5 mx-auto w-3/4 h-full"
                />
              </div>
              <div className="bg-white  col-span-4  p-1 ml-0 mt-5 relative">
                <div className="mt-5 text-[16px] font-bold right-0">
                  Jesse Thomas
                </div>
                <div className="mt-5 text-[16px] right-0">ID: #123456</div>
              </div>
              <div className="   bg-white p-2  mt-4   relative">
                <div className="bottom-2 left-0 absolute ">
                  <img
                    src="/Port--input.svg"
                    alt="arrow"
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">3</div>
              </div>
              <div className="   bg-white p-2  mt-4   relative">
                <div className="bottom-2 left-0 absolute ">
                  <img
                    src="/Port--output.svg"
                    alt="arrow"
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">2</div>
              </div>
            </div>
            <div className="shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-1 w-full">
              <div className="bg-white  col-span-2  p-3 justify-center mt-4 relative">
                <img
                  src="/picture/20240322-145025.png"
                  alt="arrow"
                  className=" ml-5 w-3/4 h-full"
                />
              </div>
              <div className="bg-white  col-span-4  p-1 ml-0 mt-5 relative">
                <div className="mt-5 text-[16px] font-bold right-0">
                  Thisal Mathiyazhagan
                </div>
                <div className="mt-5 text-[16px] right-0">ID: #123456</div>
              </div>
              <div className="   bg-white p-2  mt-4   relative">
                <div className="bottom-2 left-0 absolute ">
                  <img
                    src="/Port--input.svg"
                    alt="arrow"
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">3</div>
              </div>
              <div className="   bg-white p-2  mt-4   relative">
                <div className="bottom-2 left-0 absolute ">
                  <img
                    src="/Port--output.svg"
                    alt="arrow"
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">2</div>
              </div>
            </div>
            <div className="shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-1 w-full">
              <div className="bg-white  col-span-2  p-3 justify-center mt-4 relative">
                <img
                  src="/picture/20240322-145029.png"
                  alt="arrow"
                  className="ml-5 w-3/4 h-full"
                />
              </div>
              <div className="bg-white  col-span-4  p-1 ml-0 mt-5 relative">
                <div className="mt-5 text-[16px] font-bold right-0">
                  Lura Silverman
                </div>
                <div className="mt-5 text-[16px] right-0">ID: #123456</div>
              </div>
              <div className="   bg-white p-2  mt-4   relative">
                <div className="bottom-2 left-0 absolute ">
                  <img
                    src="/Port--input.svg"
                    alt="arrow"
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">3</div>
              </div>
              <div className="   bg-white p-2  mt-4   relative">
                <div className="bottom-2 left-0 absolute ">
                  <img
                    src="/Port--output.svg"
                    alt="arrow"
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">2</div>
              </div>
            </div>
          </div>
          <div className="w-2/3 bg-white p-6 shadow h-128 ml-4">
            <Heading className="mt-3 text-[20px] font-normal ">
              Latest Order
            </Heading>
            <ContainedList label="List title" kind="on-page">
              <ContainedListItem renderIcon={Add}>List item</ContainedListItem>
              <ContainedListItem renderIcon={Apple}>
                List item
              </ContainedListItem>
              <ContainedListItem renderIcon={Fish}>List item</ContainedListItem>
              <ContainedListItem renderIcon={Strawberry}>
                List item
              </ContainedListItem>
              <ContainedListItem renderIcon={Close}>
                List item
              </ContainedListItem>
              <ContainedListItem renderIcon={Wheat}>
                List item
              </ContainedListItem>
            </ContainedList>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
