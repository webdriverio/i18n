---
id: sauce-service
title: Sauce サービス
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/wdio-sauce-service/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Sauce Labs へのより良い統合を提供する WebdriverIO サービスです。このサービスは以下に使用できます：

- Sauce Labs 仮想マシンクラウド（デスクトップWeb/エミュレータ/シミュレータ）
- Sauce Labs 実機クラウド（iOS および Android）

ジョブのメタデータ（'name'*、'passed'、'tags'、'public'、'build'、'custom-data'）を更新し、必要に応じて Sauce Connect を実行します。

このサービスが他にも提供する機能：

- デフォルトでは、Sauce サービスはジョブの開始時に 'name' を更新します。これにより、任意のタイミングで名前を更新するオプションが得られます。
- `setJobName` パラメータを定義して、使用している機能、オプション、スイートタイトルに応じてジョブ名をカスタマイズできます
- Sauce サービスは失敗したテストのエラースタックを Sauce Labs のコマンドタブにプッシュします
- [Sauce Connect](https://docs.saucelabs.com/secure-connections/) を自動的に設定して起動することができます
- コマンドリストにコンテキストポイントを設定し、どのテストでどのコマンドが実行されたかを識別します

## インストール

最も簡単な方法は、`@wdio/sauce-service` を `package.json` の devDependency として維持することです：

```sh
npm install @wdio/sauce-service --save-dev
```

`WebdriverIO` のインストール方法は[こちら](https://webdriver.io/docs/gettingstarted)で確認できます。

## 設定

仮想デスクトップ/エミュレータ/シミュレータマシンおよび実機クラウド用にサービスを利用するには、`wdio.conf.js` ファイルで `user` と `key` を設定する必要があります。これにより自動的に Sauce Labs を使用して統合テストを実行します。Sauce Labs でテストを実行する場合、`region` プロパティを通じてテストを実行するリージョンを指定できます。リージョンの短縮表記は `us`（デフォルト）と `eu` です。これらのリージョンは Sauce Labs VM クラウドと Sauce Labs 実機クラウドで使用されます。リージョンを指定しない場合、デフォルトで `us` が使用されます。

WebdriverIO が自動的に [Sauce Connect](https://docs.saucelabs.com/secure-connections/#sauce-connect-proxy) トンネルを起動するようにしたい場合は、`sauceConnect: true` を設定する必要があります。データセンターを EU に変更したい場合は `region:'eu'` を追加してください（US データセンターがデフォルトに設定されています）。

```js
// wdio.conf.js
export const config = {
    // ...
    user: process.env.SAUCE_USERNAME,
    key: process.env.SAUCE_ACCESS_KEY,
    region: 'us', // または 'eu'
    services: [
        ['sauce', {
            sauceConnect: true,
            sauceConnectOpts: {
                // ...
            }
        }]
    ],
    // ...
};
```

既存の Sauce Connect トンネルを使用したい場合は、`tunnelName` を提供するだけで済みます。共有トンネルを使用していて、トンネルを作成したユーザーではない場合は、テストでそのトンネルを使用するために、トンネルを作成した Sauce Labs ユーザーを識別する必要があります。次のように機能に `tunnelOwner` を含めてください：

<Tabs
  defaultValue="tunnelname"
  values={[
    {label: 'Tunnel Name', value: 'tunnelname'},
    {label: 'Tunnel Owner', value: 'tunnelowner'}
  ]
}>
<TabItem value="tunnelname">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'YourTunnelName',

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
<TabItem value="tunnelowner">

```js
export const config = {
    // ...
    {
        browserName: 'chrome',
        platformName: 'Windows 10',
        browserVersion: 'latest',
        // Sauce options can be found here https://docs.saucelabs.com/dev/test-configuration-options/
        'sauce:options': {
            tunnelName: 'TunnelName',
            tunnelOwner: '<username of owner>,

            // Example options
            build: 'your-build-name',
            screenResolution: '1600x1200',
            // ...
        },
    },
    // ...
};
```

</TabItem>
</Tabs>

## Sauce サービスオプション

Sauce Labs サービスを認証するには、設定に [`user`](https://webdriver.io/docs/options#user) と [`key`](https://webdriver.io/docs/options#key) オプションが含まれている必要があります。

### maxErrorStackLength

このサービスは、テストが失敗した時に自動的にエラースタックを Sauce Labs にプッシュします。デフォルトでは最初の5行のみをプッシュしますが、必要に応じてこれを変更できます。行数が多いほど WebDriver 呼び出しが増え、実行が遅くなる可能性があることに注意してください。

タイプ: `number`<br />
デフォルト: `5`

### sauceConnect

`true` の場合、Sauce Connect を実行し、ブラウザテストを実行している Sauce Labs 仮想マシンとの安全な接続を開きます。

タイプ: `Boolean`<br />
デフォルト: `false`

### sauceConnectOpts

Sauce Connect オプションを適用します（例：ポート番号やログファイル設定を変更するため）。詳細については[このリスト](https://docs.saucelabs.com/dev/cli/sauce-connect-5/run/)を参照してください。

注意: オプションを指定する際は、`--` を省略する必要があります。また、キャメルケース（例：`shared-tunnel` や `sharedTunnel`）に変換することもできます。

タイプ: `Object`<br />
デフォルト: `{ }`

### uploadLogs

`true` の場合、このオプションはすべての WebdriverIO ログファイルを Sauce Labs プラットフォームにアップロードし、さらなる検査を可能にします。ログをファイルに書き込むために wdio 設定で [`outputDir`](https://webdriver.io/docs/options#outputdir) が設定されていることを確認してください。そうでない場合、データは stdout にストリーミングされ、アップロードできません。

タイプ: `Boolean`<br />
デフォルト: `true`

### setJobName

ユーザーが WebdriverIO 設定、使用されている機能、元のスイートタイトルなどのワーカーパラメータに基づいてジョブ名を動的に設定できるようにします。

タイプ: `Function`<br />
デフォルト: `(config, capabilities, suiteTitle) => suiteTitle`

----

## 生成された名前メタデータのオーバーライド

このサービスは、スイート名、ブラウザ名、その他の情報から各テストの名前を自動的に生成します。

desired capability の `name` の値を提供することでこれをオーバーライドできますが、これによりすべてのテストに同じ名前が付けられるという副作用があります。

----

WebdriverIO の詳細については、[ホームページ](https://webdriver.io)を参照してください。