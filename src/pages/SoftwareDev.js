import React, { Component } from 'react';

import '../styles/SoftwareDev.scss'

export default class SoftwareDevPage extends Component {
  constructor(props) {
    super(props);

    document.title = 'Lúbtha LLC';
  }

  render() {
    return (
      <div className="software-dev-page">
        <p>Software Development - Coming soon!</p>
      </div>
    );
  }
}
