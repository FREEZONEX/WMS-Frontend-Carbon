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
    <div className="flex flex-col items-center">
      <Grid className="w-full p-4 bg-white">
        {rules?.map((rule, index) => {
          return (
            <Column className="m-6" key={index} xm={2} md={4} lg={8}>
              <RuleCard rule={rule} setRefresh={setRefresh} />
            </Column>
          );
        })}
      </Grid>
      <PaginationNav
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
