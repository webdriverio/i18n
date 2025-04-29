---
id: wdio-intercept-service
title: インターセプトサービス
custom_edit_url: https://github.com/webdriverio-community/wdio-intercept-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-intercept-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/webdriverio-community/wdio-intercept-service) | [npm](https://www.npmjs.com/package/wdio-intercept-service)をご覧ください

🕸 [webdriver.io](http://webdriver.io/)でHTTP ajaxコールをキャプチャして検証する

[![Tests](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml/badge.svg)](https://github.com/webdriverio-community/wdio-intercept-service/actions/workflows/test.yaml) [![Join the chat on Discord](https://img.shields.io/discord/1097401827202445382?logo=discord&logoColor=FFFFFF&color=5865F2)](https://discord.webdriver.io/)

これは[webdriver.io](http://webdriver.io/)のプラグインです。まだご存知ない方は、チェックしてみてください。とても優れています。

seleniumとwebdriverはe2e、特にUIテスト用に使用されていますが、クライアントコードによって行われるHTTPリクエストを評価したい場合があるかもしれません（例：メトリクスやトラッキングコールのように、UIからの即時フィードバックがない場合）。wdio-intercept-serviceを使用すると、あるユーザーアクション（例：ボタンプレスなど）によって開始されたajax HTTPコールをインターセプトし、リクエストと対応するレスポンスについて後でアサーションを行うことができます。

ただし、1つ注意点があります：ページ読み込み時に開始されるHTTPコール（ほとんどのSPAのように）はインターセプトできません。これは、ページが読み込まれた後にのみ行うことができるセットアップ作業が必要なためです（seleniumの制限による）。**つまり、テスト内で開始されたリクエストのみをキャプチャできます。**それで問題なければ、このプラグインはあなたに適しているかもしれないので、続きをお読みください。

## 前提条件

* webdriver.io **v5.x**以降

**注意！webdriver.io v4をまだ使用している場合は、このプラグインのv2.xブランチを使用してください！**

## インストール

```shell
npm install wdio-intercept-service -D
```

## 使用方法

### WebDriver CLIでの使用

`wdio.conf.js`にwdio-intercept-serviceを追加するだけのはずです：

```javascript
exports.config = {
  // ...
  services: ['intercept']
  // ...
};
```

これで準備完了です。

### WebDriver Standaloneでの使用

WebdriverIO Standaloneを使用する場合、`before`と`beforeTest` / `beforeScenario`関数を手動で呼び出す必要があります。

```javascript
import { remote } from 'webdriverio';
import WebdriverAjax from 'wdio-intercept-service'

const WDIO_OPTIONS = {
  port: 9515,
  path: '/',
  capabilities: {
    browserName: 'chrome'
  },
}

let browser;
const interceptServiceLauncher = WebdriverAjax();

beforeAll(async () => {
  browser = await remote(WDIO_OPTIONS)
  interceptServiceLauncher.before(null, null, browser)
})

beforeEach(async () => {
  interceptServiceLauncher.beforeTest()
})

afterAll(async () => {
  await client.deleteSession()
});

describe('', async () => {
  ... // See example usage
});
```

初期化後、関連する関数がブラウザコマンドチェーンに追加されます（[API](#api)を参照）。

## クイックスタート

使用例：

```javascript
browser.url('http://foo.bar');
browser.setupInterceptor(); // ajaxコールをキャプチャ
browser.expectRequest('GET', '/api/foo', 200); // ステータスコード200で/api/fooへのGETリクエストを期待
browser.expectRequest('POST', '/api/foo', 400); // ステータスコード400で/api/fooへのPOSTリクエストを期待
browser.expectRequest('GET', /\/api\/foo/, 200); // 正規表現を使ってURLを検証することもできます
browser.click('#button'); // ajaxリクエストを開始するボタン
browser.pause(1000); // リクエストが完了するまで少し待つかもしれません
browser.assertRequests(); // リクエストを検証
```

リクエストの詳細を取得：

```javascript
browser.url('http://foo.bar')
browser.setupInterceptor();
browser.click('#button')
browser.pause(1000);

var request = browser.getRequest(0);
assert.equal(request.method, 'GET');
assert.equal(request.response.headers['content-length'], '42');
```

## サポートされているブラウザ

比較的新しいバージョンのすべてのブラウザで動作するはずです。お使いのブラウザで動作しない場合は、問題を報告してください。

## API

完全な構文については、WebdriverIOブラウザオブジェクトに追加されたカスタムコマンドのTypeScript宣言ファイルを参照してください。一般に、パラメータとして「options」オブジェクトを取るメソッドは、デフォルトの動作を得るためにそのパラメータなしで呼び出すことができます。これらの「オプションのオプション」オブジェクトには `?: = {}` が続き、推測されるデフォルト値は各メソッドに記述されています。

### オプションの説明

このライブラリは、コマンドを発行するときに少量の設定を提供します。複数のメソッドで使用される設定オプションはここで説明されています（特定のサポートを判断するには各メソッド定義を参照してください）。

* `orderBy` (`'START' | 'END'`): このオプションは、インターセプタによってキャプチャされたリクエストの順序をテストに返す際の制御をします。このライブラリの既存バージョンとの後方互換性のため、デフォルトの順序は `'END'` で、これはリクエストが完了した時間に対応します。`orderBy` オプションを `'START'` に設定すると、リクエストは開始された時間に従って並べられます。
* `includePending` (`boolean`): このオプションは、まだ完了していないリクエストを返すかどうかを制御します。このライブラリの既存バージョンとの後方互換性のため、デフォルト値は `false` であり、完了したリクエストのみが返されます。

### browser.setupInterceptor()

ブラウザでajaxコールをキャプチャします。後でリクエストを評価するには、常にセットアップ関数を呼び出す必要があります。

### browser.disableInterceptor()

ブラウザでのajaxコールのさらなるキャプチャを防止します。キャプチャされたすべてのリクエスト情報が削除されます。ほとんどのユーザーはインターセプタを無効にする必要はありませんが、テストが特に長時間実行されるか、セッションストレージの容量を超える場合、インターセプタを無効にすると役立ちます。

### `browser.excludeUrls(urlRegexes: (string | RegExp)[])`

特定のURLからのリクエストが記録されるのを除外します。文字列または正規表現の配列を受け取ります。ストレージに書き込む前に、
リクエストのURLを各文字列または正規表現に対してテストします。一致した場合、リクエストはストレージに書き込まれません。disableInterceptorと同様に、
セッションストレージが容量を超える問題が発生した場合に役立ちます。

### browser.expectRequest(method: string, url: string, statusCode: number)

テスト中に開始されるajaxリクエストについての期待を設定します。連鎖させることができます（そうすべきです）。期待の順序は、行われるリクエストの順序にマッピングする必要があります。

* `method` (`String`): 期待されるHTTPメソッド。`xhr.open()` が最初の引数として受け付けるものなら何でも可能です。
* `url` (`String`|`RegExp`): リクエストで呼び出される正確なURLを文字列または一致する正規表現として指定
* `statusCode` (`Number`): レスポンスの期待されるステータスコード

### browser.getExpectations()

ヘルパーメソッド。その時点までに設定したすべての期待を返します

### browser.resetExpectations()

ヘルパーメソッド。その時点までに設定したすべての期待をリセットします

### `browser.assertRequests({ orderBy?: 'START' | 'END' }?: = {})`

期待されるすべてのajaxリクエストが完了したら、このメソッドを呼び出します。期待と実際に行われたリクエストを比較し、次のことを検証します：

- 行われたリクエストの数
- リクエストの順序
- メソッド、URL、ステータスコードが各リクエストと一致すること
- オプションオブジェクトのデフォルトは `{ orderBy: 'END' }` で、v4.1.10以前の動作と一致するようにリクエストが完了した時間を基準とします。`orderBy` オプションが `'START'` に設定されている場合、リクエストはページによって開始された時間で順序付けられます。

### `browser.assertExpectedRequestsOnly({ inOrder?: boolean, orderBy?: 'START' | 'END' }?: = {})`

`browser.assertRequests`と同様ですが、すべてのネットワークリクエストをマップする必要なく、`expectRequest`ディレクティブで指定したリクエストのみを検証します。`inOrder`オプションが `true`（デフォルト）の場合、リクエストは`expectRequest`でセットアップされたのと同じ順序で見つかることが期待されます。

### `browser.getRequest(index: number, { includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

特定のリクエストについてより高度なアサーションを行うために、特定のリクエストの詳細を取得できます。アクセスしたいリクエストの0ベースのインデックスを提供する必要があります。デフォルトではリクエストが完了した順序で、または（`orderBy: 'START'`オプションを渡すことで）開始された順序で並べられます。

* `index` (`number`): アクセスしたいリクエストの番号
* `options` (`object`): 設定オプション
* `options.includePending` (`boolean`): まだ完了していないリクエストを返すかどうか。デフォルトではfalseで、v4.1.10以前のライブラリの動作と一致します。
* `options.orderBy` (`'START' | 'END'`): リクエストをどのように順序付けるか。デフォルトでは `'END'` で、v4.1.10以前のライブラリの動作と一致します。`'START'` の場合、リクエストはリクエスト完了時間ではなく開始時間で順序付けられます。（保留中のリクエストはまだ完了していないため、`'END'` で順序付ける場合、すべての保留中のリクエストはすべての完了したリクエストの後に来ます。）

**戻り値** `request` オブジェクト：

* `request.url`: リクエストされたURL
* `request.method`: 使用されたHTTPメソッド
* `request.body`: リクエストで使用されたペイロード/ボディデータ
* `request.headers`: リクエストHTTPヘッダーをJSオブジェクトとして
* `request.pending`: このリクエストが完了したかどうか（つまり、`response`プロパティがあるか）、または進行中かのブールフラグ。
* `request.response`: リクエストが完了した場合（つまり`request.pending === false`）のみ存在する、レスポンスに関するデータを含むJSオブジェクト。
* `request.response?.headers`: レスポンスHTTPヘッダーをJSオブジェクトとして
* `request.response?.body`: レスポンスボディ（可能であればJSONとして解析されます）
* `request.response?.statusCode`: レスポンスステータスコード

**`request.body`に関する注意：** wdio-intercept-serviceはリクエストボディを次のように解析しようとします：

* 文字列：そのまま文字列を返します（`'value'`）
* JSON：`JSON.parse()`を使用してJSONオブジェクトを解析します（`({ key: value })`）
* FormData：FormDataを`{ key: [value1, value2, ...] }`形式で出力します
* ArrayBuffer：バッファを文字列に変換しようとします（実験的）
* その他：データに対して過酷な`JSON.stringify()`を使用します。幸運を祈ります！

**`fetch` APIについては、文字列とJSONデータのみをサポートしています！**

### `browser.getRequests({ includePending?: boolean, orderBy?: 'START' | 'END' }?: = {})`

`getRequest`と同じオプションのオプションをサポートして、キャプチャされたすべてのリクエストを配列として取得します。

**戻り値** `request`オブジェクトの配列。

### browser.hasPendingRequests()

HTTPリクエストがまだ保留中かどうかを確認するユーティリティメソッド。テストが適切な時間内にすべてのリクエストが完了したことを確認するため、または`getRequests()`や`assertRequests()`の呼び出しが望ましいすべてのHTTPリクエストを含むことを確認するために使用できます。

**戻り値** ブール値

## TypeScriptサポート

このプラグインは独自のTS型を提供しています。[ここ](https://webdriver.io/docs/typescript.html#framework-types)で説明されているように、tsconfigを型拡張に指定するだけです：

```
"compilerOptions": {
    // ..
    "types": ["node", "webdriverio", "wdio-intercept-service"]
},
```

## テストの実行

テストをローカルで実行するには、最新バージョンのChromeとFirefoxが必要です。システムにインストールされているバージョンに合わせて`chromedriver`と`geckodriver`の依存関係を更新する必要があるかもしれません。

```shell
npm test
```

## 貢献

あらゆる貢献を歓迎します。issueを開くか、直接PRを提出してください。
このインターセプターライブラリはInternet Explorerなどのレガシーブラウザでも動作するように書かれていることに注意してください。そのため、`lib/interceptor.js`で使用されるコードは、少なくともInternet ExplorerのJavaScriptランタイムで解析可能である必要があります。

## ライセンス

MIT
```