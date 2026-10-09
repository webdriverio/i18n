---
id: debugging
title: デバッグ
description: "browser.debug、VS CodeやWebStormのブレークポイント、不安定なテストへの対処法、CPUおよびヒーププロファイリングを使ってWebdriverIOテストをデバッグします。"
---

複数のプロセスが複数のブラウザで数十のテストを生成する場合、デバッグは格段に難しくなります。

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

まず手始めに、`maxInstances`を`1`に設定して並列処理を制限し、デバッグが必要なスペックとブラウザのみを対象にすることが非常に役立ちます。

`wdio.conf`内:

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

## Debugコマンド

多くの場合、[`browser.debug()`](/docs/api/browser/debug)を使用してテストを一時停止し、ブラウザを検査できます。

コマンドラインインターフェースもREPLモードに切り替わります。このモードでは、ページ上のコマンドや要素をいろいろと試すことができます。REPLモードでは、テスト内と同様に`browser`オブジェクト&mdash;または`$`と`$$`関数&mdash;にアクセスできます。

`browser.debug()`を使用する場合、テストに時間がかかりすぎてテストランナーがテストを失敗させないように、テストランナーのタイムアウトを延長する必要があるでしょう。例えば:

`wdio.conf`内:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

他のフレームワークでこれを行う方法の詳細については、[timeouts](timeouts)を参照してください。

デバッグ後にテストを続行するには、シェルで`^C`ショートカットまたは`.exit`コマンドを使用します。

### コーディングエージェントのための一時停止（`--debug=agent`）

`wdio run --debug=agent`はフレームワークのタイムアウトを24時間に引き上げ、スペックが`await browser.debug()`を呼び出したとき、またはテストが失敗したときにワーカーを一時停止します。実行時には次のような行が出力されます:

```text
Paused in cart.e2e.ts › adds a blue t-shirt. Inspect with `wdio session -s debug-0-0 snapshot`, continue with `wdio session -s debug-0-0 resume`.
```

一時停止中のブラウザを[`wdio session`](/docs/session/debug)（`snapshot`、`exec`など）で検査し、`wdio session -s debug-0-0 resume`で続行します。`wdio session -s debug-0-0 close`は、一時停止中のテストを`Session closed from wdio session`として失敗させます。セッション名は`debug-<cid>`です（最初のワーカーの場合は`debug-0-0`）。このワークフローの残りの部分は[WebdriverIO Session](/docs/session)セクションにあります。
## 動的な設定

`wdio.conf.js`にはJavascriptを含めることができる点に注意してください。タイムアウト値を恒久的に1日に変更したくはないでしょうから、環境変数を使用してコマンドラインからこれらの設定を変更すると便利なことがよくあります。

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

その後、`wdio`コマンドの前に`debug`フラグを付けることができます:

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...そしてDevToolsでスペックファイルをデバッグしましょう！

## Visual Studio Code（VSCode）でのデバッグ

最新のVSCodeでブレークポイントを使用してテストをデバッグしたい場合、デバッガーを起動する方法は2つあり、そのうちオプション1が最も簡単な方法です:
 1. デバッガーを自動的にアタッチする
 2. 設定ファイルを使用してデバッガーをアタッチする

### VSCode Toggle Auto Attach

VSCodeで次の手順に従うことで、デバッガーを自動的にアタッチできます:
 - CMD + Shift + P（LinuxおよびMacos）またはCTRL + Shift + P（Windows）を押します
 - 入力フィールドに「attach」と入力します
 - 「Debug: Toggle Auto Attach」を選択します
 - 「Only With Flag」を選択します

 以上です！これでテストを実行すると（前述のとおり、設定で--inspectフラグを設定する必要があることを忘れないでください）、自動的にデバッガーが起動し、最初に到達したブレークポイントで停止します。

### VSCode設定ファイル

すべてのスペックファイル、または選択したスペックファイルを実行することができます。デバッグ設定は`.vscode/launch.json`に追加する必要があります。選択したスペックをデバッグするには、次の設定を追加します:
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

すべてのスペックファイルを実行するには、`"args"`から`"--spec", "${file}"`を削除します

