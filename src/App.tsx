import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webSocket from './config/socketConfig';
import { HowToUse } from './pages/HowToUse';
import { Initial } from './pages/Initial';
import { Main } from './pages/Main';
import { wsOpenHandler, wsCloseHandler } from './services/websocket/wsConnectionHandler';
import { wsMessageManager } from './services/websocket/wsMessageManager';

function App() {
  const ws = webSocket;

  useEffect(() => {
    ws.addEventListener('open', () => {
      console.log('New Connection');
      wsOpenHandler(ws);
    });

    ws.addEventListener('close', (event) => {
      wsCloseHandler(ws);
    });

    ws.addEventListener('message', (event) => {
      wsMessageManager(event);
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
        <Route path="/" element={<Initial />} />
      </Routes>
    </Router>
  );
}

export default App;
