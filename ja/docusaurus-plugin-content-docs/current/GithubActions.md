---
id: githubactions
title: Github Actions
description: "リポジトリにワークフローファイルを追加して、GitHub Actions 上で WebdriverIO テストを実行します。"
---

リポジトリが Github でホストされている場合、[Github Actions](https://docs.github.com/en/actions) を使用して Github のインフラストラクチャ上でテストを実行できます。

1. 変更をプッシュするたび
2. プルリクエストが作成されるたび
3. スケジュールされた時間に
4. 手動トリガーで

リポジトリのルートに `.github/workflows` ディレクトリを作成します。Yaml ファイル（例：`.github/workflows/ci.yaml`）を追加します。そこでテストの実行方法を設定します。

リファレンス実装については [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) を、また[テスト実行のサンプル](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI)も参照してください。

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

ワークフローファイルの作成に関する詳細は、[Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) をご覧ください。