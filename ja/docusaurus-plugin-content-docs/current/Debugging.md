---
id: debugging
title: デバッグ
description: "browser.debug、VS Code や WebStorm のブレークポイント、不安定なテストへの対処法、CPU およびヒーププロファイリングを使用して WebdriverIO テストをデバッグします。"
---

複数のプロセスが複数のブラウザで数十のテストを生成する場合、デバッグは著しく困難になります。

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

まず、`maxInstances` を `1` に設定して並列処理を制限し、デバッグが必要なスペックとブラウザのみを対象にすると非常に役立ちます。

`wdio.conf` では:

```js
export const config = {
    // ...
    maxInstances: 1,
    specs: [
        '**/myspec.spec.js'
    ],
    capabilities: [{
        browserName: 'firefox'
    }],
    // ...
}
```

## Debug コマンド

多くの場合、[`browser.debug()`](/docs/api/browser/debug) を使用してテストを一時停止し、ブラウザを検査できます。

コマンドラインインターフェースも REPL モードに切り替わります。このモードでは、ページ上のコマンドや要素を自由に試すことができます。REPL モードでは、テスト内と同様に `browser` オブジェクト&mdash;または `$` および `$$` 関数&mdash;にアクセスできます。

`browser.debug()` を使用する場合、テストに時間がかかりすぎてテストランナーがテストを失敗させないように、テストランナーのタイムアウトを延長する必要があるでしょう。例えば:

`wdio.conf` では:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

他のフレームワークでこれを行う方法の詳細については、[タイムアウト](timeouts)を参照してください。

デバッグ後にテストを続行するには、シェルで `^C` ショートカットまたは `.exit` コマンドを使用します。

### コーディングエージェントのための一時停止（`--debug=agent`）

`wdio run --debug=agent` はフレームワークのタイムアウトを24時間に引き上げ、スペックが `await browser.debug()` を呼び出したとき、またはテストが失敗したときにワーカーを一時停止します。実行時には次のような行が出力されます:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

一時停止中のブラウザは [`wdio session`](/docs/session/debug)（`snapshot`、`exec` など）で検査し、続行するには `wdio session -s debug-0-0 resume` を実行します。`wdio session -s debug-0-0 close` は、一時停止中のテストを `Session closed from wdio session` で失敗させます。セッション名は `debug-<cid>` です（最初のワーカーの場合は `debug-0-0`）。このワークフローの残りの部分は [WebdriverIO Session](/docs/session) セクションにあります。
## 動的な設定

`wdio.conf.js` には JavaScript を含めることができる点に注意してください。タイムアウト値を恒久的に1日に変更したくはないでしょうから、環境変数を使用してコマンドラインからこれらの設定を変更すると便利なことがよくあります。

この手法を使用すると、設定を動的に変更できます:

```js
const debug = process.env.DEBUG
const defaultCapabilities = ...
const defaultTimeoutInterval = ...
const defaultSpecs = ...

export const config = {
    // ...
    maxInstances: debug ? 1 : 100,
    capabilities: debug ? [{ browserName: 'chrome' }] : defaultCapabilities,
    execArgv: debug ? ['--inspect'] : [],
    jasmineOpts: {
      defaultTimeoutInterval: debug ? (24 * 60 * 60 * 1000) : defaultTimeoutInterval
    }
    // ...
}
```

その後、`wdio` コマンドの前に `debug` フラグを付けることができます:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...そして DevTools でスペックファイルをデバッグしましょう！

## Visual Studio Code (VSCode) でのデバッグ

最新の VSCode でブレークポイントを使用してテストをデバッグしたい場合、デバッガーを起動するには2つの方法があり、そのうち方法1が最も簡単です:
 1. デバッガーを自動的にアタッチする
 2. 設定ファイルを使用してデバッガーをアタッチする

### VSCode Toggle Auto Attach

VSCode で次の手順に従うと、デバッガーを自動的にアタッチできます:
 - CMD + Shift + P（Linux および Macos）または CTRL + Shift + P（Windows）を押します
 - 入力フィールドに「attach」と入力します
 - 「Debug: Toggle Auto Attach」を選択します
 - 「Only With Flag」を選択します

 以上です！これでテストを実行すると（前述のように、設定で --inspect フラグを設定する必要があることを忘れないでください）、自動的にデバッガーが起動し、最初に到達したブレークポイントで停止します。

### VSCode 設定ファイル

