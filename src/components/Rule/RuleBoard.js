'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Column, PaginationNav } from '@carbon/react';
import RuleCard from './RuleCard';
import { getRule } from '@/actions/actions';

function RuleBoard() {
  const pageSize = 6;
  const [rules, setRules] = useState([]);
  const [refresh, setRefresh] = useState({});
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getRule({ pageNum: page + 1, pageSize: pageSize }).then((res) => {
      if (res) {
        setRules(res?.list);
        setTotal(Math.ceil(res.total / pageSize));
      }
    });
  }, [refresh, page]);

  return (
    <div className="flex flex-col items-center ">
      <div className="w-full p-0 flex justify-between flex-wrap">
        {rules?.map((rule, index) => {
          return (
            <div
              className="pt-4 sm:w-[100%] md:w-[50%] lg:w-[25%]"
              style={index % 2 == 1 ? { paddingLeft: '15px' } : {}}
              key={index}
            >
              <RuleCard rule={rule} setRefresh={setRefresh} />
            </div>
          );
        })}
      </div>
      <PaginationNav
        className="mt-4"
        itemShown={pageSize}
        page={page}
        totalItems={total}
        onChange={(page, totalItems) => {
          setPage(page);
        }}
      ></PaginationNav>
    </div>
  );
}

export default RuleBoard;
