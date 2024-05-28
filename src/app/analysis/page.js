'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { Heading, Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { SimpleBarChart, GaugeChart, MeterChart } from '@carbon/charts-react';
import '@carbon/charts/styles.css';
import { ContainedList, ContainedListItem } from '@carbon/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PortInputIcon from '@/utils/pic/Port--input.svg';
import PortOutputIcon from '@/utils/pic/Port--output.svg';
import Time from '@/utils/pic/Time.svg';
import Money from '@/utils/pic/Money.svg';
import picture141125 from '@/utils/pic/picture/Rectangle 2370-1.svg';
import picture141213 from '@/utils/pic/picture/Rectangle 2370.svg';
import picture141217 from '@/utils/pic/picture/Rectangle 2371.svg';
import picture141220 from '@/utils/pic/picture/Rectangle 2372.svg';
import picture141223 from '@/utils/pic/picture/Rectangle 2373.svg';
import picture141226 from '@/utils/pic/picture/Rectangle 6477.svg';
import picture145020 from '@/utils/pic/picture/Thomas.svg';
import picture145025 from '@/utils/pic/picture/Thomas-1.svg';
import picture145029 from '@/utils/pic/picture/Thomas-2.svg';
// import './analysis.module.css';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {
  Add,
  Apple,
  Fish,
  Strawberry,
  Close,
  Wheat,
} from '@carbon/icons-react';

import {
  fetchTodayInbound,
  fetchTodayInboundDone,
  fetchTodayOutbound,
  fetchTodayOutboundDone,
} from '@/actions/actions';

const MyLineChart1 = () => {
  const [data, setData] = useState([]);
  const [csvOnlyData, setCsvOnlyData] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState('Aluminum Foil');
  const [warehouseNames, setWarehouseNames] = useState([]);

  useEffect(() => {
    // Load and parse the CSV data
    fetch('/prediction.csv')
      .then(response => response.text())
      .then(csvData => {
        const allData = Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true
        }).data;

        const warehouseOptions = Array.from(new Set(allData.map(item => item.warehouse_name))).sort();
        setWarehouseNames(warehouseOptions);

        const filteredCsvData = allData.filter(d => d.warehouse_name === selectedWarehouse);

        let enhancedCsvData = filteredCsvData.map(d => ({
          ...d,
          storage: new Date(d.date) <= new Date('7/28/2024') ? d.storage : null
        }));
        enhancedCsvData.push({ date: '7/29/2024', storage: null, warehouse_name: selectedWarehouse });
        enhancedCsvData.push({ date: '7/30/2024', storage: null, warehouse_name: selectedWarehouse });
        setCsvOnlyData(enhancedCsvData); // Store enhanced CSV-only data for the selected warehouse

        // Fetch additional data from the API, and assume it includes similar warehouse data filtering
        fetch('http://localhost:5000/get_predictions')
          .then(response => response.json())
          .then(apiData => {
            const apiDetails = apiData.test[selectedWarehouse];
            const additionalData = apiDetails ? [{
              date: '7/29/2024',
              storage: apiDetails.currentdata[0], // Assuming currentdata array matches dates
              warehouse_name: selectedWarehouse
            }, {
              date: '7/30/2024',
              storage: apiDetails.prediction[0], // Assuming prediction array matches dates
              warehouse_name: selectedWarehouse
            }] : [];

            setData([...filteredCsvData, ...additionalData]); // Combine CSV data and API data for the primary line
          })
          .catch(error => {
            console.error("Failed to fetch API data:", error);
            setData(filteredCsvData); // Use only CSV data if API call fails
          });
      })
      .catch(error => {
        console.error("Error loading or parsing CSV:", error);
      });
  }, [selectedWarehouse]);

  const handleWarehouseChange = (event) => {
    setSelectedWarehouse(event.target.value);
  };

  return (
    <div className="w-full">
    
      <div className="flex items-center justify-center mb-2">
        <Heading className="mt-3 text-xl font-normal mb-2">Real-time Predictions</Heading>
      </div>  
      
      <div className="flex items-center justify-center mb-2">
        <select onChange={handleWarehouseChange} value={selectedWarehouse}>
          {warehouseNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" xAxisId="allData" />
            <XAxis hide={true} dataKey="date" xAxisId="csvData" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line xAxisId="allData" data={data} type="monotone" dataKey="storage" stroke="#82ca9d" dot={null} activeDot={{ r: 8 }} strokeDasharray="5 5" name="Prediction"/>
            <Line xAxisId="csvData" data={csvOnlyData} type="monotone" dataKey="storage" stroke="#8884d8" dot={null} activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
   
  );
};


