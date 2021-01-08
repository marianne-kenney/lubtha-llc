import React, { Component } from "react";

import WorkExperienceComponent from "../components/WorkExperience";
import "../styles/SoftwareDev.scss";

const WORK_EXPERIENCE = [
  {
    title: "Frontend Engineer",
    description: "Aliro Group",
    startDate: "09/2020",
    endDate: "Present",
    details: [
      "Developed the frontend of the platform for a new startup along side a small team, responsible for all frontend code written in React.",
      "Integrated unit tests with coverage for the entire code base using Jest and React’s testing library.",
      "Designed and implemented new features for the UI and improvements to the UX."
    ]
  },
  {
    title: "Frontend Engineer",
    description: "SmashFly Technologies, Inc. (acquired by STG Private Equity)",
    startDate: "05/2018",
    endDate: "12/2019",
    details: [
      "Developed features for our global enterprise SaaS application as part of full stack agile teams principally responsible for conversion of AngularJS code to Angular 5+.",
      "Worked cooperatively with team members in Concord, MA and Belfast, Northern Ireland to develop new features, fix bugs, write unit tests, perform end-to-end testing, and participate in code reviews.",
      "Worked with user experience designers to user engagement and increase adoption."
    ]
  },
  {
    title: "Freelance Technologist",
    description: "Zimble Show Stables (new business)",
    startDate: "01/2020",
    endDate: "08/2020",
    details: [
      "Assisted new CEO to develop an online web presence to manage multiple aspects of the business including lesson and barn management.",
      "Implemented a website design with additional plug-ins in WordPress to enable easy updating of site information for barn staff.",
      "Leveraged open source tools and trained on the use of adding and modifying content.",
      "Supported other areas of business management including invoicing and payment processing."
    ]
  },
  {
    title: "Assistant Project Manager",
    description: "Riser11 Management, LLC",
    startDate: "05/2017",
    endDate: "08/2017",
    details: [
      "Administered physical and digital filing systems, keeping records well-organized and easily retrievable by team members.",
      "Supported project manager with proactive support of budgets, schedules and scopes.",
      "Organized files, developed spreadsheets, faxed reports and scanned documents.",
      "Filed and retrieved records to support business needs and boost team productivity."
    ]
  }
];

export default class SoftwareDevPage extends Component {
  constructor(props) {
    super(props);

    document.title = "Lúbtha LLC";
  }

  getExperienceDetails = experience => {
    experience.details.forEach(detail => <p>{detail}</p>);
  };

  render() {
    return (
      <div className="software-dev-page">
        <h2>Work Experience</h2>

        {WORK_EXPERIENCE.map((e, i) => (
          <WorkExperienceComponent key={i} experience={e} />
        ))}
      </div>
    );
  }
}
