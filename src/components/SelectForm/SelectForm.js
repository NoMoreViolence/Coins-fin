import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './SelectForm.css';

class SelectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      url: '/' + this.props.initial + '/' + this.props.markets
    };
  }

  render() {
    return (
      <div className="exchange">
        <span className="exchange-market">{this.props.markets}</span>
        <NavLink
          to={this.state.url}
          style={{ textDecoration: 'none', color: '#646464' }}
        >
          <div className="exchange-button">=></div>
        </NavLink>
      </div>
    );
  }
}

export default SelectForm;
