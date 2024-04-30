'use client';
import React, { useState } from 'react';
import { Grid, Column, PaginationNav } from '@carbon/react';
import RuleCard from './RuleCard';

function RuleBoard() {
  const rules = [
    {
      name: 'Rule Name 1',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 2',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 3',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 4',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 5',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 6',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 7',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 8',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 9',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 10',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 11',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
    {
      name: 'Rule Name 12',
      conditions: 'The materials include 1 tonne of cement.',
      action: 'Assign 1 forklift and 2 pallets to this task.',
    },
  ];

  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(rules.length / 6);

  return (
    <div className="flex flex-col items-center">
      <Grid className="w-full p-4 bg-white">
        {rules.slice(page * 6, page * 6 + 6).map((rule, index) => {
          return (
            <Column className="m-6" key={index} xm={2} md={4} lg={8}>
              <RuleCard rule={rule} />
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
