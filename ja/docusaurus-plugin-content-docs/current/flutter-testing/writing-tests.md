---
id: writing-tests
title: テストの作成
description: "Flutter コンテキストに切り替え、flutter_driver 拡張機能を通じてウィジェットを操作することで、Flutter アプリ向けの WebdriverIO テストを作成します。"
---

このセクションでは、自動テストシナリオを作成するための実践的な構成と、WebdriverIO を使用して Flutter の内部コンポーネントツリーを直接操作する方法について説明します。

### なぜコンテキストの切り替えが必要なのか？

Appium で自動化セッションを開始すると、ドライバーはまずオペレーティングシステムのネイティブコンテキスト（`NATIVE_APP` と呼ばれます）をマッピングして実行を開始します。このコンテキストからは、アプリケーションを包むネイティブシェル（システムステータスバーやネイティブの Android/iOS ダイアログなど）しか見えません。

Flutter はユーザーインターフェースを分離された Canvas 内にレンダリングするため、内部の要素は `NATIVE_APP` コンテキストからは見えません。Flutter のテスト拡張機能（`flutter_driver`）に直接コマンドを送信するには、自動化のフォーカスを明示的に `FLUTTER` コンテキストに切り替える必要があります。この切り替えを行わないと、Widget を検索しようとした際に要素が見つからないというエラーが発生します。

:::tip ベストプラクティス: 常に `beforeEach` でコンテキストを切り替える
すべてのテストファイルで、`beforeEach` フック内に `await driver.switchContext('FLUTTER')` を含めることが推奨されるベストプラクティスです。これにより、すべてのテストが `FLUTTER` コンテキストで実行を開始することが保証され、前のテストが `NATIVE_APP` に切り替えた場合（例: OS の権限ダイアログを処理するため）や、セッションがアクティブなコンテキストをリセットした場合の不安定さや状態の漏れを防ぐことができます。
:::

### なぜ `appium-flutter-finder` が必要なのか？

`$('~selector')` や `$('#id')` のような従来の WebdriverIO セレクターは、Web やモバイルのネイティブインターフェース向けの戦略（リソース ID や XPath など）を使用して要素を検索するように設計されています。

Flutter は独自の内部要素を管理し、独自の検索方法（`byValueKey`、`byText`、`byType` など）を使用します。`appium-flutter-finder` ライブラリは翻訳者として機能するため必要です。これらの Flutter 固有のロケーター戦略を、`appium-flutter-driver` が解釈して Dart 仮想マシン（VM）内で実行できるシリアライズ形式（Base64/JSON）で公開します。

### 実践的なテスト例

ここでは、`appium-flutter-finder` を使用してウィジェットを検索し、`driver.execute('flutter:<command>')` を通じて実行される拡張コマンドを組み合わせた一般的なシナリオを紹介します。

:::info Flutter Driver 拡張コマンドとファインダー
`appium-flutter-driver` は、Flutter アプリケーションを操作するための以下のような専用コマンドを提供しています:
- `flutter:waitFor`: ウィジェットが表示されるまで待機します。
- `flutter:waitForAbsent`: ウィジェットが消えるまで待機します。
- `flutter:scroll` / `flutter:scrollIntoView` / `flutter:scrollUntilVisible`: スクロール可能なビュー内でのスクロールを処理します。
- `flutter:setTextEntryEmulation`: テキスト入力の動作を設定します。

利用可能なコマンド、パラメーター、戻り値の型の完全なリストについては、[Appium Flutter Driver Commands Documentation](https://github.com/appium/appium-flutter-driver#commands)、[Node.js Finder のソースコード](https://github.com/appium/appium-flutter-driver/tree/main/finder/nodejs)、および [npm 上の appium-flutter-finder](https://www.npmjs.com/package/appium-flutter-finder) を参照してください。
:::

### 例 A — シンプルな操作（カウンターフロー）

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

### 例 B — 安定したナビゲーション（タイムアウトの回避）

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

### 例 C — コンテキストの切り替え（ネイティブ OS ダイアログと権限）

```typescript
// native_dialog_context.spec.ts
import find from 'appium-flutter-finder';

describe('Flutter & Native Context Switching Flow', () => {
    beforeEach(async () => {
        await driver.switchContext('FLUTTER');
    });

    it('The user should trigger a native dialog, interact with OS controls, and return to Flutter context.', async () => {
        // 1. FLUTTER コンテキスト内: OS レベルの権限ダイアログまたはアラートダイアログを表示するウィジェットをクリック
        const buttonRequestPermission = find.byValueKey('request_permission_button');
        await driver.elementClick(buttonRequestPermission);

        // 2. OS ダイアログを操作するために NATIVE_APP コンテキストに切り替え
        await driver.switchContext('NATIVE_APP');

        // 標準の WebdriverIO セレクターを使用してネイティブボタンを検索してクリック
        const nativeAllowButton = await $('//*[@text="Allow" or @text="While using the app" or @label="Allow"]');
        await nativeAllowButton.waitForDisplayed();
        await nativeAllowButton.click();

        // 3. Flutter ウィジェットの検証を続けるために FLUTTER コンテキストに戻る
        await driver.switchContext('FLUTTER');

        const permissionStatusText = find.byValueKey('permission_status_text');
        await driver.execute('flutter:waitFor', permissionStatusText);
        const status = await driver.getElementText(permissionStatusText);
        expect(status).toBe('Permission Granted');
    });
});
```

## ビルドと実行のフロー

最新の Dart コードと Key の変更がテストに反映されるように、常に以下の手順に従ってください:

```bash
flutter build apk -t lib/main_e2e.dart --debug
npx wdio run wdio.conf.ts
```

コード例はリポジトリで確認できます: https://github.com/webdriverio/appium-boilerplate