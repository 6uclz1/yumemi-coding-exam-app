# ゆめみ フロントエンドコーディング試験

[![GitHub Pages](https://github.com/6uclz1/yumemi-coding-exam-app/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/6uclz1/yumemi-coding-exam-app/actions/workflows/gh-pages.yml)

[![CodeQL](https://github.com/6uclz1/yumemi-coding-exam-app/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/6uclz1/yumemi-coding-exam-app/actions/workflows/codeql-analysis.yml)

[![codecov](https://codecov.io/gh/6uclz1/yumemi-coding-exam-app/branch/master/graph/badge.svg?token=1JT6NRHLZF)](https://codecov.io/gh/6uclz1/yumemi-coding-exam-app)

ゆめみの [フロントエンドコーディング試験](https://notion.yumemi.co.jp/0e9ef27b55704d7882aab55cc86c999d) の問題を実装したものです。

別に採用試験を受けるためのものではなくて、勉強用に作成。

## Setup

初期設定

### `npm ci`

npm で必要なパッケージを取得してきます。

## Available Scripts

使用できる `npm` スクリプト

[create-react-app](https://facebook.github.io/create-react-app)
のコマンドが使用できます。

### `npm start`

`npm start`で Web アプリが起動します。

[http://localhost:3000](http://localhost:3000)
の URL を規定のブラウザが自動で開きます。

なにかコード上で変更があるとリロードされます。

入力していた情報は残るので、
初期表示時の挙動を確認したい場合は手動で更新してください。

`lint`のエラーがある場合、コンソール上に表示されます。

### `npm test`

ユニットテストを実行します。
詳しくは以下のドキュメントを参照してください。

[create-react-app running tests docs](https://facebook.github.io/create-react-app/docs/running-tests)

### `npm run build`

アプリのビルドを行います。
生成物は`./build`フォルダに置かれます。

詳しくは以下のドキュメントを参照してください。

[create-react-app deployment docs](https://facebook.github.io/create-react-app/docs/deployment)

## GitHub Actions

### deploy

`jest`を使用したテストと`Github Pages`へのデプロイを行います。

テストが失敗した場合は`Github Pages`へのデプロイを行いません。

### CodeQL

CodeQL analysis.

GitHub の設定をそのまま適用。

## Todo

- [ ] 選択したチェックボックスを外し、かつ全てのチェックボックスが未選択だった場合、注釈の部分が残ったままになってしまう
- [ ] チェックボックス選択後の挙動がおかしい場合がある（アニメーションが走らない）
- [ ] ツールチップ（グラフにマウスオーバーした際、表示される情報）に画面の縦幅を上回る情報を表示した場合（都道府県を 47 つ選択した際など）、画面のスクロール領域の関係上ガクガクしたりする挙動が発生する
- [ ] RESAS の API キーを平文で入れているので、第三者が API キーを見ることができてしまう。（これに関しては GitHub Pages が静的サイトしかデプロイできないので対応が難しい）
