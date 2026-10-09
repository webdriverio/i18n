---
id: repl
title: REPLインターフェース
description: "WebdriverIO REPLを使用して、コマンドラインまたは実行中のテスト内から、コマンドを試したりテストを対話的にデバッグしたりできます。"
---

`v4.5.0`から、WebdriverIOは[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)インターフェースを導入しました。これはフレームワークのAPIを学ぶだけでなく、テストのデバッグや検査にも役立ちます。REPLはさまざまな方法で使用できます。

まず、`npm install -g @wdio/cli`をインストールしてCLIコマンドとして使用し、コマンドラインからWebDriverセッションを起動できます。例：

```sh
wdio repl chrome
```

これにより、REPLインターフェースで操作できるChromeブラウザが開きます。セッションを開始するには、ポート`4444`でブラウザドライバーが実行されていることを確認してください。[Sauce Labs](https://saucelabs.com)（または他のクラウドベンダー）のアカウントをお持ちの場合は、次のようにコマンドラインからクラウド上でブラウザを直接実行することもできます：

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

ドライバーが別のポート（例：9515）で実行されている場合は、コマンドライン引数`--port`またはエイリアス`-p`で指定できます。

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

REPLは、WebdriverIOの設定ファイルのcapabilitiesを使用して実行することもできます。WDIOはcapabilitiesオブジェクト、またはcapabilityのリスト、もしくはmulti-remoteのオブジェクトをサポートしています。

設定ファイルがcapabilitiesオブジェクトを使用している場合は、設定ファイルへのパスを渡すだけです。capabilityのリストまたはmulti-remoteの場合は、位置引数を使用して、リストまたはmulti-remoteのどのcapabilityを使用するかを指定します。注：リストの場合、インデックスは0から始まります。

### 例

capability配列を使用したWebdriverIO：

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // ブラウザのバージョン
        platformName: 'Windows 10' // OSプラットフォーム
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

[multi-remote](https://webdriver.io/docs/multiremote/)のcapabilityオブジェクトを使用したWebdriverIO：

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities: {
        myChromeBrowser: {
            capabilities: {
                browserName: 'chrome'
            }
        },
        myFirefoxBrowser: {
            capabilities: {
                browserName: 'firefox'
            }
        }
    }
}
```

```sh
wdio repl "./path/to/wdio.config.js" "myChromeBrowser" -p 9515
```

また、Appiumを使用してローカルでモバイルテストを実行したい場合：

<Tabs
  defaultValue="android"
  values={[
    {label: 'Android', value: 'android'},
    {label: 'iOS', value: 'ios'}
  ]
}>
<TabItem value="android">

```sh
wdio repl android
```

</TabItem>
<TabItem value="ios">

```sh
wdio repl ios
```

</TabItem>
</Tabs>

これにより、接続されたデバイス/エミュレーター/シミュレーター上でChrome/Safariセッションが開きます。セッションを開始するには、ポート`4444`でAppiumが実行されていることを確認してください。

```sh
wdio repl './path/to/your_app.apk'
```

これにより、接続されたデバイス/エミュレーター/シミュレーター上でアプリのセッションが開きます。セッションを開始するには、ポート`4444`でAppiumが実行されていることを確認してください。

iOSデバイスのcapabilitiesは引数で渡すことができます：

* `-v`      - `platformVersion`: Android/iOSプラットフォームのバージョン
* `-d`      - `deviceName`: モバイルデバイスの名前
* `-u`      - `udid`: 実機のudid

使用方法：

<Tabs
  defaultValue="long"
  values={[
    {label: 'Long Parameter Names', value: 'long'},
    {label: 'Short Parameter Names', value: 'short'}
  ]
}>
<TabItem value="long">

```sh
wdio repl ios --platformVersion 11.3 --deviceName 'iPhone 7' --udid 123432abc
```

</TabItem>
<TabItem value="short">

```sh
wdio repl ios -v 11.3 -d 'iPhone 7' -u 123432abc
```

</TabItem>
</Tabs>

REPLセッションでは、利用可能な任意のオプション（`wdio repl --help`を参照）を適用できます。

### `wdio session`にアタッチする

`wdio repl --session <name>`（エイリアス`-s`）はブラウザを起動しません。[`wdio session`](/docs/session)ですでに開かれているセッションにREPLをアタッチし、デタッチしてもそのセッションは実行されたままになります。テスト実行の一時停止については、[セッションを使用したテストのデバッグ](/docs/session/debug)で説明しています：

```sh
npx wdio session open chrome https://webdriver.io
npx wdio repl --session default
```

REPLでは、各行が`wdio session exec`として実行されます。`.exit`を実行すると`Detached from "default" (still running)`と表示されます。

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

REPLのもう1つの使い方は、[`debug`](/docs/api/browser/debug)コマンドを使用してテスト内で利用する方法です。このコマンドが呼び出されるとブラウザが停止し、アプリケーション（例：開発者ツール）に入り込んだり、コマンドラインからブラウザを操作したりできるようになります。これは、一部のコマンドが期待どおりに特定のアクションをトリガーしない場合に役立ちます。REPLを使えば、コマンドを試して、どれが最も確実に動作するかを確認できます。