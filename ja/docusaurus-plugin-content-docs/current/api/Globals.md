---
id: globals
title: グローバル変数
---

テストファイルでは、WebdriverIOはこれらのメソッドとオブジェクトをグローバル環境に配置します。使用するために何かをインポートする必要はありません。ただし、明示的なインポートを好む場合は、`import { browser, $, $$, expect } from '@wdio/globals'`を実行し、WDIOの設定で`injectGlobals: false`を設定することができます。

以下のグローバルオブジェクトは、特に設定されていない限り利用可能です：

- `browser`: WebdriverIO [ブラウザオブジェクト](https://webdriver.io/docs/api/browser)
- `driver`: `browser`のエイリアス（モバイルテスト実行時に使用）
- `multiremotebrowser`: `browser`または`driver`のエイリアスですが、[Multiremote](/docs/multiremote)セッションでのみ設定されます
- `$`: 要素を取得するコマンド（詳細は[APIドキュメント](/docs/api/browser/$)を参照）
- `$$`: 複数の要素を取得するコマンド（詳細は[APIドキュメント](/docs/api/browser/$$)を参照）
- `expect`: WebdriverIOのアサーションフレームワーク（[APIドキュメント](/docs/api/expect-webdriverio)を参照）

__注意:__ WebdriverIOは、使用されるフレームワーク（例：MochaやJasmine）が環境をブートストラップする際にグローバル変数を設定することについては制御できません。