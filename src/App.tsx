import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { HowToUse } from './pages/HowToUse';
import { Main } from './pages/Main';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
