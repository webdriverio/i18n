---
id: coverage
title: カバレッジ
---

WebdriverIOのブラウザランナーは[`istanbul`](https://istanbul.js.org/)を使用したコードカバレッジレポートをサポートしています。テストランナーは自動的にコードをインストルメント化し、コードカバレッジを捕捉します。

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

適切に設定する方法については、すべての[カバレッジオプション](/docs/runner#coverage-options)をチェックしてください。

## コードの除外

コードベースの一部をカバレッジ追跡から意図的に除外したい場合があります。そのためには、以下のパース用ヒントを使用できます：

- `/* istanbul ignore if */`: 次のif文を無視します。
- `/* istanbul ignore else */`: if文のelse部分を無視します。
- `/* istanbul ignore next */`: ソースコード内の次のもの（関数、if文、クラスなど）を無視します。
- `/* istanbul ignore file */`: ソースファイル全体を無視します（これはファイルの先頭に配置する必要があります）。

:::info

テストファイルはカバレッジレポートから除外することが推奨されます。これはエラーの原因になる可能性があります（例：`execute`や`executeAsync`コマンドを呼び出す場合）。レポートにテストファイルを含めたい場合は、次のようにインストルメント化から除外してください：

```ts
await browser.execute(/* istanbul ignore next */() => {
    // ...
})
```

:::