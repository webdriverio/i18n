---
id: multi-framework-support
title: マルチフレームワークサポート
description: "フレームワーク固有の設定なしで、Mocha、Jasmine、またはCucumberでDevToolsサービスを使用できます。"
---

DevToolsは、フレームワーク固有の設定を必要とせずに、Mocha、Jasmine、Cucumberで自動的に動作します。WebDriverIOの設定にサービスを追加するだけで、使用しているテストフレームワークに関係なく、すべての機能がシームレスに動作します。

**サポートされているフレームワーク:**
- **Mocha** - grepフィルタリングによるテストレベルおよびスイートレベルの実行
- **Jasmine** - grepベースのフィルタリングによる完全な統合
- **Cucumber** - feature:line指定によるシナリオレベルおよびexampleレベルの実行

同じデバッグインターフェース、テストの再実行、および可視化機能が、すべてのフレームワークで一貫して動作します。

## 設定

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // または 'jasmine' または 'cucumber'
    services: ['devtools'],
    // ...
};
```