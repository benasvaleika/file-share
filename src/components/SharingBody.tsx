import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { File } from './File';

interface SharingBodyProps {}

export const SharingBody: React.FC<SharingBodyProps> = () => {
  const fileToggle = false;

  return (
    <>
      {fileToggle ? (
        <div>
          <File fileName="New Shared File.file" />
          <File fileName="Another Shared File.file" />
          <File fileName="This is a file.file" />
          <File fileName="Another Shared File.file" />
        </div>
      ) : (
        <div className=" w-[calc(100%-1rem)] ml-2 h-[calc(100%-7rem)] ">
          <div className="flex h-full justify-center items-center flex-col">
            <FaPlus
              size={100}
              className="text-secondary-one hover:text-secondary-two ease-in-out duration-200"
            />
            <div className="text-secondary-two font-rhd font-bold text-lg -mb-1">Add new files</div>
            <div className="text-secondary-two font-rhd font-bold">
              (Or press on a user icon directly to share files)
            </div>
          </div>
        </div>
      )}
    </>
  );
};
