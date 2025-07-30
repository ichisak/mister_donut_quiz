# ベースイメージ
FROM node:20

# 作業ディレクトリ作成
WORKDIR /app

# パッケージ定義をコピーして依存関係インストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# 公開ポート（Cloud Run がこのポートでアクセス）
ENV PORT=8080
EXPOSE 8080

# サーバ起動
CMD [ "node", "index.js" ]