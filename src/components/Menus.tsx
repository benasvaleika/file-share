import React from 'react';
import { ChatMenu } from './ChatMenu';
import { SharingMenu } from './SharingMenu';

interface MenusProps {}

export const Menus: React.FC<MenusProps> = () => {
  return (
    <div className="flex mt-7 h-[83%]">
      <SharingMenu />
      <ChatMenu />
    </div>
  );
};
