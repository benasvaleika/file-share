import { useState } from "react";
import { FaClock, FaRegCopy } from "react-icons/fa";
import { Button } from "./Button";
import { InputField } from "./InputField";

interface HeaderProps {
  roomID?: string;
}

export const Header: React.FC<HeaderProps> = ({ roomID }) => {
  const [roomIdVal, setRoomIdVal] = useState<string>("");

  const roomIdChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setRoomIdVal(e.target.value.toUpperCase());
  };

  const onJoinHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Join");
  };

  return (
    <div className="flex h-14 items-end justify-between">
      <div className="text-white font-rhd font-bold text-4xl ml-8">
        file-share
      </div>
      <div className="flex mr-10">
        <div className="flex mr-6 ">
          <div className="text-white font-rhd font-bold text-xl mr-2">
            Join Room:
          </div>
          <div className="flex">
            <InputField
              placeholder="room id"
              value={roomIdVal}
              onChange={(e) => roomIdChangeHandler(e)}
              size="small"
              color="primary"
              className="text-center pl-0"
            />
            <Button
              name="Join"
              size="small"
              color="secondaryOne"
              onClick={(e) => onJoinHandler(e)}
              className="ml-1"
            />
          </div>
        </div>
        <div className="text-white font-rhd font-bold flex text-xl">
          <div>Room Id: {roomID}</div>
          <FaRegCopy className="ml-1 cursor-pointer hover:text-secondary-one ease-in duration-150" />
        </div>
      </div>
    </div>
  );
};
