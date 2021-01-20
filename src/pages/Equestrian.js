import React, { Component } from 'react';

import ShowComponent from '../components/Show';
import classesJSON from '../data/classes-01-19-21.json';
import feesJSON from '../data/fees-01-19-21.json';
import '../styles/Equestrian.scss';

export default class EquestrianPage extends Component {
  constructor(props) {
    super(props);

    document.title = 'Lúbtha LLC - Equestrian';

    this.state = {
      securityRequired: true,
      fenceHeight: { min: 0.9, max: 1.2 },
      prizeMoney: { min: 0, max: 7500 },
      sortBy: '',
      refreshShowsNeeded: true
    };
  }

  componentDidMount() {
    const classes = classesJSON;
    this.setState({ classes, fees: feesJSON });

    let shows = [];
    classes.forEach(item => {
      if (!shows.filter(show => show.name === item.showName).length)
        shows.push({ name: item.showName, total: 0, count: 0 });
    });
    this.setState({ shows });
  }

  onChangeRange = event => {
    let { state } = this;
    state[event.target.name][event.target.id] = parseFloat(event.target.value);
    state.refreshShowsNeeded = true;
    this.setState(state);
  };

  onChangeSort = event => {
    this.setState({ sortBy: event.target.id });
  };

  onShowChange = (name, total, count) => {
    const { shows } = this.state;
    shows.filter(show => show.name === name)[0].total = total;
    shows.filter(show => show.name === name)[0].count = count;
    this.setState({ shows, refreshShowsNeeded: false });
  };

  getSortedShows = () => {
    let { shows, sortBy } = this.state;
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
    return shows;
  };

  securityBypass = event => {
    if (
      event.target.value === 'tommy2021' ||
      window.location.href.includes('localhost')
    ) {
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
      fees,
      sortBy,
      refreshShowsNeeded
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
      showsDisplay = this.getSortedShows().map(show => {
        return (
          <ShowComponent
            key={show.name}
            name={show.name}
            fenceHeight={fenceHeight}
            prizeMoney={prizeMoney}
            classes={classes.filter(item => item.showName === show.name)}
            fees={fees}
            onShowChange={this.onShowChange}
            refreshNeeded={refreshShowsNeeded}
          />
        );
      });
    }

    return (
      <div className="equestrian-page">
        <h2>Equestrian Competition Data</h2>
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
              <span> to $</span>
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
            <span>Sort by: </span>
            <div className="sort-by-buttons">
              <div className="sort-name">
                <input
                  type="button"
                  id="name"
                  name="sort-by"
                  className={`sort-input ${
                    sortBy === 'name' ? 'selected' : ''
                  }`}
                  value="Show Name"
                  onClick={this.onChangeSort}
                />
              </div>
              <div className="sort-count">
                <input
                  type="button"
                  id="count"
                  name="sort-by"
                  className={`sort-input ${
                    sortBy === 'count' ? 'selected' : ''
                  }`}
                  value="Classes Count"
                  onClick={this.onChangeSort}
                />
              </div>
              <div className="sort-total">
                <input
                  type="button"
                  id="total"
                  name="sort-by"
                  className={`sort-input ${
                    sortBy === 'total' ? 'selected' : ''
                  }`}
                  value="Running Total"
                  onClick={this.onChangeSort}
                />
              </div>
            </div>
          </div>
          {showsDisplay}
        </form>
      </div>
    );
  }
}
