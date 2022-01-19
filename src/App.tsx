import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webSocket from './config/socketConfig';
import { HowToUse } from './pages/HowToUse';
import { Main } from './pages/Main';

function App() {
  const ws = webSocket;

  useEffect(() => {
    ws.addEventListener('open', () => {
      console.log('New Connection');
    });

    return () => {
      ws.close();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/:roomId" element={<Main />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
