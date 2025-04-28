---
id: debugging
title: デバッグ
---

複数のプロセスが複数のブラウザで何十ものテストを実行する場合、デバッグは格段に難しくなります。

<iframe width="560" height="315" src="https://www.youtube.com/embed/_bw_VWn5IzU" frameborder="0" allowFullScreen></iframe>

まず始めに、`maxInstances`を`1`に設定し、デバッグが必要な特定のスペックとブラウザのみをターゲットにすることで並列処理を制限することが非常に役立ちます。

`wdio.conf`での設定例：

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

多くの場合、[`browser.debug()`](/docs/api/browser/debug)を使用してテストを一時停止し、ブラウザを検査することができます。

コマンドラインインターフェースもREPLモードに切り替わります。このモードでは、コマンドやページ上の要素を操作することができます。REPLモードでは、テスト内と同様に`browser`オブジェクト、または`$`と`$$`関数にアクセスできます。

`browser.debug()`を使用する場合は、テストが長時間実行されることでテストランナーがテストを失敗とみなさないように、テストランナーのタイムアウト時間を増やす必要があるでしょう。例えば：

`wdio.conf`での設定例：

```js
jasmineOpts: {
    defaultTimeoutInterval: (24 * 60 * 60 * 1000)
}
```

他のフレームワークでの設定方法については[timeouts](timeouts)を参照してください。

デバッグ後にテストを続行するには、シェルで`^C`ショートカットまたは`.exit`コマンドを使用します。

## 動的設定

`wdio.conf.js`はJavascriptを含むことができます。タイムアウト値を永続的に1日に変更したくない場合は、環境変数を使用してコマンドラインからこれらの設定を変更すると便利です。

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

...そしてDevToolsでスペックファイルをデバッグできます！

## Visual Studio Code（VSCode）でのデバッグ

最新のVSCodeでブレークポイントを使用してテストをデバッグする場合、デバッガーを起動するための2つのオプションがあります。オプション1が最も簡単な方法です：
 1. デバッガーを自動的にアタッチする
 2. 設定ファイルを使用してデバッガーをアタッチする

### VSCode自動アタッチの切り替え

次の手順でデバッガーを自動的にアタッチできます：
 - CMD + Shift + P（LinuxとMacos）またはCTRL + Shift + P（Windows）を押す
 - 入力フィールドに「attach」と入力
 - 「Debug: Toggle Auto Attach」を選択
 - 「Only With Flag」を選択

これで完了です！テストを実行すると（前述のように--inspectフラグを設定する必要があります）、自動的にデバッガーが起動し、最初のブレークポイントで停止します。

### VSCode設定ファイル

すべてまたは選択したスペックファイルを実行することが可能です。デバッグ設定は`.vscode/launch.json`に追加する必要があります。選択したスペックをデバッグするには、次の設定を追加します：
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

すべてのスペックファイルを実行するには、`"args"`から`"--spec", "${file}"`を削除します。

例：[.vscode/launch.json](https://github.com/mgrybyk/webdriverio-devtools/blob/master/.vscode/launch.json)

追加情報：https://code.visualstudio.com/docs/nodejs/nodejs-debugging

## Atomでの動的Repl

[Atom](https://atom.io/)ユーザーの場合、[@kurtharriger](https://github.com/kurtharriger)による[`wdio-repl`](https://github.com/kurtharriger/wdio-repl)を試すことができます。これはAtomで単一のコード行を実行できる動的replです。デモを見るには[こちら](https://www.youtube.com/watch?v=kdM05ChhLQE)のYouTube動画をご覧ください。

## WebStorm / Intellijでのデバッグ
次のようなnode.jsデバッグ設定を作成できます：
![Screenshot from 2021-05-29 17-33-33](https://user-images.githubusercontent.com/18728354/120088460-81844c00-c0a5-11eb-916b-50f21c8472a8.png)
設定の作り方について詳しくは、この[YouTubeビデオ](https://www.youtube.com/watch?v=Qcqnmle6Wu8)をご覧ください。

## 不安定なテストのデバッグ

不安定なテストのデバッグは非常に難しい場合があります。CIで発生した不安定な結果をローカルで再現するためのヒントをいくつか紹介します。

### ネットワーク
ネットワーク関連の不安定性をデバッグするには、[throttleNetwork](https://webdriver.io/docs/api/browser/throttleNetwork)コマンドを使用します。
```js
await browser.throttleNetwork('Regular3G')
```

### レンダリング速度
デバイス速度関連の不安定性をデバッグするには、[throttleCPU](https://webdriver.io/docs/api/browser/throttleCPU)コマンドを使用します。
これにより、ページのレンダリングが遅くなります。これはCIで複数のプロセスを実行しているなど、テストを遅くする可能性のある多くの要因によって引き起こされることがあります。
```js
await browser.throttleCPU(4)
```

### テスト実行速度

テストが影響を受けていないように見える場合、WebdriverIOがフロントエンドフレームワーク/ブラウザの更新よりも速い可能性があります。これは同期的なアサーションを使用している場合に発生します。WebdriverIOはこれらのアサーションを再試行する機会がなくなるためです。これにより問題が発生する可能性のあるコード例：
```js
expect(elementList.length).toEqual(7) // アサーション時にリストがまだ生成されていない可能性がある
expect(await elem.getText()).toEqual('this button was clicked 3 times') // アサーション時にテキストがまだ更新されていない可能性があり、エラーになる（「this button was clicked 2 times」は期待される「this button was clicked 3 times」と一致しない）
expect(await elem.isDisplayed()).toBe(true) // まだ表示されていない可能性がある
```
この問題を解決するには、非同期アサーションを使用する必要があります。上記の例は次のようになります：
```js
await expect(elementList).toBeElementsArrayOfSize(7)
await expect(elem).toHaveText('this button was clicked 3 times')
await expect(elem).toBeDisplayed()
```
これらのアサーションを使用すると、WebdriverIOは条件が一致するまで自動的に待機します。テキストをアサートする場合、これは要素が存在し、テキストが期待値と等しい必要があることを意味します。
これについては[ベストプラクティスガイド](https://webdriver.io/docs/bestpractices#use-the-built-in-assertions)でさらに詳しく説明しています。