import React from 'react';

interface UserIconProps {
  name: string;
}

export const UserIcon: React.FC<UserIconProps> = ({ name }) => {
  return (
    <div
      className={`flex w-12 h-12 bg-secondary-two text-2xl mr-3 
      justify-center items-center rounded-full text-primary 
      font-rhd font-bold cursor-pointer hover:bg-base hover:text-secondary-two
      ease-in-out duration-200`}
      onClick={() => console.log(name)}
    >
      {name}
    </div>
  );
};
