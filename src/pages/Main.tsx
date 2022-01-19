import React from 'react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Menus } from '../components/Menus';

interface MainProps {}

export const Main: React.FC<MainProps> = () => {
  const roomUrl = window.location.pathname.slice(1);

  return (
    <div className="h-screen">
      <Header />
      <Menus />
      <Footer />
    </div>
  );
};
