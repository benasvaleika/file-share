import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useRoomIdStore from '../stores/useRoomIdStore';
import useRoomIdSuggestedStore from '../stores/useRoomIdSuggestedStore';
import useUserIdStore from '../stores/useUserIdStore';
import useWsConnectedStore from '../stores/useWsConnectedStore';
import { generateNewRoomId } from '../utils/generalUtils';

export const Initial: React.FC = () => {
  const roomId = useRoomIdStore((store) => store.roomId);
  const wsConnected = useWsConnectedStore((store) => store.wsConnected);
  const userId = useUserIdStore((store) => store.userId);
  const RoomIdSuggested = useRoomIdSuggestedStore((store) => store.roomIdSuggested);

  const navigate = useNavigate();

  useEffect(() => {
    const currentNetworkName = roomId || RoomIdSuggested || generateNewRoomId(4);
    if (wsConnected && userId) {
      navigate('/' + currentNetworkName);
    }
  }, [wsConnected, roomId, navigate, userId, RoomIdSuggested]);

  return (
    <div className="text-secondary-two text-3xl font-bold font-rhd text-center mt-16">
      Loading...
    </div>
  );
};
