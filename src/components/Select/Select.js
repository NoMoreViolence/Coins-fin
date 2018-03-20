import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import * as Call from './../Call/Call';
import './Select.css';
import styled from 'styled-components';
// Form
import SelectForm from './../SelectForm/SelectForm';

class Select extends Component {
  constructor(props) {
    super(props);

    // initializes component state
    this.state = {
      fetching: false, // 요청이 끝났으면 false
      results: [], // 코인의 정보가 들어가게 되는 곳
      markets: [], // 코인의 마켓 정보가 들어가게 되는 곳
      show: 'none' // 로딩중일 때
    };
  }

  // 특정 코인의 정보 받는 메소드
  Coins = async coin => {
    this.setState({
      fetching: true, // requesting..
      show: 'show'
    });

    // 코인의 전체 데이터
    const post = await Call.GetCoin(coin);
    // 그중 필요한 거래소 부분만 저장
    this.setState({
      results: post.data.result.markets.base,
      fetching: false,
      show: 'none'
    });

    // 저장한 거래소 부분을 수정해서 중복 거래소를 없애는 부분
    let markets = []; // API로 받은 데이터 저장
    let num = 0; // 데이터 저장할 때 사용할 배열 원소 번호
    for (let index = 0; index < this.state.results.length; index++) {
      // 새로운 마켓 이라면
      if (markets[num - 1] !== this.state.results[index].exchange) {
        // 배열에 추가
        markets[num] = this.state.results[index].exchange;
        // 다음 배열 원소 번호
        num++;
      }
    }
    // 거래소 이름 순으로 정렬
    markets.sort();

    // 마켓 state에 데이터 추가
    this.setState({
      markets: markets
    });
  };

  // 처음 로딩되었을 때 코인 정보 출력 실행
  componentDidMount() {
    // 각국의 진짜 화폐의 정보들은 다른 방식으로 나타내야 함
    if (
      this.props.match.params.CoinName !== 'krw' && // 한국 원화
      this.props.match.params.CoinName !== 'usd' && // 미국 달러
      this.props.match.params.CoinName !== 'cny' && // 중국 위안
      this.props.match.params.CoinName !== 'cad' && // 캐나다 달러
      this.props.match.params.CoinName !== 'aud' && // 오스트레일리아 달러
      this.props.match.params.CoinName !== 'hkd' && // 홍콩 달러
      this.props.match.params.CoinName !== 'inr' && // 인도 루피
      this.props.match.params.CoinName !== 'jpy' && // 일본 엔
      this.props.match.params.CoinName !== 'mxn' && // 멕시코 돈
      this.props.match.params.CoinName !== 'sgd' && // 싱가포르 달러
      this.props.match.params.CoinName !== 'zar' // 남아공 돈
    ) {
      this.Coins(this.props.match.params.CoinName);
    }
  }

  render() {
    const Loading = styled.div`
      display: ${this.state.show};
      width: 60%;
      height: 60%;
      margin: 20%;
      text-align: center;
      font-size: 3em;
    `;

    const markets = data => {
      return data.map((market, i) => {
        return (
          <SelectForm
            markets={market}
            initial={this.props.match.params.CoinName}
            key={i}
          />
        );
      });
    };

    return (
      <div className="selected">
        <NavLink to="/">
          <button className="selected-homelink-button">Go Back To Main</button>
        </NavLink>
        <div className="selected-symbol">
          {this.props.match.params.CoinName}
        </div>
        <div className="selected-guidance">
          <p>Tradable exchange</p>
        </div>
        <div className="selected-market">
          <Loading>Loading...</Loading>
          {markets(this.state.markets)}
        </div>
      </div>
    );
  }
}

export default Select;