すべてのスペックファイルまたは選択したスペックファイルを実行できます。デバッグ設定は `.vscode/launch.json` に追加する必要があります。選択したスペックをデバッグするには、次の設定を追加します:
```
{
    "name": "run select spec",
    "type": "node",
    "request": "launch",
    "args": ["wdio.conf.js", "--spec", "${file}"],
    "cwd": "${workspaceFolder}",
    "autoAttachChildProcesses": true,
    "program": "${workspaceRoot}/node_modules/@wdio/cli/bin/wdio.js",
    "console": "integratedTerminal",
    "skipFiles": [
        "${workspaceFolder}/node_modules/**/*.js",
        "${workspaceFolder}/lib/**/*.js",
        "<node_internals>/**/*.js"
    ]
},
```

すべてのスペックファイルを実行するには、`"args"` から `"--spec", "${file}"` を削除します

例: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

追加情報: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Atom での動的な Repl

[Atom](https://atom.io/) のハッカーであれば、[@kurtharriger](https://github.com/kurtharriger) による [`wdio-repl`](https://github.com/kurtharriger/wdio-repl) を試すことができます。これは Atom で単一のコード行を実行できる動的な repl です。デモを見るには [こちら](https://www.youtube.com/watch?v=kdM05ChhLQE) の YouTube 動画をご覧ください。

## WebStorm / Intellij でのデバッグ
次のように node.js のデバッグ設定を作成できます:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
設定の作成方法の詳細については、この [YouTube 動画](https://www.youtube.com/watch?v=Qcqnmle6Wu8) をご覧ください。

## 不安定なテストのデバッグ

不安定なテストはデバッグが非常に難しい場合があるため、CI で発生した不安定な結果をローカルで再現するためのヒントをいくつか紹介します。

### ネットワーク
ネットワーク関連の不安定さをデバッグするには、[throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork) コマンドを使用します。
```js
await browser.throttleNetwork('Regular3G')
```

### レンダリング速度
デバイスの速度に関連する不安定さをデバッグするには、[throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU) コマンドを使用します。
これによりページのレンダリングが遅くなります。このような遅延は、CI で複数のプロセスを実行してテストが遅くなるなど、さまざまな原因で発生する可能性があります。
```js
await browser.throttleCPU(4)
```

### テスト実行速度

テストが影響を受けていないように見える場合、WebdriverIO がフロントエンドフレームワーク / ブラウザの更新よりも速い可能性があります。これは同期アサーションを使用している場合に発生します。WebdriverIO にはこれらのアサーションを再試行する機会がもうないためです。これが原因で壊れる可能性のあるコードの例:
```js
expect(elementList.length).toEqual(7) // list might not be populated at the time of the assertion
expect(await elem.getText()).toEqual('this button was clicked 3 times') // text might not be updated yet at the time of assertion resulting in an error ("this button was clicked 2 times" does not match the expected "this button was clicked 3 times")
expect(await elem.isDisplayed()).toBe(true) // might not be displayed yet
```
この問題を解決するには、代わりに非同期アサーションを使用する必要があります。上記の例は次のようになります:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
これらのアサーションを使用すると、WebdriverIO は条件が一致するまで自動的に待機します。テキストをアサートする場合、これは要素が存在し、かつテキストが期待値と等しくなる必要があることを意味します。
これについては、[ベストプラクティスガイド](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions)で詳しく説明しています。

## パフォーマンスプロファイリング

WebdriverIO では、テストのパフォーマンスプロファイルをキャプチャして、テスト実行のボトルネックやメモリリークを特定できます。これには Node.js のネイティブなプロファイリング機能が使用されます。

### CPU プロファイリング

CPU プロファイルをキャプチャするには、`--cpu-prof` CLI フラグを使用するか、設定で `cpuProf: true` を設定します。

```bash
npx wdio run wdio.conf.js --cpu-prof
```

これにより、ワーカープロセスごとに `./profiles` ディレクトリ（デフォルト）に `.cpuprofile` ファイルが生成されます。このファイルを **Chrome DevTools > Performance > Load Profile** に読み込んで、実行を分析できます。

### ヒーププロファイリング

ヒーププロファイルをキャプチャするには、`--heap-prof` CLI フラグを使用するか、設定で `heapProf: true` を設定します。

```bash
npx wdio run wdio.conf.js --heap-prof
```

これにより、`./profiles` ディレクトリに `.heapprofile` ファイルが生成されます（サンプリングヒーププロファイラーを使用）。これを **Chrome DevTools > Memory > Load** に読み込んで、メモリ使用量を分析できます。

### タイミングメトリクス

プロファイリングが有効になっている場合、WebdriverIO はテストのセットアップ、実行、ティアダウンの各フェーズのタイミングメトリクスも自動的にログに記録し、どこで時間が費やされているかを把握するのに役立ちます。

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```