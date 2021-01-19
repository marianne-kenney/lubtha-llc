import React, { Component } from "react";
import PropTypes from "prop-types";

import arrow from "../images/arrow.png";
import "../styles/Acordion.scss";

export default class AcordionComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: this.props.header,
      content: this.props.content,
      open: false
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        header: this.props.header,
        content: this.props.content
      });
    }
  }

  handleExpand = () => {
    const { open } = this.state;
    this.setState({ open: !open });
  };

  render() {
    const { header, content, open } = this.state;

    return (
      <div className="acordion-component">
        <img
          className={open ? "expand-arrow-open" : "expand-arrow-closed"}
          src={arrow}
          alt="Expand arrow"
          onClick={this.handleExpand}
        />
        <div className="acordion-header" onClick={this.handleExpand}>
          {header}
        </div>
        {open ? <div className="acordion-content">{content}</div> : null}
      </div>
    );
  }
}

AcordionComponent.propTypes = {
  header: PropTypes.any.isRequired,
  content: PropTypes.any.isRequired
};
