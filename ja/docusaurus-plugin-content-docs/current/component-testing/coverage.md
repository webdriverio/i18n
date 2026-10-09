---
id: coverage
title: カバレッジ
description: "ブラウザランナーを使用してコンポーネントテストのコードカバレッジを収集します。ブラウザランナーはViteを通じてistanbulでコードをインストルメント化します。"
---

WebdriverIOのブラウザランナーは、[`istanbul`](https://istanbul.js.org/)を使用したコードカバレッジレポートをサポートしています。テストランナーはViteを使用してコードを自動的にインストルメント化し、コードカバレッジを取得します。

## 仕組み

`@wdio/browser-runner`はViteを使用してアプリケーションを配信します。カバレッジを有効にすると、Viteサーバーにプラグインが追加され、ブラウザからリクエストされたソースコードをその場でインストルメント化しようとします。

:::warning 重要
**テストランナーから別のページへ移動しないでください！**

コードカバレッジは、WebdriverIOによって起動されたローカルのViteサーバーがファイルを配信し、インストルメント化することに依存しています。
`browser.url('http://...')`や`browser.url('file://...')`を使用して別のページに移動すると、インストルメント化された環境から離れることになります。コードは実行されますが、**カバレッジは収集されません**。

**正しいアプローチ（コンポーネントテスト）：**
テストファイル内でコンポーネントを直接レンダリングするか、モジュールを直接インポートしてください。

```js
import { myFunction } from '../src/utils.js'

it('should cover my function', () => {
    myFunction() // これはカバーされます
})
```

**誤ったアプローチ（E2Eスタイル）：**
```js
it('will not have coverage', async () => {
    // ❌ 別のページへ移動するとインストルメント化が機能しなくなります
    await browser.url('http://localhost:3000')
})
```
:::

## セットアップ

コードカバレッジレポートを有効にするには、WebdriverIOのブラウザランナー設定で有効にします。例：

```js title=wdio.conf.js
export const config = {
    // ...
    runner: ['browser', {
        preset: process.env.WDIO_PRESET,
        coverage: {
            enabled: true
        }
    }],
    // ...
}
```

適切な設定方法については、すべての[カバレッジオプション](/docs/runner#coverage-options)を確認してください。

:::tip 設定のヒント
標準的でないファイル（`.html`内のインラインスクリプトなど）をテストする場合や、ファイルが認識されない場合は、`include`および`extension`オプションを明示的に確認する必要があるかもしれません：

```js
coverage: {
    enabled: true,
    // デフォルトの解決が失敗する場合は、ソースファイルを明示的に指定します
    include: ['src/**/*.js', 'src/**/*.vue'],
    // インラインスクリプトがある場合は.htmlを追加します
    extension: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.html']
}
```
:::

## コードの除外

コードベースの一部のセクションを意図的にカバレッジ追跡から除外したい場合があります。その場合は、次のパースヒントを使用できます：

- `/* istanbul ignore if */`：次のif文を無視します。
- `/* istanbul ignore else */`：if文のelse部分を無視します。
- `/* istanbul ignore next */`：ソースコード内の次の要素（関数、if文、クラスなど何でも）を無視します。
- `/* istanbul ignore file */`：ソースファイル全体を無視します（ファイルの先頭に配置する必要があります）。

:::info

`execute`コマンドを呼び出す際などにエラーが発生する可能性があるため、テストファイルはカバレッジレポートから除外することをお勧めします。レポートに含めたい場合は、次のようにしてそれらがインストルメント化されないようにしてください：

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::