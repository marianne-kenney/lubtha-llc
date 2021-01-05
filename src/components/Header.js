import React, { Component } from 'react';
import { Link } from "react-router-dom";

import logo from '../images/headerLogo.jpg'
import '../styles/Header.scss'

export default class Header extends Component {
  render() {
    return (
      <div className="main-header">
        <Link to='/'>
          <img className="header-logo" src={logo} alt="Lubtha LLC Logo" />
        </Link>
        <span className="primary-tabs">
          <Link to='/software-development'>Software Development</Link>
          <Link to='/equestrian'>Equestrian</Link>
          <Link to='/about'>About</Link>
        </span>
      </div>
    );
  }
}
