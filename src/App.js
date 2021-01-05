import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from './components/Header';
import HomePage from './pages/Home';
import SoftwareDevPage from './pages/SoftwareDev';
import EquestrianPage from './pages/Equestrian';

export default function App() {
  return (
    <Router history={{location: '', listen: ()=>{}}}>
      <div className="lubtha">
        <Header />

        <Route path="/" exact><HomePage /></Route>
        <Route path="/software-development"><SoftwareDevPage /></Route>
        <Route path="/equestrian"><EquestrianPage /></Route>
        <Route path="/about" />
      </div>
    </Router>
  );
}
