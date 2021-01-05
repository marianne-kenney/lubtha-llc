import React, { Component } from 'react';
import { Link } from "react-router-dom";

import logo from '../images/mainLogo.jpg'
import '../styles/Header.scss'

export default class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-header">
        <img className="main-logo" src={logo} alt="Lubtha LLC Logo" />
        <span className="primary-tabs">
          <Link to='/software-development'>Software Development</Link>
          <Link to='/equestrian'>Equestrian</Link>
          <Link to='/about'>About</Link>
        </span>
      </div>
    );
  }
}
