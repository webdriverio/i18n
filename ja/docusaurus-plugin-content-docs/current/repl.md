---
id: repl
title: REPLインターフェース
---

WebdriverIOは`v4.5.0`から[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)インターフェースを導入し、フレームワークAPIの学習だけでなく、テストのデバッグや検査にも役立ちます。これはさまざまな方法で使用できます。

まず、`npm install -g @wdio/cli`をインストールしてCLIコマンドとして使用し、コマンドラインからWebDriverセッションを起動できます。例：

```sh
wdio repl chrome
```

これにより、REPLインターフェースで制御できるChromeブラウザが開きます。セッションを開始するには、ポート`4444`でブラウザドライバーが実行されていることを確認してください。[Sauce Labs](https://saucelabs.com)（または他のクラウドベンダー）アカウントをお持ちの場合は、次のようにコマンドラインで直接クラウド上のブラウザを実行することもできます：

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY
```

ドライバーが9515などの異なるポートで実行されている場合は、コマンドライン引数--portまたはエイリアス-pで指定できます

```sh
wdio repl chrome -u $SAUCE_USERNAME -k $SAUCE_ACCESS_KEY -p 9515
```

Replは、webdriverIO設定ファイルの機能を使用して実行することもできます。Wdioはcapabilitiesオブジェクト、またはマルチリモート機能リストやオブジェクトをサポートしています。

設定ファイルがcapabilitiesオブジェクトを使用している場合は、設定ファイルへのパスを渡すだけです。マルチリモート機能の場合は、位置引数を使用してリストまたはマルチリモートからどの機能を使用するかを指定します。注：リストの場合、ゼロベースのインデックスを考慮します。

### 例

capability配列を使用したWebdriverIO：

```ts title="wdio.conf.ts example"
export const config = {
    // ...
    capabilities:[{
        browserName: 'chrome', // options: `chrome`, `edge`, `firefox`, `safari`, `chromium`
        browserVersion: '27.0', // browser version
        platformName: 'Windows 10' // OS platform
    }]
}
```

```sh
wdio repl "./path/to/wdio.config.js" 0 -p 9515
```

[マルチリモート](https://webdriver.io/docs/multiremote/)機能オブジェクトを使用したWebdriverIO：

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

またはAppiumを使用してローカルモバイルテストを実行する場合：

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

これにより、接続されているデバイス/エミュレータ/シミュレータ上でChrome/Safariセッションが開きます。セッションを開始するには、ポート`4444`でAppiumが実行されていることを確認してください。

```sh
wdio repl './path/to/your_app.apk'
```

これにより、接続されているデバイス/エミュレータ/シミュレータ上でアプリセッションが開きます。セッションを開始するには、ポート`4444`でAppiumが実行されていることを確認してください。

iOSデバイスの機能は、引数で渡すことができます：

* `-v`      - `platformVersion`: Android/iOSプラットフォームのバージョン
* `-d`      - `deviceName`: モバイルデバイスの名前
* `-u`      - `udid`: 実機用のudid

使用法：

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

REPLセッションで利用可能なオプション（`wdio repl --help`を参照）を適用できます。

![WebdriverIO REPL](https://webdriver.io/img/repl.gif)

REPLを使用するもう一つの方法は、テスト内で[`debug`](/docs/api/browser/debug)コマンドを使用することです。これにより、呼び出されたときにブラウザが停止し、アプリケーション（開発ツールなど）にジャンプしたり、コマンドラインからブラウザを制御したりできます。これは、一部のコマンドが期待どおりに特定のアクションをトリガーしない場合に役立ちます。REPLを使用すると、最も確実に機能するコマンドを試すことができます。