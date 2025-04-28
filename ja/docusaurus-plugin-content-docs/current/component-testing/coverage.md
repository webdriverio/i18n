---
id: coverage
title: カバレッジ
---

WebdriverIOのブラウザランナーは[`istanbul`](https://istanbul.js.org/)を使用したコードカバレッジレポートをサポートしています。テストランナーは自動的にコードを計測し、コードカバレッジを取得します。

## セットアップ

コードカバレッジレポートを有効にするには、WebdriverIOブラウザランナーの設定で有効にします。例：

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

すべての[カバレッジオプション](/docs/runner#coverage-options)をチェックして、適切な設定方法を学んでください。

## コードの除外

コードベースの一部をカバレッジ追跡から意図的に除外したい場合は、次のパース用ヒントを使用できます：

- `/* istanbul ignore if */`：次のif文を無視します。
- `/* istanbul ignore else */`：if文のelse部分を無視します。
- `/* istanbul ignore next */`：ソースコードの次の要素（関数、if文、クラスなど）を無視します。
- `/* istanbul ignore file */`：ソースファイル全体を無視します（これはファイルの先頭に配置する必要があります）。

:::info

テストファイルをカバレッジレポートから除外することをお勧めします。テストファイルを含めると、`execute`や`executeAsync`コマンドを呼び出す際にエラーが発生する可能性があります。レポートにテストファイルを含めたい場合は、次のように計測から除外してください：

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::