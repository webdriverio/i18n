---
id: console-logs
title: コンソールログ
---

テスト実行中のブラウザコンソール出力をすべてキャプチャして検査します。DevToolsはアプリケーションからのコンソールメッセージ（`console.log()`、`console.warn()`、`console.error()`、`console.info()`、`console.debug()`）および`wdio.conf.ts`で設定された`logLevel`に基づいたWebDriverIOフレームワークのログを記録します。

**機能：**
- テスト実行中のリアルタイムコンソールメッセージのキャプチャ
- ブラウザコンソールログ（log、warn、error、info、debug）
- 設定された`logLevel`（trace、debug、info、warn、error、silent）でフィルタリングされたWebDriverIOフレームワークのログ
- 各メッセージがログに記録された正確な時間を示すタイムスタンプ
- テストステップとブラウザスクリーンショットと共に表示されるコンソールログによるコンテキスト

**設定：**
```js
// wdio.conf.ts
export const config = {
    // ログの詳細レベル: trace | debug | info | warn | error | silent
    logLevel: 'info', // キャプチャされるフレームワークログを制御します
    // ...
};
```

これにより、JavaScriptエラーのデバッグ、アプリケーション動作の追跡、テスト実行中のWebDriverIOの内部操作の確認が簡単になります。

## デモ

### >_ コンソールログ
![Console Logs](./demo/console-logs.gif)