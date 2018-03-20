import React, { Component } from 'react';
import './ExchangeForm.css';

class SelectForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // 교환 단위
      unit: this.props.event.substring(this.props.initial.length).split('-')
    };
  }

  render() {
    const redOrBlue = {
      color: this.props.price.change.absolute > 0 ? 'red' : 'blue'
    };

    return (
      <div className="exchange-form">
        {/*전체 폼*/}
        {/*코인 이니셜*/}
        <div className="exchange-event">{this.props.event}</div>
        {/*5개 큰 div들 형식이 비슷한데, 고가, 현재가, 저가, 현재가 - 전날종가 , (현재가 - 전날종가)% */}
        <div className="exchange-price-form">
          <div className="exchange-price-view">
            <div className="exchange-price-view-info">High:</div>
            <div className="exchange-price-view-price">
              {this.props.price.high}
            </div>
            <div className="exchange-price-view-unit">{this.state.unit[0]}</div>
          </div>
          <div className="exchange-price-view" style={redOrBlue}>
            <div className="exchange-price-view-info">Current:</div>
            <div className="exchange-price-view-price">
              {this.props.price.last}
            </div>
            <div className="exchange-price-view-unit">{this.state.unit[0]}</div>
          </div>
          <div className="exchange-price-view">
            <div className="exchange-price-view-info">Low:</div>
            <div className="exchange-price-view-price">
              {this.props.price.low}
            </div>
            <div className="exchange-price-view-unit">{this.state.unit[0]}</div>
          </div>
          <div className="exchange-price-fluctuation" style={redOrBlue}>
            <div className="exchange-price-view">
              <div className="exchange-price-view-info">absolute:</div>
              <div className="exchange-price-view-price">
                {this.props.price.change.absolute}
              </div>
              <div className="exchange-price-view-unit">
                {this.state.unit[0]}
              </div>
            </div>
          </div>
          <div className="exchange-price-fluctuation" style={redOrBlue}>
            <div className="exchange-price-view">
              <div className="exchange-price-view-info">percentage:</div>
              <div className="exchange-price-view-price">
                {this.props.price.change.percentage}
              </div>
              <div className="exchange-price-view-unit">%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SelectForm;
