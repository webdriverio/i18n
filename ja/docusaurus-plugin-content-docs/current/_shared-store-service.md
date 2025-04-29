---
id: shared-store-service
title: 共有ストアサービス
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-shared-store-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> メインプロセスとワーカー（スペック）間でデータを交換します。

## インストール

最も簡単な方法は、以下のように`@wdio/shared-store-service`を`package.json`の開発依存関係として保持することです：

```sh
npm install @wdio/shared-store-service --save-dev
```

`WebdriverIO`のインストール方法については[こちら](https://webdriver.io/docs/gettingstarted)をご覧ください。

## 使用方法

キー（文字列）によってストアから値（プレーンオブジェクト）を取得/設定します。キーは、ストア全体を取得するために予約されている`*`を除く任意の文字列にすることができます。

### 値の設定

ストアに値を設定するには：

```js
await browser.sharedStore.set('key', 'foobar123')
```

### 値の取得

ストアから値を取得するには：

```js
const value = await browser.sharedStore.get('key')
console.log(value) // "foobar123"を返します
```

`*`キーを使用して、すべてのキー値を取得することもできます：

```js
const store = await browser.sharedStore.get('*')
console.log(value) // `{ key: "foobar" }`を返します
```

### WDIOフックでのストアへのアクセス

`setValue`と`getValue`の非同期ハンドラに直接アクセスすることもできます。
`await`キーワードを使って適切に呼び出すようにしてください。

```js
// wdio.conf.js
import { setValue, getValue } from '@wdio/shared-store-service'

export const config = {
    // ...
    onPrepare: [async function (config, capabilities) {
        await setValue('foo', 'bar')
    }],
    // ...
    after: async () => {
        const value = await getValue('foo')
        // ...
    }
```

重要！各specファイルは他のspecから原子的かつ分離されているべきです。
このサービスの目的は、非常に特定の環境セットアップの問題に対処することです。
テスト実行データの共有は避けてください！

### リソースプール

ワーカースレッドが各ワーカーに割り当てられるべきリソースを競合する場合、リソースプールAPIを使用できます：

```js
// wdio.conf.js
import { setResourcePool, getValueFromPool, addValueToPool } from '@wdio/shared-store-service'

export const config = {
    maxInstances: 2,
    // ...
    onPrepare: async function (config, capabilities) {
        await setResourcePool('availableUrls', ['url01.com', 'url02.com'])
    },
    // ...
    beforeSession: async (conf) => {
        conf.baseUrl = await getValueFromPool('availableUrls');
    },
    // ...
    afterSession: async (conf) => {
        // ワーカーは使用済みのリソースを次のワーカーが使用できるように返します
        await addValueToPool('availableUrls', conf.baseUrl);
    }
```

この例では、両方のワーカーが同じ`baseUrl`を使用しないようにしています。一意のURLは、それがリリースされるまで1つのワーカーにのみ割り当てられます。

## 設定

サービスリストに`shared-store`を追加すると、テスト内の[`browser`スコープ](https://webdriver.io/docs/api/browser)で`sharedStore`オブジェクトにアクセスできるようになります。

```js
// wdio.conf.js
export const config = {
    // ...
    services: ['shared-store'],
    // ...
};
```

TypeScriptを使用している場合は、`@wdio/shared-store-service`を`compilerOptions.types`に追加してください：

```js
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/shared-store-service"],
    }
}
```