# Node公式イメージを使う
FROM node:20

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# 残りのファイルをコピー
COPY . .

# 開発サーバーを起動（create-react-appのデフォルトポートは3000）
CMD ["npm", "start"]
