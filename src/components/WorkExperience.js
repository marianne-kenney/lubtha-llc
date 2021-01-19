import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AcordionComponent from './Acordion';
import '../styles/WorkExperience.scss';

export default class WorkExperienceComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      experience: this.props.experience,
      isOpen: false
    };
  }

  render() {
    const { experience } = this.state;

    const header = (
      <dl className="work-experience">
        <dt className="work-title">{experience.title}</dt>
        <span className="work-date">
          {experience.startDate} - {experience.endDate}
        </span>
        <dd className="work-description">{experience.description}</dd>
      </dl>
    );

    const content = (
      <div className="work-details">
        {experience.details.map((d, i) => (
          <p key={i} className="work-detail">
            • {d}
          </p>
        ))}
      </div>
    );

    return (
      <div className="work-experience-component">
        <AcordionComponent header={header} content={content} />
      </div>
    );
  }
}

WorkExperienceComponent.propTypes = {
  experience: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    details: PropTypes.array.isRequired
  }).isRequired
};
