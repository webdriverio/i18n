---
id: typescript
title: TypeScriptのセットアップ
---

[TypeScript](http://www.typescriptlang.org)を使用してテストを書くことで、自動補完と型安全性を得ることができます。

[`tsx`](https://github.com/privatenumber/tsx)を`devDependencies`にインストールする必要があります：

```bash npm2yarn
$ npm install tsx --save-dev
```

WebdriverIOは、これらの依存関係がインストールされているかを自動的に検出し、設定とテストをコンパイルします。WDIOの設定と同じディレクトリに`tsconfig.json`を配置してください。

#### カスタムTSConfig

`tsconfig.json`に別のパスを設定する必要がある場合は、TSCONFIG_PATH環境変数に希望のパスを設定するか、wdio設定の[tsConfigPath設定](/docs/configurationfile)を使用してください。

あるいは、`tsx`の[環境変数](https://tsx.is/dev-api/node-cli#custom-tsconfig-json-path)を使用することもできます。

#### 型チェック

`tsx`は型チェックをサポートしていないことに注意してください - 型をチェックしたい場合は、`tsc`を使用して別のステップでこれを行う必要があります。

## フレームワークのセットアップ

`tsconfig.json`には以下が必要です：

```json title="tsconfig.json"
{
    "compilerOptions": {
        "types": ["node", "@wdio/globals/types"]
    }
}
```

`webdriverio`や`@wdio/sync`を明示的にインポートすることは避けてください。
`WebdriverIO`と`WebDriver`の型は、`tsconfig.json`の`types`に追加すれば、どこからでもアクセスできます。追加のWebdriverIOサービス、プラグイン、または`devtools`自動化パッケージを使用する場合は、それらも`types`リストに追加してください。多くの場合、追加の型定義が提供されます。

## フレームワークの型

使用するフレームワークに応じて、そのフレームワークの型を`tsconfig.json`の`types`プロパティに追加し、その型定義をインストールする必要があります。これは、組み込みのアサーションライブラリ[`expect-webdriverio`](https://www.npmjs.com/package/expect-webdriverio)の型サポートを持ちたい場合に特に重要です。

例えば、Mochaフレームワークを使用する場合、`@types/mocha`をインストールし、以下のように追加して、すべての型をグローバルに利用できるようにする必要があります：

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
        "types": ["node", "@wdio/globals/types", "@wdio/jasmine-framework"]
    }
}
```

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

ブラウザスコープにコマンドを追加するサービスを使用する場合は、それらも`tsconfig.json`に含める必要があります。例えば、`@wdio/lighthouse-service`を使用する場合は、それも`types`に追加してください：

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

サービスとレポーターをTypeScript設定に追加することで、WebdriverIO設定ファイルの型安全性も強化されます。

## 型定義

WebdriverIOコマンドを実行する際、通常はすべてのプロパティが型付けされているため、追加の型をインポートする必要はありません。ただし、変数を事前に定義したい場合があります。これらが型安全であることを確認するために、[`@wdio/types`](https://www.npmjs.com/package/@wdio/types)パッケージで定義されているすべての型を使用できます。例えば、`webdriverio`のリモートオプションを定義したい場合は、次のようにします：

```ts
import type { Options } from '@wdio/types'

// 型を直接インポートしたい例
const remoteConfig: Options.WebdriverIO = {
    hostname: 'http://localhost',
    port: '4444' // エラー: Type 'string' is not assignable to type 'number'.ts(2322)
    capabilities: {
        browserName: 'chrome'
    }
}

// その他の場合、`WebdriverIO`名前空間を使用できます
export const config: WebdriverIO.Config = {
  ...remoteConfig
  // その他の設定オプション
}
```

## ヒントとコツ

### コンパイルとリント

完全に安全を期すためには、ベストプラクティスに従うことを検討してください：TypeScriptコンパイラ（`tsc`または`npx tsc`を実行）でコードをコンパイルし、[eslint](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin)を[プリコミットフック](https://github.com/typicode/husky)で実行します。