import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import HeaderComponent from './components/Header';
import HomePage from './pages/Home';
import SoftwareDevPage from './pages/SoftwareDev';
import EquestrianPage from './pages/Equestrian';
import ContactPage from './pages/Contact';

export default function App() {
  return (
    <Router history={{ location: '', listen: () => {} }}>
      <div className="lubtha">
        <HeaderComponent />

        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/software-development">
          <SoftwareDevPage />
        </Route>
        <Route path="/equestrian">
          <EquestrianPage />
        </Route>
        <Route path="/contact">
          <ContactPage />
        </Route>
      </div>
    </Router>
  );
}
