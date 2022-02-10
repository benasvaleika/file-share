import React from 'react';
import { FaRegFileAlt } from 'react-icons/fa';
import { FileType } from '../types/messageTypes';
import { Button } from './Button';

interface FileProps {
  file: FileType;
  outgoing: boolean;
}

export const File: React.FC<FileProps> = ({ file, outgoing }) => {
  return (
    <div className="text-secondary-two ml-2 flex justify-between mt-4">
      <div className="flex items-center">
        <FaRegFileAlt size={34} className="hover:text-base ease-in-out duration-200" />
        <div className="ml-2 font-rhd text-xl font-bold text-white">{file.name}</div>
      </div>
      <div className="flex items-center mr-6">
        {outgoing ? (
          <Button
            className="hover:bg-base"
            name="Cancel"
            onClick={() => console.log('Cancel file: ' + file.name)}
          />
        ) : (
          <>
            <Button
              className="mr-2 hover:bg-base"
              color="secondaryTwo"
              name="Accept"
              onClick={() => console.log('Accept file: ' + file.name)}
            />
            <Button
              className="hover:bg-base"
              name="Decline"
              onClick={() => console.log('Decline file: ' + file.name)}
            />
          </>
        )}
      </div>
    </div>
  );
};
