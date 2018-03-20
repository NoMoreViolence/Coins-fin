import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
// 로딩바
import * as Call from './../Call/Call';
import './Exchange.css';
// Form
import ExchangeForm from './../ExchangeForm/ExchangeForm';
// 스타일 컴포넌트
import styled from 'styled-components';

class Select extends Component {
  constructor(props) {
    super(props);

    // initializes component state
    this.state = {
      fetching: false, // 요청이 끝났으면 false
      exchange: [], // 코인의 마켓 정보가 들어가게 되는 곳
      pasturl: '/' + this.props.match.params.CoinName,
      show: 'none'
    };
  }

  Coins = async (coin, market) => {
    // 요청중...
    this.setState({
      fetching: true,
      show: 'show'
    });

    // 선택 코인의 모든 데이터 받음
    let unprocessed = await Call.GetCoin(coin);
    // 선택 코인의 거래 가능 거래소 데이터로 좁힘
    unprocessed = unprocessed.data.result.markets.base;

    let matchedMarket = []; // 최종 검색 결과 담는 배열
    // 거래 가능 거래소 중 사용자가 검색한 거래소 에서 거래 가능한 교환 종목을 추림
    for (let index = 0; index < unprocessed.length; index++) {
      // 사용자가 알고 싶은 거래소일 경우
      if (unprocessed[index].exchange === market) {
        const temp = {
          exchange: unprocessed[index].exchange, // 거래소 이름
          pair: unprocessed[index].pair // 거래 단위
        };
        matchedMarket.push(temp);
      }
    }

    // 각 마켓의 코인 가격 호출 api 활용해서 데이터 집어넣음
    for (let index = 0; index < matchedMarket.length; index++) {
      // api 호출
      let temp = await Call.GetPriceOfCoin(
        matchedMarket[index].exchange,
        matchedMarket[index].pair
      );
      // 가격 정보 저장
      temp = temp.data.result.price;
      // 가격 정보 삽입
      matchedMarket[index].price = temp;
    }

    // setState
    this.setState({
      fetching: false,
      show: 'none',
      exchange: matchedMarket
    });
    console.log(this.state.exchange);
  };

  componentDidMount() {
    this.Coins(
      this.props.match.params.CoinName,
      this.props.match.params.Market
    );
  }

  render() {
    const exchange = data => {
      return data.map((DATA, i) => {
        return (
          <ExchangeForm
            initial={this.props.match.params.CoinName}
            event={DATA.pair}
            price={DATA.price}
            key={i}
          />
        );
      });
    };

    const Loading = styled.div`
      display: ${this.state.show};
      width: 60%;
      height: 60%;
      margin: 20%;
      text-align: center;
      font-size: 3em;
    `;

    return (
      <div className="exchange-container">
        <div className="exchange-buttons">
          <NavLink to={this.state.pasturl}>
            <button>Previous Page</button>
          </NavLink>
          <NavLink to="/">
            <button>Go Back To Home</button>
          </NavLink>
        </div>

        <div className="exchange-initial">
          <NavLink to={this.state.pasturl}>
            <button>{this.props.match.params.CoinName}</button>
          </NavLink>
        </div>
        <div className="exchange-market-name">
          {this.props.match.params.Market}
        </div>
        <div className="exchange-view">
          <Loading>Loading...</Loading>
          {exchange(this.state.exchange)}
        </div>
      </div>
    );
  }
}

export default Select;
