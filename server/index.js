// 익스프레스
const express = require('express');
// 코아 이거 쓰면 API 호출할때 HTTP 보안 요청 전부 걸러줍니다 최고에용
const cors = require('cors');
// 기본 내장모듈 빌드 파일 불러올 때 사용
const path = require('path');
// 익스프레스
const app = express();

// 포트 설정 개발용 포트 3001 나중에 합칠때 3001에서 돌아갑니다
const port = process.env.port || 3001;

// CORS 설정
app.use(cors());

// 디폴트로 리액트 폴더 때려박아버림
app.use(express.static(path.join(__dirname, '../build')));

// 서버 열어 버리기~
app.listen(port, () => {
  console.log('server is running at http://localhost:' + port);
});
