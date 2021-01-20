import React, { Component } from 'react';

import WorkExperienceComponent from '../components/WorkExperience';
import workExperienceJSON from '../data/experience-01-19-21.json';
import '../styles/SoftwareDev.scss';

export default class SoftwareDevPage extends Component {
  constructor(props) {
    super(props);

    document.title = 'Lúbtha LLC - Software Development';
  }

  getExperienceDetails = experience => {
    experience.details.forEach(detail => <p>{detail}</p>);
  };

  render() {
    return (
      <div className="software-dev-page">
        <h2>Work Experience</h2>

        {workExperienceJSON.map((e, i) => (
          <WorkExperienceComponent key={i} experience={e} />
        ))}
      </div>
    );
  }
}
