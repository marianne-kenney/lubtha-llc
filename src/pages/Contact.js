import React, { Component } from "react";

import "../styles/Contact.scss";

export default class ContactPage extends Component {
  constructor(props) {
    super(props);

    document.title = "Lúbtha LLC - Contact";
  }

  render() {
    return (
      <div className="contact-page">
        <p>Contact - Coming soon!</p>
      </div>
    );
  }
}
