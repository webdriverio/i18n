---
id: sharding
title: シャーディング
description: "--shard オプションを使用してテストスイートを複数のマシンに分割し、GitHub Actions などでテストをより高速に実行します。"
---

デフォルトでは、WebdriverIO はテストを並列に実行し、マシンの CPU コアを最適に活用するよう努めます。さらに高い並列化を実現するために、複数のマシンで同時にテストを実行することで、WebdriverIO のテスト実行をさらにスケールさせることができます。この動作モードを「シャーディング」と呼びます。

## 複数のマシン間でテストをシャーディングする

テストスイートをシャーディングするには、コマンドラインに `--shard=x/y` を渡します。例えば、スイートを 4 つのシャードに分割し、それぞれがテストの 4 分の 1 を実行するには次のようにします:

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

これらのシャードを異なるコンピューター上で並列に実行すれば、テストスイートは 4 倍速く完了します。

## GitHub Actions の例

GitHub Actions は、[`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix) オプションを使用して[複数のジョブ間でテストをシャーディングする](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)ことをサポートしています。matrix オプションは、指定されたオプションのすべての可能な組み合わせごとに個別のジョブを実行します。

次の例では、4 台のマシンで並列にテストを実行するようにジョブを設定する方法を示します。パイプライン全体の設定は [Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml) プロジェクトで確認できます。

-   まず、作成したいシャード数を含む shard オプションを持つ matrix オプションをジョブ設定に追加します。`shard: [1, 2, 3, 4]` は、それぞれ異なるシャード番号を持つ 4 つのシャードを作成します。
-   次に、`--shard ${{ matrix.shard }}/${{ strategy.job-total }}` オプションを付けて WebdriverIO テストを実行します。これが各シャードのテストコマンドになります。
-   最後に、wdio のログレポートを GitHub Actions Artifacts にアップロードします。これにより、シャードが失敗した場合にログを参照できるようになります。

テストパイプラインは次のように定義されます:

```yaml title=.github/workflows/test.yaml
name: Test

on: [push, pull_request]

jobs:
    lint:
        # ...
    unit:
        # ...
    e2e:
        name: 🧪 Test (${{ matrix.shard }}/${{ strategy.job-total }})
        runs-on: ubuntu-latest
        needs: [lint, unit]
        strategy:
            matrix:
                shard: [1, 2, 3, 4]
        steps:
            - uses: actions/checkout@v4
            - uses: ./.github/workflows/actions/setup
            - name: E2E Test
              run: npm run test:features -- --shard ${{ matrix.shard }}/${{ strategy.job-total }}
            - uses: actions/upload-artifact@v1
              if: failure()
              with:
                  name: logs-${{ matrix.shard }}
                  path: logs
```

これにより、すべてのシャードが並列に実行され、テストの実行時間が 4 分の 1 に短縮されます:

![GitHub Actions example](/img/sharding.png "GitHub Actions example")

[Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate) プロジェクトのコミット [`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8) を参照してください。このコミットではテストパイプラインにシャーディングを導入し、全体の実行時間を `2:23 min` から `1:30 min` に短縮しました。これは __37%__ の削減です 🎉。