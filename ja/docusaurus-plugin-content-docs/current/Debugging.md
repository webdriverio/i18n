---
id: debugging
title: デバッグ
---

複数のプロセスが複数のブラウザで数十のテストを実行する場合、デバッグは著しく難しくなります。

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

まず始めに、`maxInstances`を`1`に設定し、デバッグが必要な特定の仕様とブラウザのみをターゲットにすることで、並列処理を制限すると非常に役立ちます。

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

## デバッグコマンド

多くの場合、[`browser.debug()`](/docs/api/browser/debug)を使用してテストを一時停止し、ブラウザを検査できます。

コマンドラインインターフェイスもREPLモードに切り替わります。このモードでは、コマンドやページ上の要素を操作することができます。REPLモードでは、テスト内と同様に`browser`オブジェクト、または`$`と`$$`関数にアクセスできます。

`browser.debug()`を使用する場合、テストランナーがテストに時間がかかりすぎて失敗するのを防ぐために、テストランナーのタイムアウトを増やす必要があるでしょう。例えば：

`wdio.conf`内:

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

他のフレームワークを使用する場合の詳細については、[timeouts](timeouts)を参照してください。

デバッグ後にテストを続行するには、シェルで`^C`ショートカットまたは`.exit`コマンドを使用します。

## 動的設定

`wdio.conf.js`はJavascriptを含むことができることに注意してください。おそらくタイムアウト値を永続的に1日に変更したくないため、環境変数を使用してコマンドラインからこれらの設定を変更すると便利なことがよくあります。

この技術を使用すると、設定を動的に変更できます：

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

その後、`wdio`コマンドの前に`debug`フラグを付けることができます：

```
$ DEBUG=true npx wdio wdio.conf.js --spec ./tests/e2e/myspec.test.js
```

...そしてDevToolsを使用してspecファイルをデバッグしましょう！

## Visual Studio Code（VSCode）でのデバッグ

最新のVSCodeでブレークポイントを使ってテストをデバッグしたい場合、デバッガーを起動するには2つの選択肢があります。そのうちオプション1が最も簡単な方法です：
 1. デバッガーを自動的にアタッチする
 2. 構成ファイルを使用してデバッガーをアタッチする

### VSCode自動アタッチの切り替え

次の手順でデバッガーを自動的にアタッチすることができます：
 - CMD + Shift + P（LinuxとMacos）またはCTRL + Shift + P（Windows）を押す
 - 入力フィールドに「attach」と入力
 - 「Debug: Toggle Auto Attach」を選択
 - 「Only With Flag」を選択

これだけです！テストを実行すると（前述のように設定で--inspectフラグを設定する必要があることを覚えておいてください）、自動的にデバッガーが起動し、最初のブレークポイントで停止します。

### VSCode設定ファイル

すべてまたは選択したspecファイルを実行することが可能です。デバッグ設定は`.vscode/launch.json`に追加する必要があります。選択したspecをデバッグするには、次の設定を追加します：
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

すべてのspecファイルを実行するには、`"args"`から`"--spec", "${file}"`を削除します。

例：[.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

追加情報：https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## AtomでのダイナミックRepl

[Atom](https://atom.io/)ハッカーの場合、[@kurtharriger](https://github.com/kurtharriger)による[`wdio-repl`](https://github.com/kurtharriger/wdio-repl)を試すことができます。これはAtomで単一のコード行を実行できるダイナミックReplです。デモを見るには[この](https://www.youtube.com/watch?v=kdM05ChhLQE) YouTubeビデオをご覧ください。

## WebStorm / Intellijでのデバッグ
このようなnode.jsデバッグ設定を作成できます：
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
設定の作り方の詳細については、この[YouTubeビデオ](https://www.youtube.com/watch?v=Qcqnmle6Wu8)をご覧ください。

## 不安定なテストのデバッグ

不安定なテストのデバッグは非常に難しい場合があるため、CIで発生した不安定な結果をローカルで再現する方法についていくつかのヒントを紹介します。

### ネットワーク
ネットワーク関連の不安定性をデバッグするには、[throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork)コマンドを使用します。
```js
await browser.throttleNetwork('Regular3G')
```

### レンダリング速度
デバイス速度関連の不安定性をデバッグするには、[throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU)コマンドを使用します。
これにより、ページの描画が遅くなります。これはCIで複数のプロセスを実行していてテストが遅くなるなど、多くの原因で起こりえます。
```js
await browser.throttleCPU(4)
```

### テスト実行速度

テストが影響を受けていないように見える場合、WebdriverIOがフロントエンドフレームワーク/ブラウザの更新よりも速い可能性があります。これは同期的なアサーションを使用すると、WebdriverIOがこれらのアサーションを再試行する機会がなくなるため発生します。これにより問題が発生する可能性のあるコードの例：
```js
expect(elementList.length).toEqual(7) // アサーション時にリストがまだ完全に取得されていない可能性がある
expect(await elem.getText()).toEqual('this button was clicked 3 times') // アサーション時にテキストがまだ更新されていない可能性がある（「this button was clicked 2 times」が期待される「this button was clicked 3 times」と一致しない）
expect(await elem.isDisplayed()).toBe(true) // まだ表示されていない可能性がある
```
この問題を解決するには、非同期アサーションを使用すべきです。上記の例は次のようになります：
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
これらのアサーションを使用すると、WebdriverIOは自動的に条件が一致するまで待機します。テキストをアサートする場合、これは要素が存在し、テキストが期待値と等しくなければならないことを意味します。
この詳細については[ベストプラクティスガイド](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions)で説明しています。