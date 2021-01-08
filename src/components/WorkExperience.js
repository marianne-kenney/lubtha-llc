import React, { Component } from "react";
import PropTypes from "prop-types";

import arrow from "../images/arrow.png";
import "../styles/WorkExperience.scss";

export default class WorkExperienceComponent extends Component {
  constructor(props) {
    super(props);

    document.title = "Lúbtha LLC";

    this.state = {
      experience: this.props.experience,
      isOpen: false
    };
  }

  handleExpandArrow = () => {
    const { isOpen } = this.state;
    this.setState({ isOpen: !isOpen });
  };

  render() {
    const { experience, isOpen } = this.state;

    const detailsRendering = isOpen
      ? experience.details.map((d, i) => (
          <p key={i} className="work-detail">
            • {d}
          </p>
        ))
      : null;

    return (
      <div
        className="work-experience-component"
        onClick={this.handleExpandArrow}
      >
        <img
          className={isOpen ? "expand-arrow-open" : "expand-arrow-closed"}
          src={arrow}
          alt="Expand arrow"
        />
        <dl
          className={isOpen ? "work-experience-open" : "work-experience-closed"}
        >
          <dt className="work-title">{experience.title}</dt>
          <span className="work-date">
            {experience.startDate} - {experience.endDate}
          </span>
          <dd className="work-description">{experience.description}</dd>
          <div className="work-details">{detailsRendering}</div>
        </dl>
      </div>
    );
  }
}

WorkExperienceComponent.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    details: PropTypes.array.isRequired
  }).isRequired
};
