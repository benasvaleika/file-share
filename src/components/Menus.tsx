import React from 'react';
import { ChatMenu } from './ChatMenu';
import { SharingMenu } from './SharingMenu';

interface MenusProps {}

export const Menus: React.FC<MenusProps> = () => {
  return (
    <div className="flex mt-10 h-4/5 border-green-400 border-solid ">
      <SharingMenu />
      <ChatMenu />
    </div>
  );
};