例: [.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

追加情報: https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Atomでの動的Repl

[Atom](https://atom.io/)ハッカーであれば、[@kurtharriger](https://github.com/kurtharriger)による[`wdio-repl`](https://github.com/kurtharriger/wdio-repl)を試すことができます。これはAtomで単一のコード行を実行できる動的なreplです。デモを見るには[こちら](https://www.youtube.com/watch?v=kdM05ChhLQE)のYouTube動画をご覧ください。

## WebStorm / Intellijでのデバッグ
次のようにnode.jsのデバッグ設定を作成できます:
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
設定の作成方法の詳細については、こちらの[YouTube動画](https://www.youtube.com/watch?v=Qcqnmle6Wu8)をご覧ください。

## 不安定なテストのデバッグ

不安定なテストはデバッグが非常に難しい場合があるため、CIで発生した不安定な結果をローカルで再現するためのヒントをいくつか紹介します。

### ネットワーク
ネットワーク関連の不安定さをデバッグするには、[throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork)コマンドを使用します。
```js
await browser.throttleNetwork('Regular3G')
```

### レンダリング速度
デバイスの速度に関連する不安定さをデバッグするには、[throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU)コマンドを使用します。
これによりページのレンダリングが遅くなります。このような遅延は、CIで複数のプロセスを実行してテストが遅くなるなど、さまざまな原因で発生する可能性があります。
```js
await browser.throttleCPU(4)
```

### テスト実行速度

テストが影響を受けていないように見える場合、WebdriverIOがフロントエンドフレームワーク/ブラウザの更新よりも速い可能性があります。これは同期アサーションを使用している場合に発生します。WebdriverIOがこれらのアサーションを再試行する機会がなくなるためです。これが原因で壊れる可能性のあるコードの例をいくつか示します:
```js
expect(elementList.length).toEqual(7) // アサーションの時点でリストにまだ値が入っていない可能性がある
expect(await elem.getText()).toEqual('this button was clicked 3 times') // アサーションの時点でテキストがまだ更新されておらず、エラーになる可能性がある（"this button was clicked 2 times"が期待値の"this button was clicked 3 times"と一致しない）
expect(await elem.isDisplayed()).toBe(true) // まだ表示されていない可能性がある
```
この問題を解決するには、代わりに非同期アサーションを使用する必要があります。上記の例は次のようになります:
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
これらのアサーションを使用すると、WebdriverIOは条件が一致するまで自動的に待機します。テキストをアサートする場合、要素が存在し、かつテキストが期待値と等しくなる必要があることを意味します。
これについては、[ベストプラクティスガイド](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions)で詳しく説明しています。

## パフォーマンスプロファイリング

WebdriverIOでは、テストのパフォーマンスプロファイルを取得して、テスト実行のボトルネックやメモリリークを特定できます。これはNode.jsのネイティブなプロファイリング機能を使用します。

### CPUプロファイリング

CPUプロファイルを取得するには、`--cpu-prof` CLIフラグを使用するか、設定で`cpuProf: true`を設定します。

```bash
npx wdio run wdio.conf.js --cpu-prof
```

これにより、各ワーカープロセスごとに`./profiles`ディレクトリ（デフォルト）に`.cpuprofile`ファイルが生成されます。このファイルを**Chrome DevTools > Performance > Load Profile**に読み込んで、実行を分析できます。

### ヒーププロファイリング

ヒーププロファイルを取得するには、`--heap-prof` CLIフラグを使用するか、設定で`heapProf: true`を設定します。

```bash
npx wdio run wdio.conf.js --heap-prof
```

これにより、`./profiles`ディレクトリに`.heapprofile`ファイルが生成されます（サンプリングヒーププロファイラーを使用）。これを**Chrome DevTools > Memory > Load**に読み込んで、メモリ使用量を分析できます。

### タイミングメトリクス

プロファイリングが有効な場合、WebdriverIOはテストのセットアップ、実行、ティアダウンの各フェーズのタイミングメトリクスも自動的にログに記録し、どこに時間が費やされているかを把握するのに役立ちます。

```
📊 Performance Metrics:
────────────────────────────────────────
  Setup:     1.25s
  Execution: 3.42s
  Teardown:  0.15s
```