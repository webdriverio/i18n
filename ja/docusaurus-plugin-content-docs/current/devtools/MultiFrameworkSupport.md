---
id: multi-framework-support
title: マルチフレームワークサポート
---

DevToolsは、フレームワーク固有の設定を必要とせずに、Mocha、Jasmine、Cucumberで自動的に動作します。単にWebDriverIOの設定にサービスを追加するだけで、どのテストフレームワークを使用していても、すべての機能がシームレスに動作します。

**サポートされているフレームワーク：**
- **Mocha** - grepフィルタリングによるテストおよびスイートレベルの実行
- **Jasmine** - grepベースのフィルタリングによる完全な統合
- **Cucumber** - feature:lineターゲティングによるシナリオおよび例レベルの実行

同じデバッグインターフェース、テストの再実行、および視覚化機能が、すべてのフレームワークで一貫して動作します。

## 設定

```js
// wdio.conf.js
export const config = {
    framework: 'mocha', // または 'jasmine' または 'cucumber'
    services: ['devtools'],
    // ...
};
```