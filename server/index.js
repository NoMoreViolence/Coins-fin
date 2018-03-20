// 익스프레스
const express = require('express');
// 코아 이거 쓰면 API 호출할때 HTTP 보안 요청 전부 걸러줍니다 최고에용
const cors = require('cors');
// 기본 내장모듈 빌드 파일 불러올 때 사용
const path = require('path');
// 익스프레스
const app = express();

const axios = require('axios');

// 포트 설정 개발용 포트 3001 나중에 합칠때 3001에서 돌아갑니다
const port = 3000;

// 디폴트로 리액트 폴더 때려박아버림
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 모든 코인
app.get('/api', function(req, res) {
  let coins = [];

  let data = axios
    .get('https://api.cryptowat.ch/assets')
    .then(function(response) {
      coins = response.data;
      console.log(coins);

      res.header('Content-type', 'application/json');
      res.header('Charset', 'utf8');
      res.send(coins);
    })
    .catch(function(error) {
      console.log(error);
    });
});

// 특정 코인 거래소
app.get('/api/:CoinName', function(req, res) {
  let coins = [];

  let data = axios
    .get(`https://api.cryptowat.ch/assets/${req.params.CoinName}`)
    .then(function(response) {
      coins = response.data;
      console.log(coins);

      res.header('Content-type', 'application/json');
      res.header('Charset', 'utf8');
      res.send(coins);
    })
    .catch(function(error) {
      console.log(error);
    });
});

// 특정 거래소의 특정 코인 시세
app.get('/api/:CoinName/:Market', function(req, res) {
  let coins = [];

  let data = axios
    .get(
      `https://api.cryptowat.ch/markets/${req.params.CoinName}/${
        req.params.Market
      }/summary`
    )
    .then(function(response) {
      coins = response.data;
      console.log(coins);

      res.header('Content-type', 'application/json');
      res.header('Charset', 'utf8');
      res.send(coins);
    })
    .catch(function(error) {
      console.log(error);
    });
});

// 서버 열어 버리기~
app.listen(port, () => {
  console.log('server is running at http://localhost:' + port);
});
