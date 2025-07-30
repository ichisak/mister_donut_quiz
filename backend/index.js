const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Cloud Run が環境変数 PORT を渡す（なければ 3001 を使う）
const port = process.env.PORT || 3001;

// CORS 設定
const corsOptions = {
  origin: '*', // 必要に応じて制限
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// クイズデータ読み込み
const quizData = require('./quiz.json');

// 静的ファイル（画像）を公開
app.use('/images', express.static(path.join(__dirname, 'images')));

// クイズ API
app.get('/api/quiz', (req, res) => {
  res.json(quizData);
});

// ルート（必要であれば追加）
app.get('/', (req, res) => {
  res.send('Mister Donut Quiz Backend is running');
});

// サーバ起動
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
