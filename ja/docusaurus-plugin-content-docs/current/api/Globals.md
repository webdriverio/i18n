---
id: globals
title: グローバル変数
---

テストファイルでは、WebdriverIOは以下のメソッドやオブジェクトをグローバル環境に配置します。それらを使用するために何かをインポートする必要はありません。ただし、明示的なインポートを好む場合は、`import { browser, $, $$, expect } from '@wdio/globals'`を使用し、WDIOの設定で`injectGlobals: false`を設定できます。

以下のグローバルオブジェクトは、別途設定されない限り設定されます：

- `browser`: WebdriverIOの[ブラウザオブジェクト](https://webdriver.io/docs/api/browser)
- `driver`: `browser`のエイリアス（モバイルテスト実行時に使用）
- `multiRemoteBrowser`: `browser`または`driver`のエイリアスですが、[マルチリモート](/docs/multiremote)セッションでのみ設定されます
- `$`: 要素を取得するコマンド（詳細は[APIドキュメント](/docs/api/browser/$)を参照）
- `$$`: 複数の要素を取得するコマンド（詳細は[APIドキュメント](/docs/api/browser/$$)を参照）
- `expect`: WebdriverIOのアサーションフレームワーク（[APIドキュメント](/docs/api/expect-webdriverio)を参照）

__注意:__ WebdriverIOは、使用されるフレームワーク（例：MochaやJasmine）が環境の起動時にグローバル変数を設定することをコントロールできません。