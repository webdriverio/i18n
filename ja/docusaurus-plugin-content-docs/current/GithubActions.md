---
id: githubactions
title: Github Actions
---

リポジトリがGithubでホストされている場合、[Github Actions](https://docs.github.com/en/actions)を使用してGithubのインフラストラクチャ上でテストを実行することができます。

1. 変更をプッシュするたび
2. プルリクエストが作成されるたび
3. スケジュールされた時間に
4. 手動でトリガーする

リポジトリのルートに`.github/workflows`ディレクトリを作成してください。例えば`.github/workflows/ci.yaml`のようなYamlファイルを追加します。そこでテストの実行方法を設定します。

参考実装として[jasmine-boilerplate](https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml)、および[サンプルテスト実行](https://github.com/webdriverio/jasmine-boilerplate/actions?query=workflow%3ACI)を参照してください。

```yaml reference
https://github.com/webdriverio/jasmine-boilerplate/blob/master/.github/workflows/ci.yaml
```

ワークフローファイルの作成に関する詳細情報は[Github Docs](https://docs.github.com/en/actions/managing-workflow-runs-and-deployments/managing-workflow-runs/manually-running-a-workflow?tool=cli)を参照してください。