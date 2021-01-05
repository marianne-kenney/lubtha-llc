import React, { Component } from 'react';

import '../styles/Home.scss'

export default class Header extends Component {
  constructor(props) {
    super(props);

    document.title = 'Lúbtha LLC';
  }

  render() {
    return (
      <div className="home-page">
        <p>Coming soon!</p>
      </div>
    );
  }
}
