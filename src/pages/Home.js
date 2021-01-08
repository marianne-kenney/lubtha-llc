import React, {Component} from 'react';

import '../styles/Home.scss'

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    document.title = 'Lúbtha LLC';
  }

  render() {
    return (<div className="home-page">
      <p>Home - Coming soon!</p>
    </div>);
  }
}
