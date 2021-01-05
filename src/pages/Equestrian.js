import React, { Component } from 'react';

import '../styles/Equestrian.scss'

export default class EquestrianPage extends Component {
  constructor(props) {
    super(props);

    document.title = 'Lúbtha LLC';
  }

  render() {
    return (
      <div className="equestrian-page">
        <p>Equestrian - Coming soon!</p>
      </div>
    );
  }
}
