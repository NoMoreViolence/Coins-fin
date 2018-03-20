import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './ListForm.css';

class ListForm extends Component {
  render() {
    return (
      <div className="all-coinlist-form">
        <div className="all-coin-symbol">{this.props.symbol}</div>
        <div className="all-coin-name">{this.props.name}</div>
        <NavLink to={this.props.symbol}>
          <button className="all-details-button">Details...</button>
        </NavLink>
      </div>
    );
  }
}

export default ListForm;
