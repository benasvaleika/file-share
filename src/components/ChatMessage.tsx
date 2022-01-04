import React from 'react';
import { Line } from './Line';
import { FaRegCopy } from 'react-icons/fa';

interface ChatMessageProps {
  date: string;
  msgContent: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ date: time, msgContent }) => {
  return (
    <div className="flex flex-col mt-2 ml-2 font-rhd font-bold text-white">
      <div className="flex justify-between">
        <div>{time}</div>
        <FaRegCopy className="text-secondary-two hover:text-white ease-in-out duration-200 cursor-pointer mr-2 " />
      </div>
      <Line className="ml-0 mt-0 w-full" />
      <div className="font-normal">{msgContent}</div>
    </div>
  );
};