const MyLineChart = ({ csvFile }) => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLSTM, setShowLSTM] = useState(true);
  const [showMamba, setShowMamba] = useState(true);

  useEffect(() => {
      Papa.parse(csvFile, {
          download: true,
          header: true,
          complete: (results) => {
              const parsedData = results.data.map(item => ({
                  ...item,
                  date: item.date,  // Ensure date is parsed if necessary
                  storage: Number(item.storage),
                  next_day_storage: Number(item.next_day_storage || 0),
                  lstm: Number(item.lstm || 0),
                  mamba: Number(item.mamba || 0)
              }));
              setData(parsedData);
          }
      });
  }, [csvFile]);

  useEffect(() => {
      const interval = setInterval(() => {
          setCurrentIndex(prevIndex => {
              return (prevIndex < data.length - 1) ? prevIndex + 1 : prevIndex;
          });
      }, 3000); // Update every 3 seconds

      return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [data]);

  const startSliceIndex = Math.max(0, currentIndex - 59);
  const currentData = data.slice(startSliceIndex, currentIndex + 1);
  const predictionData = currentIndex < data.length - 1 ? data.slice(startSliceIndex, currentIndex + 2) : [];

  return (
      <div className="w-full">
        <div className="flex  items-center justify-center mb-2">
               <Heading className="mt-3 text-xl font-normal  mb-2">
                Storage Predictions
              </Heading>
              </div>
          <ResponsiveContainer width="100%" height={300}>
              <LineChart data={currentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                      type="monotone" 
                      dataKey="storage" 
                      stroke="#8884d8" 
                      strokeWidth={2} 
                      dot={false} 
                      isAnimationActive={false}
                  />
                  {currentIndex > 0 && currentIndex < data.length - 1 && (
                      <Line 
                          type="monotone" 
                          dataKey="next_day_storage" 
                          stroke="#82ca9d" 
                          strokeWidth={2} 
                          strokeDasharray="5 5" 
                          dot={false} 
                          isAnimationActive={false}
                          data={predictionData}
                      />
                  )}
                  {showLSTM && (
                      <Line 
                          type="monotone" 
                          dataKey="lstm" 
                          stroke="#ff7300" 
                          strokeWidth={2} 
                          strokeDasharray="5 5" 
                          dot={false} 
                          isAnimationActive={false}
                          key="lstmLine"
                      />
                  )}
                  {showMamba && (
                      <Line 
                          type="monotone" 
                          dataKey="mamba" 
                          stroke="#387908" 
                          strokeWidth={2} 
                          strokeDasharray="5 5" 
                          dot={false} 
                          isAnimationActive={false}
                          key="mambaLine"
                      />
                  )}
              </LineChart>
          </ResponsiveContainer>
          <div style={{ marginTop: '10px' }}>
              <label>
                  <input
                      type="checkbox"
                      checked={showLSTM}
                      onChange={(e) => setShowLSTM(e.target.checked)}
                  /> Show LSTM Prediction
              </label>
              <label style={{ marginLeft: '20px' }}>
                  <input
                      type="checkbox"
                      checked={showMamba}
                      onChange={(e) => setShowMamba(e.target.checked)}
                  /> Show Mamba Prediction
              </label>
          </div>
      </div>
  );
};


function Page() {
  // const [todayInboundCount, setTodayInboundCount] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetchTodayInbound();
  //     setTodayInboundCount(result.count || result);
  //   };

  //   fetchData().catch(console.error);
  // }, []);

  // const [todayInboundDoneCount, setTodayInboundDoneCount] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetchTodayInboundDone();
  //     setTodayInboundDoneCount(result.count || result);
  //   };

  //   fetchData().catch(console.error);
  // }, []);

  // const [todayOutboundCount, setTodayOutboundCount] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetchTodayOutbound();
  //     setTodayOutboundCount(result.count || result);
  //   };

  //   fetchData().catch(console.error);
  // }, []);

  // const [todayOutboundDoneCount, setTodayOutboundDoneCount] = useState(0);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await fetchTodayOutboundDone();
  //     setTodayOutboundDoneCount(result.count || result);
  //   };

  //   fetchData().catch(console.error);
  // }, []);

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
        <BreadcrumbItem className="cursor-pointer">
          <a
            onClick={() => {
              router.push(`${process.env.PATH_PREFIX}/home`);
            }}
          >
            Home
          </a>
        </BreadcrumbItem>
        <BreadcrumbItem
          className="cursor-pointer"
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
              <Heading className="mt-2 text-xl font-normal">Inbound</Heading>
              <div className="absolute bottom-5 left-0 mb-4 ml-6">
                <div className="flex items-baseline  text-3xl">
                  <Heading className="text-5xl font-semibold fontIBM">
                    27
                  </Heading>
                  /<Heading className="text-3xl ml-2 fontIBM">80</Heading>
                </div>
              </div>
              <div className="absolute bottom-5 right-0 mb-4 mr-6">
                <Image src={PortInputIcon} alt="arrow" width={32} height={32} />
              </div>
            </div>
            <div className="bg-white p-6 shadow-md max-w-lg  relative">
              <Heading className="mt-3 text-xl font-normal ">
                Outbound Number
              </Heading>
              <div className="absolute bottom-5 left-0 mb-4 ml-6">
                <div className="flex items-baseline text-3xl">
                  <Heading className="text-5xl font-semibold ">27</Heading>/
                  <Heading className="text-3xl ml-2 ">80</Heading>
                </div>
              </div>
              <div className="absolute bottom-5 right-0 mb-4 mr-6">
                <Image
                  src={PortOutputIcon}
                  alt="arrow"
                  width={32}
                  height={32}
                />
              </div>
            </div>
            <div className="bg-white p-6 shadow-md max-w-lg  relative">
              <Heading className="mt-3 text-xl font-normal ">
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
                <Image src={Time} alt="arrow" width={32} height={32} />
              </div>
            </div>

            <div className="shadow-md bg-white p-6 shadow lg:col-span-2 lg:row-span-2">
              <Heading className="mt-2 text-xl font-normal absolute">
                Turnover Rate Top5
              </Heading>
              <SimpleBarChart
                className="absolute top-0"
                data={data}
                options={options}
              />
            </div>

            <div className="bg-white p-6 shadow-md max-w-lg  relative">
              <Heading className="mt-3 text-xl font-normal ">
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
              <Heading className="mt-3 text-xl font-normal ">
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
              <Heading className="mt-3 text-xl font-normal ">Value</Heading>
              <div className="absolute bottom-5 left-0 mb-4 ml-6">
                <div className="flex items-baseline">
                  <Heading className="text-5xl font-semibold fontIBM">
                    6000$
                  </Heading>
                </div>
              </div>
              <div className="absolute bottom-5 right-0 mb-4 mr-6">
                <Image src={Money} alt="arrow" width={32} height={32} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 shadow h-128 flex w-full mt-5">
               <MyLineChart1 csvFile="prediction.csv" />
          </div>  

        <div className="bg-white p-6 shadow h-128 flex w-full mt-5">
               <MyLineChart csvFile="train_data1.csv" />
          </div>  

        <div className="flex py-8 w-full h-1/2-screen">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            <div className="bg-white p-6 shadow lg:col-span-2 h-full">
              <Heading className="mt-3 text-[20px] font-normal ">
                Recently Supplier
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2 w-full h-1/16">
                <div className="bg-white  p-1  mt-5 relative">
                  <Image
                    src={picture141125}
                    alt="arrow"
                    width={50}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <div className=" col-span-7 bg-white p-3  mt-2  relative">
                  <MeterChart data={data4} options={options4}></MeterChart>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2  w-full h-1/16">
                <div className="bg-white p-1  mt-5  relative">
                  <Image
                    src={picture141213}
                    alt="arrow"
                    width={50}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <div className="col-span-7 bg-white p-3 mt-2  relative">
                  <MeterChart data={data5} options={options5}></MeterChart>
                </div>
              </div>
    
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2  w-full h-1/16">
                <div className="bg-white p-1 mt-5 relative">
                  <Image
                    src={picture141217}
                    alt="arrow"
                    width={50}
                    height={32}
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
                  <Image
                    src={picture141220}
                    alt="arrow"
                    width={50}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <div className=" col-span-7 bg-white p-3  mt-2  relative">
                  <MeterChart data={data4} options={options4}></MeterChart>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2  w-full h-1/16">
                <div className="bg-white p-1 mt-5 relative">
                  <Image
                    src={picture141223}
                    alt="arrow"
                    width={50}
                    height={32}
                    className="w-full h-full"
                  />
                </div>
                <div className="col-span-7 bg-white p-3 mt-2   relative">
                  <MeterChart data={data5} options={options5}></MeterChart>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-2  w-full h-1/16">
                <div className="bg-white p-1 mt-5 relative">
                  <Image
                    src={picture141226}
                    alt="arrow"
                    width={50}
                    height={32}
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
                <Image
                  src={picture145020}
                  alt="arrow"
                  width={500}
                  height={500}
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
                  <Image
                    src={PortInputIcon}
                    alt="arrow"
                    width={500}
                    height={500}
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">3</div>
              </div>
              <div className="   bg-white p-2  mt-4   relative">
                <div className="bottom-2 left-0 absolute ">
                  <Image
                    src={PortOutputIcon}
                    alt="arrow"
                    width={500}
                    height={500}
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">2</div>
              </div>
            </div>
            <div className="shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-1 w-full">
              <div className="bg-white  col-span-2  p-3 justify-center mt-4 relative">
                <Image
                  src={picture145025}
                  alt="arrow"
                  width={500}
                  height={500}
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
                  <Image
                    src={PortInputIcon}
                    alt="arrow"
                    width={500}
                    height={500}
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">3</div>
              </div>
              <div className="   bg-white p-2  mt-4   relative">
                <div className="bottom-2 left-0 absolute ">
                  <Image
                    src={PortOutputIcon}
                    alt="arrow"
                    width={500}
                    height={500}
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">2</div>
              </div>
            </div>
            <div className="shadow-md grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-1 w-full">
              <div className="bg-white  col-span-2  p-3 justify-center mt-4 relative">
                <Image
                  src={picture145029}
                  alt="arrow"
                  width={500}
                  height={500}
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
                  <Image
                    src={PortInputIcon}
                    alt="arrow"
                    width={500}
                    height={500}
                    className="w-3/4 h-3/4"
                  />
                </div>
                <div className="bottom-4 left-7 absolute ">3</div>
              </div>
              <div className="   bg-white p-2  mt-4   relative">
                <div className="bottom-2 left-0 absolute ">
                  <Image
                    src={PortOutputIcon}
                    alt="arrow"
                    width={500}
                    height={500}
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
