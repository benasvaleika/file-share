import React from 'react';
import { useState } from 'react';
import { FaRegCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { InputField } from './InputField';

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const [roomIdInputVal, setRoomIdInputVal] = useState<string>('');

  const roomID = window.location.pathname.slice(1);
  const navigate = useNavigate();

  const roomIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRoomIdInputVal(e.target.value);
  };

  const onJoinHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    navigate(`/${roomIdInputVal.replace(/[^a-zA-Z0-9]/gi, '')}`);
  };

  return (
    <div className="flex h-16 items-end justify-between">
      <div className="text-white font-rhd font-bold text-5xl ml-8">file-share</div>
      <div className="flex mr-10">
        <div className="flex mr-6 ">
          <div className="text-white font-rhd font-bold text-2xl mr-2">Join Room:</div>
          <div className="flex">
            <InputField
              placeholder="room id"
              value={roomIdInputVal}
              onChange={(e) => roomIdChangeHandler(e)}
              size="medium"
              color="primary"
              className="text-center pl-0"
            />
            <Button
              name="Join"
              size="medium"
              color="secondaryOne"
              onClick={(e) => onJoinHandler(e)}
              className="ml-1"
            />
          </div>
        </div>
        <div className="text-white font-rhd font-bold flex text-2xl">
          <div>Room Id: {roomID}</div>
          <FaRegCopy className="ml-1 cursor-pointer hover:text-secondary-one ease-in duration-150" />
        </div>
      </div>
    </div>
  );
};
