import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AcordionComponent from './Acordion';
import '../styles/Show.scss';

export default class ShowComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: this.props.name,
      classes: this.updatedClasses(this.props),
      fees: this.updatedFees(this.props),
      classesTotal: 0,
      feesTotal: 0
    };
  }

  componentDidMount() {
    console.log('here');
    this.updateShow();
  }

  componentDidUpdate(prevProps) {
    console.log('here');
    if (this.props.refreshNeeded) {
      const { name, feesTotal } = this.state;
      let classesTotal = 0;

      let classes = this.updatedClasses(this.props);
      classes.forEach(item => {
        item.total = item.quantity * (item.entryFee - item.awardMoney);
        classesTotal += item.total;
      });

      this.setState(
        { classes, classesTotal, feesTotal, refreshNeeded: false },
        () => {
          this.props.onShowChange(
            name,
            classesTotal + feesTotal,
            classes.length
          );
        }
      );
    }
  }

  updatedClasses = props => {
    return this.getDisplayClasses(props).map(item => {
      return {
        id: item.id,
        '1st': parseInt(item['1st']),
        '2nd': parseInt(item['2nd']),
        '3rd': parseInt(item['3rd']),
        '4th': parseInt(item['4th']),
        '5th': parseInt(item['5th']),
        '6th': parseInt(item['6th']),
        '7th': parseInt(item['7th']),
        '8th': parseInt(item['8th']),
        className: item.className,
        entryFee: parseInt(item.entryFee),
        fenceHeight: parseFloat(item.fenceHeight),
        prizeMoney: parseInt(item.prizeMoney),
        showName: item.showName,
        total: parseInt(
          typeof item.total === 'number' ? item.total : item.entryFee
        ),
        quantity: typeof item.quantity === 'number' ? item.quantity : 1,
        placing: item.placing || 0,
        awardMoney: item.awardMoney || 0
      };
    });
  };

  getDisplayClasses = props => {
    const { state } = this;
    let displayClasses = [];
    props.classes.forEach(item => {
      if (item.fenceHeight < props.fenceHeight.min) return;
      if (item.fenceHeight > props.fenceHeight.max) return;
      if (item.prizeMoney < props.prizeMoney.min) return;
      if (item.prizeMoney > props.prizeMoney.max) return;

      let newItem;
      if (state) {
        newItem = state.classes.filter(c => c.id === item.id)[0];
      }
      displayClasses.push(newItem ? newItem : item);
    });

    return displayClasses;
  };

  updatedFees = props => {
    const key = props.name.trim().replaceAll(' ', '');
    let showFees = [];
    props.fees.forEach(item => {
      showFees.push({
        feeName: item.feeName,
        amount: parseInt(item[key]),
        total: parseInt(item[key]),
        quantity: 1
      });
    });
    return showFees;
  };

  onChangeFeeProperty = event => {
    const { fees } = this.state;
    this.setState(
      { fees: this.onChangeProperty(fees, event) },
      this.updateShow()
    );
  };

  onChangeClassProperty = event => {
    const { classes } = this.state;
    this.setState(
      { classes: this.onChangeProperty(classes, event) },
      this.updateShow()
    );
  };

  onChangeProperty = (stateItem, event) => {
    stateItem[parseInt(event.target.id)][event.target.name] = parseInt(
      event.target.value ? event.target.value : ''
    );
    return stateItem;
  };

  onChangeClassAwardMoney = event => {
    let { classes } = this.state;
    let id = parseInt(event.target.id);
    let placing = parseInt(event.target.value ? event.target.value : '');

    const key = placing + this.getPlacingPostfix(placing);
    classes[id].placing = placing;
    classes[id].awardMoney = key === '0' || !key ? 0 : classes[id][key];

    this.setState({ classes }, this.updateShow());
  };

  updateShow = updatedClasses => {
    let { name, classes, fees } = this.state;
    classes = updatedClasses || classes;
    let classesTotal = 0;
    let feesTotal = 0;

    classes.forEach(item => {
      item.total = item.quantity * (item.entryFee - item.awardMoney);
      classesTotal += item.total;
    });

    fees.forEach(item => {
      item.total = item.quantity * item.amount;
      feesTotal += item.total;
    });

    this.setState({ classes, fees, classesTotal, feesTotal }, () => {
      this.props.onShowChange(name, classesTotal + feesTotal, classes.length);
    });
  };

  getPlacingPostfix = placing => {
    return placing === 1
      ? 'st'
      : placing === 2
      ? 'nd'
      : placing === 3
      ? 'rd'
      : placing > 3
      ? 'th'
      : '';
  };

  render() {
    const { name, classes, fees, classesTotal, feesTotal } = this.state;

    const header = (
      <div className="show-selection">
        <p className="show-selection-label">{name}</p>
        <p className="show-selection-count">{classes.length} classes</p>
        <p className="show-selection-total">
          Running Total: ${classesTotal + feesTotal}
        </p>
      </div>
    );

    const feeResuls = (
      <div className="fee-results">
        <div className="fee-result-header">
          <span className="fee-name">Fee Name</span>
          <span className="fee-amount">Amount</span>
          <span className="fee-quantity">Quantity</span>
          <span className="fee-total">Total (${feesTotal})</span>
        </div>
        {fees.map((item, i) => (
          <div key={`${i}`} className="fee-result">
            <span className="fee-name">{item.feeName}</span>
            <span className="fee-amount">
              $
              <input
                type="number"
                id={`${i}`}
                name="amount"
                className="fee-amount-input"
                min="0"
                max="1000000"
                value={item.amount}
                onChange={this.onChangeFeeProperty}
              />
            </span>
            <span className="fee-quantity">
              x
              <input
                type="number"
                id={`${i}`}
                name="quantity"
                className="fee-quantity-input"
                min="0"
                max="10"
                value={item.quantity}
                onChange={this.onChangeFeeProperty}
              />
            </span>
            <span className="fee-total">${item.total}</span>
          </div>
        ))}
      </div>
    );

    const classResults = (
      <div className="class-results">
        <div className="class-result-header">
          <span className="class-name">Class Name</span>
          <span className="class-fence-height">Fence Height</span>
          <span className="class-prize-money">Prize Money</span>
          <span className="class-placing">Placing</span>
          <span className="class-entry-fee">Entry Fee</span>
          <span className="class-quantity">Quantity</span>
          <span className="class-total">Total (${classesTotal})</span>
        </div>
        {classes.map((item, i) => (
          <div key={`${i}`} className="class-result">
            <span className="class-name">{item.className}</span>
            <span className="class-fence-height">~ {item.fenceHeight}m</span>
            <span className="class-prize-money">
              $
              <input
                type="number"
                id={`${i}`}
                name="prizeMoney"
                className="class-prize-money-input"
                min="0"
                max="1000000"
                step="50"
                value={item.prizeMoney}
                onChange={this.onChangeClassProperty}
              />
            </span>
            <span className="class-placing">
              <input
                type="number"
                id={`${i}`}
                name="placing"
                className="class-placing-input"
                min="0"
                max="8"
                value={item.placing}
                onChange={this.onChangeClassAwardMoney}
              />
              {this.getPlacingPostfix(item.placing)} = ${item.awardMoney}
            </span>
            <span className="class-entry-fee">
              $
              <input
                type="number"
                id={`${i}`}
                name="entryFee"
                className="class-entry-fee-input"
                min="0"
                max="1000000"
                step="5"
                value={item.entryFee}
                onChange={this.onChangeClassProperty}
              />
            </span>
            <span className="class-quantity">
              x
              <input
                type="number"
                id={`${i}`}
                name="quantity"
                className="class-quantity-input"
                min="0"
                max="10"
                step="1"
                value={item.quantity}
                onChange={this.onChangeClassProperty}
              />
            </span>
            <span className="class-total">${item.total}</span>
          </div>
        ))}
      </div>
    );

    const content = (
      <div>
        {classResults}
        {feeResuls}
      </div>
    );

    return (
      <div className="show-component">
        <AcordionComponent header={header} content={content} />
      </div>
    );
  }
}

ShowComponent.propTypes = {
  name: PropTypes.string.isRequired,
  fenceHeight: PropTypes.shape().isRequired,
  prizeMoney: PropTypes.shape().isRequired,
  classes: PropTypes.array.isRequired,
  fees: PropTypes.array.isRequired,
  onShowChange: PropTypes.func.isRequired
};
