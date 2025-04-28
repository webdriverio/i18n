---
id: githubactions
title: Github Actions
---

リポジトリが Github でホスティングされている場合、[Github Actions](https://docs.github.com/en/actions) を使用して Github のインフラストラクチャでテストを実行することができます。

1. 変更をプッシュするたびに
2. すべてのプルリクエスト作成時
3. スケジュールされた時間に
4. 手動トリガーによって

リポジトリのルートに `.github/workflows` ディレクトリを作成します。Yaml ファイル（例：`.github/workflows/ci.yaml`）を追加します。そこでテストの実行方法を設定します。

参考実装として [jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml) を、また[サンプルテスト実行](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI)を参照してください。

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

ワークフローファイルの作成についての詳細情報は、[Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli) で確認してください。