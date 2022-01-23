import React from 'react';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Menus } from '../components/Menus';
import useRoomIdStore from '../stores/useRoomIdStore';

export const Main: React.FC = () => {
  const setRoomId = useRoomIdStore((state) => state.setRoomId);

  setRoomId(window.location.pathname.slice(1));

  return (
    <div className="h-screen">
      <Header />
      <Menus />
      <Footer />
    </div>
  );
};
