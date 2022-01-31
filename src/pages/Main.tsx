import React, { useEffect } from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Menus } from '../components/Menus';
import wsSendMessageHandler from '../services/websocket/wsSendMessageManager';
import useRoomIdStore from '../stores/useRoomIdStore';
import useWsConnectedStore from '../stores/useWsConnectedStore';
import { MessageEnum } from '../types/mesageEnum';
import { RoomIdMessageType } from '../types/messageTypes';

export const Main: React.FC = () => {
  const setRoomId = useRoomIdStore((state) => state.setRoomId);
  setRoomId(window.location.pathname.slice(1));
  const roomId = useRoomIdStore((state) => state.roomId);
  const wsConnected = useWsConnectedStore((state) => state.wsConnected);

  useEffect(() => {
    if (wsConnected === true) {
      wsSendMessageHandler({ type: MessageEnum.ROOMID, roomId: roomId } as RoomIdMessageType);
    }
  }, [roomId, wsConnected]);

  return (
    <div className="h-screen">
      <Header />
      <Menus />
      <Footer />
    </div>
  );
};
