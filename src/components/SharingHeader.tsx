import { useState } from 'react';
import { Line } from './Line';
import { UserIcon } from './UserIcon';

interface SharingHeaderProps {}

export const SharingHeader: React.FC<SharingHeaderProps> = ({}) => {
  const [usersConnected, setUsersConnected] = useState(true);

  return (
    <>
      {usersConnected ? (
        <>
          <div className="text-secondary-two font-rhd font-bold ml-2 mt-1">
            Click on a user, to share files with that user directly:
          </div>
          <div className="flex ml-2 my-2">
            <UserIcon name="A" />
            <UserIcon name="W" />
            <UserIcon name="Y" />
          </div>
        </>
      ) : (
        <div className="text-secondary-two font-rhd font-bold ml-2 mt-1">
          This room is empty. Share your room code or URL for others to join.
        </div>
      )}
      <Line />
    </>
  );
};
