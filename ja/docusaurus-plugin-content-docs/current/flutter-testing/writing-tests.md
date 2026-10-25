---
id: writing-tests
title: テストの作成
description: "Flutterコンテキストに切り替え、flutter_driver拡張機能を通じてウィジェットを操作することで、FlutterアプリのWebdriverIOテストを作成します。"
---

このセクションでは、自動テストシナリオを作成するための実践的な構成と、WebdriverIOを使用してFlutterの内部コンポーネントツリーを直接操作する方法について説明します。

### コンテキストの切り替えが必要な理由

Appiumで自動化セッションを開始すると、ドライバーはオペレーティングシステムのネイティブコンテキスト（`NATIVE_APP`と呼ばれます）をマッピングすることから実行を開始します。このコンテキストからは、アプリケーションを包むネイティブシェル（システムのステータスバーやAndroid/iOSのネイティブダイアログなど）しか見ることができません。

FlutterはユーザーインターフェースをisolatedなCanvas内でレンダリングするため、内部要素は`NATIVE_APP`コンテキストからは見えません。Flutterのテスト拡張機能（`flutter_driver`）に直接コマンドを送信するには、自動化のフォーカスを明示的に`FLUTTER`コンテキストに切り替える必要があります。この切り替えを行わないと、ウィジェットを検索しようとしても要素が見つからないエラーになります。

:::tip ベストプラクティス：`beforeEach`で常にコンテキストを切り替える
すべてのテストファイルで、`beforeEach`フック内に`await driver.switchContext('FLUTTER')`を含めることを推奨します。これにより、すべてのテストが`FLUTTER`コンテキストで実行を開始することが保証され、前のテストが`NATIVE_APP`に切り替えた場合（例：OSの権限ダイアログを処理するため）や、セッションがアクティブなコンテキストをリセットした場合でも、不安定なテストや状態の漏洩を防ぐことができます。
:::

### `appium-flutter-finder`が必要な理由

`$('~selector')`や`$('#id')`のような従来のWebdriverIOセレクターは、Webやモバイルのネイティブインターフェース向けの戦略（リソースIDやXPathなど）を使用して要素を検索するように設計されています。

Flutterは独自の内部要素を管理し、独自の検索メソッド（`byValueKey`、`byText`、`byType`など）を使用します。`appium-flutter-finder`ライブラリが必要なのは、それが翻訳者として機能するためです。このライブラリは、Flutter固有のロケーター戦略を、`appium-flutter-driver`がDart仮想マシン（VM）内で解釈・実行できるシリアライズされた形式（Base64/JSON）に変換して提供します。

### 実践的なテスト例

ここでは、`appium-flutter-finder`を使用してウィジェットを検索し、`driver.execute('flutter:<command>')`で実行する拡張コマンドと組み合わせた一般的なシナリオを紹介します。

:::info Flutter Driver拡張コマンドとファインダー
`appium-flutter-driver`は、Flutterアプリケーションを操作するための専用コマンドを提供しています。以下はその例です：
- `flutter:waitFor`：ウィジェットが表示されるまで待機します。
- `flutter:waitForAbsent`：ウィジェットが消えるまで待機します。
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`：スクロール可能なビュー内でのスクロールを処理します。
- `flutter:setTextEntryEmulation`：テキスト入力の動作を設定します。

利用可能なコマンド、パラメーター、戻り値の型の完全なリストについては、[Appium Flutter Driver Commands Documentation](https://github.com/appium/appium-flutter-driver#commands)、[Node.js Finderのソースコード](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs)、および[npmのappium-flutter-finder](https://www.npmjs.com/package/appium-flutter-finder)を参照してください。
:::

### 例A — シンプルな操作（カウンターフロー）

```typescript
// counter.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Counter Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The counter should be successfully incremented by clicking the button.', async () => {
        const incrementButton = find.byTooltip('Increment');
        const counterText = find.byValueKey('counter_text');

        const initialValue = await driver.getElementText(counterText);
        expect(initialValue).toBe('0');

        await driver.elementClick(incrementButton);

        const finalValue = await driver.getElementText(counterText);
        expect(finalValue).toBe('1');
    });
});
```

### 例B — 安定したナビゲーション（タイムアウトの回避）

```typescript
// redirects.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter Redirects Flow', () => {

    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should be able to navigate between the Redirect Example views and back to the first view.', async () => {
        const buttonGoToRedirectExampleTwoView = find.byValueKey('redirect_example_two_button');
        await driver.elementClick(buttonGoToRedirectExampleTwoView);

        const redirectExampleTwoBody = find.byValueKey('redirect_example_two_body');
        await driver.execute('flutter:waitFor', redirectExampleTwoBody);
        const textRedirectExampleTwoBody = await driver.getElementText(redirectExampleTwoBody);
        expect(textRedirectExampleTwoBody).toBe('This is the Redirect Example Two View');

        const buttonGoBackToRedirectExampleView = find.byValueKey('redirect_example_two_back_button');
        await driver.elementClick(buttonGoBackToRedirectExampleView);

        const redirectExampleBody = find.byValueKey('redirect_example_body');
        await driver.execute('flutter:waitFor', redirectExampleBody);
        const textRedirectExampleBody = await driver.getElementText(redirectExampleBody);
        expect(textRedirectExampleBody).toBe('This is the Redirect Example View');
    });
});
```

### 例C — コンテキストの切り替え（OSネイティブダイアログと権限）

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. FLUTTERコンテキスト内：OSレベルの権限ダイアログまたはアラートダイアログを表示するウィジェットをクリック
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. OSダイアログを操作するためにNATIVE_APPコンテキストに切り替え
        await driver.switchContext('NATIVE_APP');

        // 標準のWebdriverIOセレクターを使用してネイティブボタンを検索してクリック
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Flutterウィジェットの検証を続けるためにFLUTTERコンテキストに戻る
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## ビルドと実行の流れ

最新のDartコードとKeyの変更がテストに反映されるよう、常に以下の手順に従ってください：

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

コード例はリポジトリで確認できます：https://github.com/webdriverio/appium-boilerplate