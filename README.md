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

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## GitHub Actions

### deploy

`jest`を使用したテストと`Github Pages`へのデプロイを行います。

テストが失敗した場合は`Github Pages`へのデプロイを行いません。

### CodeQL

CodeQL analysis.

GitHub の設定をそのまま適用。
