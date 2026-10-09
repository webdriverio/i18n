---
id: console-logs
title: コンソールログ
description: "テスト実行中にDevToolsが記録したブラウザのコンソールメッセージとWebdriverIOフレームワークのログを取得・確認します。"
---

テスト実行中のブラウザのコンソール出力をすべて取得して確認できます。DevToolsは、アプリケーションからのコンソールメッセージ（`console.log()`、`console.warn()`、`console.error()`、`console.info()`、`console.debug()`）に加え、`wdio.conf.ts`で設定された`logLevel`に基づいてWebDriverIOフレームワークのログも記録します。

**機能:**
- テスト実行中のコンソールメッセージをリアルタイムで取得
- ブラウザのコンソールログ（log、warn、error、info、debug）
- 設定された`logLevel`（trace、debug、info、warn、error、silent）でフィルタリングされたWebDriverIOフレームワークのログ
- 各メッセージがいつ記録されたかを正確に示すタイムスタンプ
- コンテキストを把握しやすいよう、テストステップやブラウザのスクリーンショットと並べてコンソールログを表示

**設定:**
```js
// wdio.conf.ts
export const config = {
    // ログの詳細レベル: trace | debug | info | warn | error | silent
    logLevel: 'info', // 取得するフレームワークログを制御します
    // ...
};
```

これにより、JavaScriptエラーのデバッグ、アプリケーションの動作の追跡、テスト実行中のWebDriverIOの内部動作の確認が簡単に行えます。

## デモ

### >_ コンソールログ
![Console Logs](/img/devtools/console-logs.gif)