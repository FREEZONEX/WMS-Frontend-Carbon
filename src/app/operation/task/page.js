'use client';
import '@/components/Task/_task.scss';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  ProgressBar,
} from '@carbon/react';
import '@carbon/charts/styles.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import PortInputIcon from '@/utils/pic/Port--input.svg';
import PortOutputIcon from '@/utils/pic/Port--output.svg';
import Time from '@/utils/pic/Time.svg';
import { CaretRight, CaretLeft, Maximize } from '@carbon/icons-react';
import moment from 'moment';
import { DateTimeFormat } from '@/utils/constants';
import TaskTable from '@/components/Task/TaskTable';
import {
  getTask,
  getTaskDoneCount,
  getTaskPendingCount,
  getUtilization,
} from '@/actions/actions';

const lineStyle = {
  width: '260px',
  height: '0px',
  borderTop: '2px solid #333',
  marginTop: '150px',
  transform: 'rotate(45deg)',
};

const putawayHeaderData = [
  {
    header: 'Creation Time',
    key: 'create_time',
    width: '120px',
  },
  {
    header: 'Material',
    key: 'materials',
  },
  {
    header: 'InboundId',
    key: 'operation_id',
  },
  {
    header: 'Worker',
    key: 'people_name',
  },
  {
    header: 'Resource',
    key: 'resources',
  },
];
const pickupHeaderData = [
  {
    header: 'Creation Time',
    key: 'create_time',
  },
  {
    header: 'Material',
    key: 'materials',
  },
  {
    header: 'OutboundId',
    key: 'operation_id',
  },
  {
    header: 'Worker',
    key: 'people_name',
  },
  {
    header: 'Resource',
    key: 'resources',
  },
];

