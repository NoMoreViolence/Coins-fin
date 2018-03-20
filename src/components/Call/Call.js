import axios from 'axios';

// 모든 코인의 이름 받을 때
export function GetAll() {
  return axios.get('/api');
}

// 코인별 마켓 정보 받을 때
export function GetCoin(coin) {
  return axios.get(`/api/${coin}`);
}

// 코인 별 가격 정보
export function GetPriceOfCoin(coin, exchange) {
  return axios.get(`/api/${coin}/${exchange}`);
}
