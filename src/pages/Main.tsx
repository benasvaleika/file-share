import React from 'react';

import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Menus } from '../components/Menus';

interface MainProps {}

export const Main: React.FC<MainProps> = () => {
  return <div>Main Page</div>;
  // <div className="h-screen">
  //   <Header roomID="XXXX" />
  //   <Menus />
  //   <Footer />
  // </div>;
};
