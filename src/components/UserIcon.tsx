import React from 'react';

interface UserIconProps {
  isCurrUser: boolean;
  userId: string;
  name: string;
  fileUploadHandler?: (e: React.ChangeEvent<HTMLInputElement>, userId: string) => void;
}

export const UserIcon: React.FC<UserIconProps> = ({
  isCurrUser,
  name,
  userId,
  fileUploadHandler,
}) => {
  return (
    <>
      {isCurrUser ? (
        <div
          className={`flex w-14 h-14 bg-secondary-two text-4xl mr-3 mb-1 
      justify-center items-center rounded-full text-primary 
      font-rhd font-bold cursor-pointer hover:bg-base hover:text-secondary-two
      ease-in-out duration-200`}
          onClick={() => console.log(userId)}
        >
          {name}
        </div>
      ) : (
        <label>
          <div
            className={`flex w-14 h-14 bg-secondary-two text-4xl mr-3 mb-1 
      justify-center items-center rounded-full text-primary 
      font-rhd font-bold cursor-pointer hover:bg-base hover:text-secondary-two
      ease-in-out duration-200`}
          >
            {fileUploadHandler && (
              <input type="file" hidden multiple onChange={(e) => fileUploadHandler(e, userId)} />
            )}
            {name}
          </div>
        </label>
      )}
    </>
  );
};
