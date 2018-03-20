import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
// 총 리스트
import List from './components/List/List';
// 검색 시
import Select from './components/Select/Select';
// 코인 거래소 정보
import Exchange from './components/Exchange/Exchange.js';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Container>
          <Switch>
            <Route path="/:CoinName/:Market" component={Exchange} />
            <Route path="/:CoinName" component={Select} />
            <Route exact path="/" component={List} />
          </Switch>
        </Container>
      </BrowserRouter>
    );
  }
}
//           <Route path="/:coin" component={Select} />
export default App;
