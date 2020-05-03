import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Games from './components/Games/Games';

function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Games />
    </div>
  );
}

export default App;
