'use client';
import React, { useEffect, useState } from 'react';
import { Grid, Column, PaginationNav } from '@carbon/react';
import RuleCard from './RuleCard';
import { getRule } from '@/actions/actions';

function RuleBoard() {
  const [rules, setRules] = useState([]);
  const [refresh, setRefresh] = useState({});

  useEffect(() => {
    getRule({ pageNum: 1, pageSize: 99999999 }).then((res) => {
      setRules(res.list);
    });
  }, [refresh]);

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(rules.length / 6);

  return (
    <div className="flex flex-col items-center">
      <Grid className="w-full p-4 bg-white">
        {rules.slice(page * 6, page * 6 + 6).map((rule, index) => {
          return (
            <Column className="m-6" key={index} xm={2} md={4} lg={8}>
              <RuleCard rule={rule} setRefresh={setRefresh} />
            </Column>
          );
        })}
      </Grid>
      <PaginationNav
        itemShown={6}
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
