---
id: typescript
title: TypeScriptのセットアップ
description: "tsxを使用してTypeScriptでWebdriverIOテストを記述し、tsconfig.jsonを設定して、フレームワーク、サービス、カスタムコマンドの型定義を追加します。"
---

[TypeScript](http://www.typescriptlang.org)を使用してテストを記述することで、自動補完と型安全性を得ることができます。

`devDependencies`に[`tsx`](https://github.com/privatenumber/tsx)をインストールする必要があります。以下のコマンドでインストールできます：

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIOはこれらの依存関係がインストールされているかを自動的に検出し、設定ファイルとテストをコンパイルします。WDIO設定ファイルと同じディレクトリに`tsconfig.json`があることを確認してください。

#### カスタムTSConfig

`tsconfig.json`に別のパスを設定する必要がある場合は、TSCONFIG_PATH環境変数に目的のパスを設定するか、wdio設定の[tsConfigPath設定](/docs/configurationfile)を使用してください。

または、`tsx`の[環境変数](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path)を使用することもできます。


#### 型チェック

`tsx`は型チェックをサポートしていないことに注意してください。型をチェックしたい場合は、`tsc`を使用して別のステップで行う必要があります。

## フレームワークのセットアップ

`tsconfig.json`には以下の設定が必要です：

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

`webdriverio`や`@wdio/sync`を明示的にインポートすることは避けてください。
`tsconfig.json`の`types`に追加すると、`WebdriverIO`と`WebDriver`の型はどこからでもアクセスできるようになります。追加のWebdriverIOサービス、プラグイン、または`devtools`自動化パッケージを使用する場合は、多くのものが追加の型定義を提供しているため、それらも`types`リストに追加してください。

## フレームワークの型

使用するフレームワークに応じて、そのフレームワークの型を`tsconfig.json`のtypesプロパティに追加し、その型定義をインストールする必要があります。これは、組み込みのアサーションライブラリ[`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio)の型サポートを得たい場合に特に重要です。

例えば、Mochaフレームワークを使用する場合は、`@types/mocha`をインストールし、すべての型をグローバルに利用できるように以下のように追加する必要があります：

<Tabs
  defaultValue="mocha"
  values={[
    {label: 'Mocha', value: 'mocha'},
    {label: 'Jasmine', value: 'jasmine'},
    {label: 'Cucumber', value: 'cucumber'},
  ]
}>
<TabItem value="mocha">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/mocha-framework"]
    }
}
```

</TabItem>
<TabItem value="jasmine">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "jasmine", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

`jasmine`は`@types/jasmine`を読み込み、`jasmine`、`spyOn`、`expectAsync`を提供します。`@wdio/jasmine-framework`を使用すると、グローバルな`expect`はJasmineの同期マッチャーに対しては`void`を返し、WebdriverIOマッチャーとJasmineの非同期マッチャーに対しては`Promise`を返します。`expectAsync`にもWebdriverIOマッチャーが含まれています。`expect-webdriverio`の`expect`エクスポートは、Jestマッチャーを保持します。

</TabItem>
<TabItem value="cucumber">

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types", "@wdio/cucumber-framework"]
    }
}
```

</TabItem>
</Tabs>

## サービス

ブラウザスコープにコマンドを追加するサービスを使用する場合は、それらも`tsconfig.json`に含める必要があります。例えば、`@wdio/lighthouse-service`を使用する場合は、以下のように`types`にも追加してください：

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": [
            "node",
            "@wdio/globals/types",
            "@wdio/mocha-framework",
            "@wdio/lighthouse-service"
        ]
    }
}
```

TypeScript設定にサービスとレポーターを追加することで、WebdriverIO設定ファイルの型安全性も強化されます。

## 型定義

WebdriverIOコマンドを実行する際、通常はすべてのプロパティに型が付けられているため、追加の型をインポートする必要はありません。しかし、変数を事前に定義したい場合もあります。これらの型安全性を確保するために、[`@wdio/types`](https://www.npmjs.com/package/@wdio/types)パッケージで定義されているすべての型を使用できます。例えば、`webdriverio`のリモートオプションを定義したい場合は、以下のようにできます：

```ts
import type { Options } from '@wdio/types'

// 型を直接インポートしたい場合の例
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // エラー: 型 'string' を型 'number' に割り当てることはできません。ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// その他の場合は、`WebdriverIO` 名前空間を使用できます
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // その他の設定オプション
}
```

## ヒントとアドバイス

### コンパイルとリント

完全に安全を期すために、ベストプラクティスに従うことを検討してください：TypeScriptコンパイラでコードをコンパイルし（`tsc`または`npx tsc`を実行）、[pre-commitフック](https://github.com/typicode/husky)で[eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)を実行するようにしましょう。