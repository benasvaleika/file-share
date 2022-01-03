import React from 'react';
import { MenuWindow } from './MenuWindow';
import { SharingBody } from './SharingBody';
import { SharingHeader } from './SharingHeader';

interface SharingMenuProps {}

export const SharingMenu: React.FC<SharingMenuProps> = () => {
  return (
    <MenuWindow menuTitle="Current Room:" menuClassName="w-3/4" ml="ml-8" mr="mr-4">
      <div className="h-full">
        <SharingHeader />
        <SharingBody />
      </div>
    </MenuWindow>
  );
};
