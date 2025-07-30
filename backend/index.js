const express = require('express');
const path = require('path');
const app = express();
const port = 3001;


// CORS許可
const cors = require('cors');
app.use(cors());

// クイズデータ読み込み
const quizData = require('./quiz.json');

// 画像を静的配信
app.use('/images', express.static(path.join(__dirname, 'images')));

// クイズデータAPI
app.get('/api/quiz', (req, res) => {
  res.json(quizData);
});

app.listen(port, () => {
  console.log(`Quiz API server listening at http://localhost:${port}`);
});
