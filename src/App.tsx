import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Navigation from './components/Navigation';
import Layout from './components/Layout';
import { Card } from 'primereact/card';


function App() {
  return (
    <div className="App">
      <Navigation />
      <Layout />
    </div>

  );
}

export default App;