export default function Task() {
  const router = useRouter();
  const [putawayDatas, setPutawayDatas] = useState([]);
  const [pickupDatas, setPickupDatas] = useState([]);
  const [taskCount, setTaskCount] = useState({
    putawayPending: 0,
    putawayDone: 0,
    pickupPending: 0,
    pickupDone: 0,
  });

  const [statistics, setStatistics] = useState({});
  const [pageIndexOfOccupy, setPageIndexOfOccupy] = useState(0);
  const [pageIndexOfIdle, setPageIndexOfIdle] = useState(0);
  const pageSize = 4;

  const [occupys, setOccupys] = useState([]);
  const [idles, setIdles] = useState([]);
  const [totalPage, setTotalPage] = useState({ occupy: 0, idle: 0 });

  useEffect(() => {
    initData();
  }, []);

  useEffect(() => {
    const filter = statistics.idle?.slice(
      pageIndexOfIdle * pageSize,
      pageSize + pageSize * pageIndexOfIdle
    );
    setIdles(filter);
  }, [statistics, pageIndexOfIdle]);

  const initData = () => {
    getTask({ pageNum: 1, pageSize: 6 }, { type: 'putaway' }).then((res) => {
      if (res) {
        setPutawayDatas(res.list);
      }
    });
    getTask({ pageNum: 1, pageSize: 6 }, { type: 'pickup' }).then((res) => {
      if (res) {
        setPickupDatas(res.list);
      }
    });

    getTaskPendingCount().then((res) => {
      if (res) {
        setTaskCount((prevDatas) => ({
          ...prevDatas,
          putawayPending: res.putaway,
          pickupPending: res.pickup,
        }));
      }
    });
    getTaskDoneCount().then((res) => {
      if (res) {
        setTaskCount((prevDatas) => ({
          ...prevDatas,
          putawayDone: res.putaway,
          pickupDone: res.pickup,
        }));
      }
    });
    getTask({ pageNum: 1, pageSize: 6 }, { type: 'pickup' }).then((res) => {
      if (res) {
        setPickupDatas(res.list);
      }
    });
    getUtilization().then((res) => {
      if (res) {
        setStatistics(res);
        setOccupys(res.occupy?.slice(0, pageSize));
        setIdles(res.idle?.slice(0, pageSize));
        setTotalPage({
          occupy: Math.ceil(res?.occupy.length / pageSize) - 1,
          idle: Math.ceil(res?.idle.length / pageSize) - 1,
        });
      }
    });
  };

  const handlePrevPageOfIdle = () => {
    if (pageIndexOfIdle > 0) {
      setPageIndexOfIdle(pageIndexOfIdle - 1);
    }
  };
  const handleAfterPageOfIdle = () => {
    if (pageIndexOfIdle < totalPage.idle) {
      setPageIndexOfIdle(pageIndexOfIdle + 1);
    }
    console.log(pageIndexOfIdle);
  };
  const handlePrevPageOfOccupy = () => {
    if (pageIndexOfOccupy > 0) {
      setPageIndexOfIdle(pageIndexOfOccupy - 1);
    }
  };
  const handleAfterPageOfOccupy = () => {
    if (pageIndexOfOccupy < totalPage.occupy) {
      setPageIndexOfIdle(pageIndexOfOccupy + 1);
    }
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
            router.push(`${process.env.PATH_PREFIX}/operation/task`);
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
                <div className="absolute left-[127px] top-[60px] text-[#4A85F6]">
                  <p className="text-[60px] font-[300]">
                    {taskCount.putawayPending}
                  </p>
                  <p className="relative top-[-10px]  font-[600]">
                    task pending
                  </p>
                </div>
                <div className="absolute bottom-[60px] left-6">
                  <p className="text-[60px] font-[300]">
                    {taskCount.putawayDone}
                  </p>
                  <p className="relative top-[-10px]  font-[600]">
                    has been done
                  </p>
                </div>
                <div className=" absolute bottom-6 w-[100%] pl-3 pr-3">
                  <hr
                    className="border-[#333] border-solid"
                    style={{ borderWidth: '1.5px' }}
                  ></hr>
                </div>
              </div>
              <div className="p-4 flex-auto min-w-[300px]">
                <Heading className="mr-2  font-bold flex flex-row justify-between">
                  <div> List Of Putaway Tasks</div>
                  <div>
                    <Maximize
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(
                          `${process.env.PATH_PREFIX}/operation/task/putaway`
                        );
                      }}
                    />
                  </div>
                </Heading>
                <div className="pt-4">
                  <TaskTable
                    rows={putawayDatas}
                    headers={putawayHeaderData}
                  ></TaskTable>
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
                <div className="absolute left-[127px] top-[60px] text-[#4A85F6]">
                  <p className="text-[60px] font-[300]">
                    {taskCount.pickupPending}
                  </p>
                  <p className="relative top-[-20px]  font-[600]">
                    task pending
                  </p>
                </div>
                <div className="absolute bottom-[60px] left-6">
                  <p className="text-[60px] font-[300]">
                    {taskCount.pickupDone}
                  </p>
                  <p className="relative top-[-10px]  font-[600]">
                    has been done
                  </p>
                </div>
                <div className=" absolute bottom-6 w-[100%] pl-3 pr-3">
                  <hr
                    className="border-[#333] border-solid"
                    style={{ borderWidth: '1.5px' }}
                  ></hr>
                </div>
              </div>
              <div className="p-4 flex-auto  min-w-[300px]">
                <Heading className="mr-2  font-bold flex flex-row justify-between">
                  <div> List Of Picking Tasks</div>
                  <div>
                    <Maximize
                      className="cursor-pointer"
                      onClick={() => {
                        router.push(
                          `${process.env.PATH_PREFIX}/operation/task/picking`
                        );
                      }}
                    />
                  </div>
                </Heading>
                <div className="pt-4">
                  <TaskTable
                    rows={pickupDatas}
                    headers={pickupHeaderData}
                  ></TaskTable>
                </div>
              </div>
            </div>
          </div>
          <div className="w-1/5 flex flex-col gap-4">
            <div className="h-[160px]  p-4  pl-6  pr-6 shadow  bg-white">
              <Heading className="font-bold ">Average Time To Process</Heading>
              <div className="mt-6 flex items-center text-[30px]">
                <div>{statistics?.averageTime}</div>
                <Image
                  className="ml-6"
                  src={Time}
                  alt="arrow"
                  width={35}
                  height={35}
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
                      <CaretLeft
                        onClick={handlePrevPageOfOccupy}
                        className={
                          pageIndexOfOccupy == 0 ? 'text-gray-400' : ''
                        }
                      />
                      <CaretRight
                        onClick={handleAfterPageOfOccupy}
                        className={
                          pageIndexOfOccupy >= totalPage.occupy
                            ? 'text-gray-400'
                            : ''
                        }
                      />
                    </div>
                  </div>
                </Heading>
                <div className="h-[230px]">
                  {occupys?.slice(0, 4).map((item, index) => {
                    return (
                      <ProgressBar
                        className="mt-4"
                        size="small"
                        key={index}
                        label={item.name}
                        helperText={item?.occupyTotalTime}
                        value={
                          item.occupyMaxRate != 0
                            ? item?.occupyRate / item.occupyMaxRate
                            : 0
                        }
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className=" bg-white p-4  pl-6  pr-6 shadow flex-auto">
              <Heading className="font-bold ">
                <div className="flex flex-row justify-between">
                  <div>Time Of Resource Idle</div>
                  <div className="flex">
                    <CaretLeft
                      onClick={handlePrevPageOfIdle}
                      className={pageIndexOfIdle == 0 ? 'text-gray-400' : ''}
                    />
                    <CaretRight
                      onClick={handleAfterPageOfIdle}
                      className={
                        pageIndexOfIdle >= totalPage.idle ? 'text-gray-400' : ''
                      }
                    />
                  </div>
                </div>
              </Heading>
              <div className="bg-white mt-4 text-[14px]">
                {idles?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row justify-between mb-2"
                    >
                      <div className="italic font-[400]">{item.name}</div>
                      <div>{item.idleTotalTime}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
