import React from 'react';
import useCurrRoomUsersStore from '../stores/useCurrRoomUsersStore';
import useUserIdStore from '../stores/useUserIdStore';
import useUserLetterStore from '../stores/useUserLetter';
import { Line } from './Line';
import { UserIcon } from './UserIcon';

interface SharingHeaderProps {}

export const SharingHeader: React.FC<SharingHeaderProps> = () => {
  const userId = useUserIdStore((store) => store.userId);
  const userLetter = useUserLetterStore((store) => store.userLetter);
  const currRoomUsers = useCurrRoomUsersStore((state) => state.CurrRoomUsers).filter(
    (u) => u.id !== userId
  );

  console.log(currRoomUsers);
  return (
    <>
      {currRoomUsers.length > 0 ? (
        <>
          <div className="text-secondary-two text-xl font-rhd font-bold ml-2 mt-1">
            Click on a user, to share files with that user directly:
          </div>
          <div className="flex ml-2 my-2">
            {userId && userLetter && <UserIcon key={userId} userId={userId} name={userLetter} />}
            {currRoomUsers.map((usr) => {
              return <UserIcon key={usr.id} userId={usr.id} name={usr.userLetter} />;
            })}
          </div>
        </>
      ) : (
        <div className="text-secondary-two font-rhd text-xl font-bold ml-2 mt-1">
          This room is empty. Share your room code or URL for others to join.
        </div>
      )}
      <Line />
    </>
  );
};
