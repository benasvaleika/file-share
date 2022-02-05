import React from 'react';

interface UserIconProps {
  userId: string;
  name: string;
}

export const UserIcon: React.FC<UserIconProps> = ({ name, userId }) => {
  return (
    <div
      className={`flex w-14 h-14 bg-secondary-two text-4xl mr-3 mb-1 
      justify-center items-center rounded-full text-primary 
      font-rhd font-bold cursor-pointer hover:bg-base hover:text-secondary-two
      ease-in-out duration-200`}
      onClick={() => console.log(userId)}
    >
      {name}
    </div>
  );
};
