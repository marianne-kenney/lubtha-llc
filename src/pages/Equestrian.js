import React, { Component } from 'react';
import * as d3 from 'd3';

import ShowComponent from '../components/Show';
import classesCsv from '../data/classes-01-10-21.csv';
import feesCsv from '../data/fees-01-10-21.csv';
import '../styles/Equestrian.scss';

export default class EquestrianPage extends Component {
  constructor(props) {
    super(props);

    document.title = 'Lúbtha LLC - Equestrian';

    this.state = {
      securityRequired: true,
      fenceHeight: { min: 0.9, max: 1.2 },
      prizeMoney: { min: 0, max: 7500 },
      sortBy: ''
    };
  }

  componentDidMount() {
    d3.csv(classesCsv).then(data => {
      const classes = this.handleClassesFees(Object.values(data));
      this.setState({ classes });

      let shows = [];
      classes.forEach(item => {
        if (!shows.filter(show => show.name === item.showName).length)
          shows.push({ name: item.showName, total: 0, count: 0 });
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

    data.forEach((row, i) => {
      Object.keys(row).forEach(key => {
        let formattedItem = row[key]
          .trim()
          .replaceAll('$', '')
          .replaceAll(',', '')
          .replaceAll('-', '0');

        row[key.trim()] = formattedItem;
      });
      row.id = i;

      if (row.showName || row.feeName) formattedData.push(row);
    });

    formattedData.splice(formattedData.length - 1, formattedData.length);
    return formattedData;
  }

  onChangeRange = event => {
    const { state } = this;
    state[event.target.name][event.target.id] = parseFloat(event.target.value);
    this.setState(state);
  };

  onChangeSort = event => {
    let { shows } = this.state;
    let sortBy = event.target.id;
    switch (sortBy) {
      case 'name':
        shows = shows.sort((a, b) => {
          let aName = a.name.toUpperCase();
          let bName = b.name.toUpperCase();
          return aName < bName ? -1 : aName > bName ? 1 : 0;
        });
        break;
      case 'total':
        shows = shows.sort((a, b) => a.total - b.total);
        break;
      case 'count':
        shows = shows.sort((a, b) => b.count - a.count);
        break;
      default:
        break;
    }
    this.setState({ shows });
  };

  onShowTotalChange = (name, total) => {
    const { shows } = this.state;
    shows.filter(show => show.name === name)[0].total = total;
    this.setState({ shows });
  };

  onShowCountChange = (name, count) => {
    const { shows } = this.state;
    shows.filter(show => show.name === name)[0].count = count;
    this.setState({ shows });
  };

  securityBypass = event => {
    if (event.target.value === 'tommy2021') {
      this.setState({ securityRequired: false });
    }
  };

  render() {
    const {
      securityRequired,
      fenceHeight,
      prizeMoney,
      classes,
      shows,
      fees
    } = this.state;

    if (securityRequired) {
      return (
        <div className="equestrian-page">
          <p>
            Content coming to the public soon!
            <br />
            For now, if you have access, enter the password below:
          </p>
          <input
            type="password"
            placeholder="password"
            onChange={this.securityBypass}
          />
        </div>
      );
    }

    let showsDisplay;
    if (classes && shows && fees) {
      showsDisplay = shows.map(show => {
        return (
          <ShowComponent
            key={show.name}
            name={show.name}
            fenceHeight={fenceHeight}
            prizeMoney={prizeMoney}
            classes={classes.filter(item => item.showName === show.name)}
            fees={fees}
            onTotalChange={this.onShowTotalChange}
            onCountChange={this.onShowCountChange}
          />
        );
      });
    }

    return (
      <div className="equestrian-page">
        <form>
          <div className="filters">
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
          </div>
          <div className="sort-by">
            <p>Sort once by: </p>
            <input
              type="button"
              id="name"
              name="sort-by"
              className="sort-name-input"
              value="Show Name"
              onClick={this.onChangeSort}
            />
            <input
              type="button"
              id="total"
              name="sort-by"
              className="sort-total-input"
              value="Running Total"
              onClick={this.onChangeSort}
            />
            <input
              type="button"
              id="count"
              name="sort-by"
              className="sort-count-input"
              value="Classes Count"
              onClick={this.onChangeSort}
            />
          </div>
          {showsDisplay}
        </form>
      </div>
    );
  }
}
