import React, { useState } from 'react';
import { Heading, Button } from '@carbon/react';
import { OverflowMenuVertical } from '@carbon/icons-react';
import './warehouseCard.scss';

function StorageLocationCard({ storageLocation, handleDeleteRow }) {
  return (
    <div className="border border-solid border-[#E0E0E0] shadow-md">
      <div className="w-full flex justify-between items-start inline-flex p-2 pl-3 pr-3 bg-[#E0E0E0]">
        <Heading className="text-sm font-semibold">
          {storageLocation.name}
        </Heading>
        <Button
          kind="tertiary"
          size="xs"
          className="w-[25px]"
          onClick={() => handleDeleteRow(storageLocation.id)}
        >
          Delete
        </Button>
      </div>
      <div className="space-y-[-8px]">
        <div className="flex justify-between items-center p-2 pl-3 pr-3">
          <Heading className="text-sm text-[#525252]">Storage Location</Heading>
          <Heading className="text-sm ">
            {storageLocation?.name || 'N/A'}
          </Heading>
        </div>
        <div className="flex justify-between items-center p-2 pl-3 pr-3">
          <Heading className="text-sm text-[#525252]">Material</Heading>
          <Heading className="text-sm ">
            {storageLocation?.material_name || 'N/A'}
          </Heading>
        </div>
        <div className="flex justify-between items-center p-2 pl-3 pr-3">
          <Heading className="text-sm text-[#525252]">Quantity</Heading>
          <Heading className="text-sm ">
            {storageLocation?.quantity || 'N/A'}
          </Heading>
        </div>
      </div>
    </div>
  );
}

export default StorageLocationCard;
