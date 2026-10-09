---
id: globals
title: グローバル
---

テストファイルでは、WebdriverIO がこれらの各メソッドとオブジェクトをグローバル環境に配置します。それらを使用するために何かをインポートする必要はありません。ただし、明示的なインポートを好む場合は、`import { browser, $, $$, expect } from '@wdio/globals'` を実行し、WDIO 設定で `injectGlobals: false` を設定できます。

特に設定されていない場合、以下のグローバルオブジェクトが設定されます：

- `browser`: WebdriverIO の [Browser オブジェクト](https://webdriver.io/docs/api/browser)
- `driver`: `browser` のエイリアス（モバイルテストを実行する際に使用）
- `multiRemoteBrowser`: `browser` または `driver` のエイリアスですが、[マルチリモート](/docs/multiremote)セッションでのみ設定されます
- `$`: 要素を取得するためのコマンド（詳細は [API ドキュメント](/docs/api/browser/$)を参照）
- `$$`: 複数の要素を取得するためのコマンド（詳細は [API ドキュメント](/docs/api/browser/$$)を参照）
- `expect`: WebdriverIO のアサーションフレームワーク（[API ドキュメント](/docs/api/expect-webdriverio)を参照）

__注意：__ WebdriverIO は、使用されるフレームワーク（例：Mocha や Jasmine）が環境のブートストラップ時にグローバル変数を設定することを制御できません。