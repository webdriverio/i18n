---
id: wdio-wiremock-service
title: WireMock サービス
custom_edit_url: https://github.com/erwinheitzman/wdio-wiremock-service/edit/master/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-wiremock-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/erwinheitzman/wdio-wiremock-service) | [npm](https://www.npmjs.com/package/wdio-wiremock-service)をご覧ください

[![downloads](https://img.shields.io/npm/dm/wdio-wiremock-service.svg)](https://www.npmjs.com/package/wdio-wiremock-service)


このサービスは、[WebdriverIO](https://webdriver.io)でテストを実行する際に[WireMock](http://wiremock.org/)をシームレスに実行するのに役立ちます。よく知られている[Maven](https://mvnrepository.com/repos/central)リポジトリを使用してWireMock jarをダウンロードし、自動的にインストール、起動、停止します。ヘルプとサポートのために[Gitter](https://gitter.im/erwinheitzman/wdio-wiremock-service)のコミュニティに参加して最新情報を入手してください。

## インストール

```bash
npm i -D wdio-wiremock-service
```

`WebdriverIO`のインストール方法については[こちら](https://webdriver.io/docs/gettingstarted.html)をご覧ください。

## 使用方法

ルートディレクトリ（デフォルトは`./mock`）には、フィクスチャとモックに使用される`__files`と`mappings`という2つのサブディレクトリがあります。

詳細については、[WireMockの公式ドキュメント](https://wiremock.org/docs/standalone/)をご確認ください。

## 設定

wdioテストランナーでサービスを使用するには、サービス配列に追加する必要があります：

```js
// wdio.conf.js
export.config = {
  // ...
  services: ['wiremock'],
  // ...
};
```

webdriverioをスタンドアロンで使用する場合は、サービスを追加して`onPrepare`と`onComplete`フックを手動でトリガーする必要があります。例は[こちら](####webdriverio-standalone)にあります（この例では[Jest](https://jestjs.io/en/)を使用しています）：

## オプション

以下のオプションをサービスに追加できます。

### port

WireMockが実行されるポート。

タイプ: `Number`

デフォルト: `8080`

例:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { port: 8181 }]],
	// ...
};
```

### rootDir

WireMockがファイルを検索するパス。

タイプ: `String`

デフォルト: `./mock`

例:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { rootDir: './mock' }]],
	// ...
};
```

### version

ダウンロードして使用するWireMockのバージョン。

タイプ: `String`

デフォルト: `3.3.1`

例:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { version: '2.25.1' }]],
	// ...
};
```

### skipWiremockInstall

WireMockのダウンロードをスキップするようサービスに指示します。

タイプ: `Boolean`

デフォルト: false

例:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { skipWiremockInstall: true }]],
	// ...
};
```

### binPath

ローカルのWiremockバイナリへのカスタムパス（多くの場合、skipWiremockInstallと組み合わせて使用されます）。

タイプ: `String`

デフォルト: './wiremock-standalone-3.0.0.jar'（サービスからの相対パス）

例:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { binPath: './my-custom/example-path/wiremock-standalone-3.0.0.jar' }]],
	// ...
};
```

### silent

WireMockの出力（サービス自体からの追加ログを含む）のサイレントモード。

タイプ: `Boolean`

デフォルト: `false`

例:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { silent: true }]],
	// ...
};
```

### mavenBaseUrl

Mavenのベースダウンロード URL。

タイプ: `String`

デフォルト: `https://repo1.maven.org/maven2`

例:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [['wiremock', { mavenBaseUrl: 'https://repo1.maven.org/maven2' }]],
	// ...
};
```

### args

WireMockの設定でサポートされているすべての引数を渡すことができるリスト。

注意：オプション（`port`、`rootDir`、`stdio`、`mavenBaseUrl`）はここで渡すことはできません。無視されます。

タイプ: `Array`

例:

```js
// wdio.conf.js
export const config = {
	// ...
	services: [
		[
			'wiremock',
			{
				args: ['--verbose', '--match-headers'],
			},
		],
	],
	// ...
};
```

### テストの作成

最初のテストを書くのは非常に簡単です：

#### WDIOテストランナーを使用する

```js
import fetch from 'node-fetch'; // 好きなHTTPクライアントを使用できます
import { equal } from 'node:assert'; // 好きなアサーションライブラリを使用できます

describe('example', () => {
	it(`should assert the mock data`, async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

#### WebdriverIOスタンドアロンを使用する

```js
import fetch from 'node-fetch'; // 好きなHTTPクライアントを使用できます
import { equal } from 'node:assert'; // 好きなアサーションライブラリを使用できます
import { remote } from 'webdriverio';
import { launcher } from 'wdio-wiremock-service';

const WDIO_OPTIONS = {
	capabilities: {
		browserName: 'chrome',
	},
};

describe('example', () => {
	let wiremockLauncher;
	let client;

	beforeAll(async () => {
		wiremockLauncher = new launcher(); // サービスのインスタンスを作成
		await wiremockLauncher.onPrepare(WDIO_OPTIONS); // onPrepareフックを実行
		client = await remote(WDIO_OPTIONS);
	});

	afterAll(async () => {
		await client.deleteSession();
		await wiremockLauncher.onComplete(); // onCompleteフックを実行
	});

	test('should showoff a mocked api response', async () => {
		const body = await fetch('http://localhost:8080/api/mytest');
		equal(body.text(), 'Hello world!');
	});
});
```

WebdriverIOの詳細については、[ホームページ](https://webdriver.io)をご覧ください。