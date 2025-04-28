---
id: sharding
title: シャーディング
---

デフォルトでは、WebdriverIOはテストを並行して実行し、マシン上のCPUコアを最適に活用するよう努めています。さらに並列化を高めるために、複数のマシンで同時にテストを実行することでWebdriverIOのテスト実行をスケールアップすることができます。この操作モードを「シャーディング」と呼びます。

## 複数のマシン間でのテストのシャーディング

テストスイートをシャーディングするには、コマンドラインに`--shard=x/y`を渡します。例えば、スイートを4つのシャードに分割し、それぞれがテストの4分の1を実行する場合：

```sh
npx wdio run wdio.conf.js --shard=1/4
npx wdio run wdio.conf.js --shard=2/4
npx wdio run wdio.conf.js --shard=3/4
npx wdio run wdio.conf.js --shard=4/4
```

これらのシャードを異なるコンピュータで並行して実行すると、テストスイートの完了が4倍速くなります。

## GitHub Actionsの例

GitHub Actionsは[`jobs.<job_id>.strategy.matrix`](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix)オプションを使用して[複数のジョブ間でテストをシャーディング](https://docs.github.com/en/actions/using-jobs/using-a-matrix-for-your-jobs)することをサポートしています。matrixオプションは、提供されたオプションの可能なすべての組み合わせについて個別のジョブを実行します。

次の例では、4台のマシンで並行してテストを実行するジョブを設定する方法を示します。完全なパイプラインのセットアップは[Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate/blob/main/.github/workflows/test.yaml)プロジェクトで確認できます。

- まず、作成したいシャードの数を含むシャードオプションを持つマトリックスオプションをジョブ設定に追加します。`shard: [1, 2, 3, 4]`は、それぞれ異なるシャード番号を持つ4つのシャードを作成します。
- 次に、`--shard ${{ matrix.shard }}/${{ strategy.job-total }}`オプションでWebdriverIOテストを実行します。これが各シャードのテストコマンドになります。
- 最後に、wdioログレポートをGitHub Actions Artifactsにアップロードします。これにより、シャードが失敗した場合にログが利用可能になります。

テストパイプラインは次のように定義されています：

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

これによりすべてのシャードが並行して実行され、テストの実行時間が4分の1に短縮されます：

![GitHub Actionsの例](/img/sharding.png "GitHub Actionsの例")

[Cucumber Boilerplate](https://github.com/webdriverio/cucumber-boilerplate)プロジェクトのコミット[`96d444e`](https://github.com/webdriverio/cucumber-boilerplate/commit/96d444ea23919389682b9b1c9408ed91c452c7f8)では、テストパイプラインにシャーディングを導入し、全体の実行時間を`2:23分`から`1:30分`に短縮しました。これは__37%__の削減です🎉。