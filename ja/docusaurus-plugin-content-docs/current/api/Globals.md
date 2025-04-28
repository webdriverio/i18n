---
id: globals
title: グローバル変数
---

テストファイルでは、WebdriverIOは以下のメソッドとオブジェクトをグローバル環境に配置します。これらを使用するために何かをインポートする必要はありません。ただし、明示的なインポートを好む場合は、`import { browser, $, $$, expect } from '@wdio/globals'`を使用して、WDIOの設定で`injectGlobals: false`を設定することができます。

別途設定しない限り、以下のグローバルオブジェクトが設定されます：

- `browser`: WebdriverIOの[ブラウザオブジェクト](https://webdriver.io/docs/api/browser)
- `driver`: `browser`のエイリアス（モバイルテスト実行時に使用）
- `multiremotebrowser`: `browser`または`driver`のエイリアスですが、[Multiremote](/docs/multiremote)セッションでのみ設定されます
- `$`: 要素を取得するコマンド（詳細は[API docs](/docs/api/browser/$)を参照）
- `$$`: 複数の要素を取得するコマンド（詳細は[API docs](/docs/api/browser/$$)を参照）
- `expect`: WebdriverIOのアサーションフレームワーク（[API docs](/docs/api/expect-webdriverio)を参照）

__注意:__ WebdriverIOは、環境を起動する際に使用されるフレームワーク（例：MochaやJasmine）がグローバル変数を設定することをコントロールできません。