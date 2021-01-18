import React, { Component } from "react";
import * as d3 from "d3";

import ShowComponent from "../components/Show";
import classesCsv from "../data/classes-01-10-21.csv";
import feesCsv from "../data/fees-01-10-21.csv";
import "../styles/Equestrian.scss";

export default class EquestrianPage extends Component {
  constructor(props) {
    super(props);

    document.title = "Lúbtha LLC - Equestrian";

    this.state = {
      fenceHeight: { min: 0.9, max: 1.2 },
      prizeMoney: { min: 0, max: 7500 }
    };
  }

  componentDidMount() {
    d3.csv(classesCsv).then(data => {
      const classes = this.handleClassesFees(Object.values(data));
      this.setState({ classes });

      let shows = [];
      classes.forEach(item => {
        if (!shows.filter(show => show === item.showName).length)
          shows.push(item.showName);
      });
      this.setState({ shows });
    });

    d3.csv(feesCsv).then(data => {
      const fees = this.handleClassesFees(Object.values(data));
      this.setState({ fees });
    });
  }

  handleClassesFees(data) {
    let formattedData = [];

    data.forEach(row => {
      Object.keys(row).forEach(key => {
        let formattedItem = row[key]
          .trim()
          .replaceAll("$", "")
          .replaceAll(",", "")
          .replaceAll("-", "0");

        row[key.trim()] = formattedItem;
      });

      if (row.showName || row.feeName) formattedData.push(row);
    });

    formattedData.splice(formattedData.length - 1, formattedData.length);
    return formattedData;
  }

  onChangeRange = event => {
    const { state } = this;
    state[event.target.name][event.target.id] = event.target.value;
    this.setState(state);
  };

  render() {
    const { fenceHeight, prizeMoney, classes, shows, fees } = this.state;

    let showsDisplay;
    if (classes && shows && fees) {
      showsDisplay = shows
        .sort((a, b) => a.localeCompare(b))
        .map(show => {
          return (
            <ShowComponent
              name={show}
              fenceHeight={fenceHeight}
              prizeMoney={prizeMoney}
              classes={classes.filter(item => item.showName === show)}
              fees={fees}
            />
          );
        });
    }

    return (
      <div className="equestrian-page">
        <form>
          <div className="fence-height">
            <span>Fence Height: </span>
            <input
              type="number"
              id="min"
              name="fenceHeight"
              className="fence-height-input"
              min="0.65"
              max="1.65"
              step="0.05"
              value={fenceHeight.min}
              onChange={this.onChangeRange}
            />
            <span>m to</span>
            <input
              type="number"
              id="max"
              name="fenceHeight"
              className="fence-height-input"
              min="0.65"
              max="1.65"
              step="0.05"
              value={fenceHeight.max}
              onChange={this.onChangeRange}
            />
            <span>m</span>
          </div>
          <div className="prize-money">
            <span>Prize Money: $</span>
            <input
              type="number"
              id="min"
              name="prizeMoney"
              className="prize-money-input"
              min="0"
              max="1000000"
              step="50"
              value={prizeMoney.min}
              onChange={this.onChangeRange}
            />
            <span>to $</span>
            <input
              type="number"
              id="max"
              name="prizeMoney"
              className="prize-money-input"
              min="0"
              max="1000000"
              step="50"
              value={prizeMoney.max}
              onChange={this.onChangeRange}
            />
          </div>
          {showsDisplay}
        </form>
      </div>
    );
  }
}
