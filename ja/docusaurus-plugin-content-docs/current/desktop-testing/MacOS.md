---
id: macos
title: MacOS
---

WebdriverIOは[Appium](https://appium.io/)を使用して任意のMacOSアプリケーションを自動化できます。必要なのは、システムにインストールされた[XCode](https://developer.apple.com/xcode/)、依存関係としてインストールされたAppiumと[Mac2 Driver](https://github.com/appium/appium-mac2-driver)、そして正しく設定されたケイパビリティだけです。

## はじめに

新しいWebdriverIOプロジェクトを開始するには、次のコマンドを実行します：

```sh
npm create wdio@latest ./
```

インストールウィザードがプロセスをガイドします。どのタイプのテストを行いたいか尋ねられたら、「Desktop Testing - of MacOS Applications」を選択してください。その後はデフォルトのままにするか、お好みに合わせて変更してください。

設定ウィザードは必要なAppiumパッケージをすべてインストールし、MacOSでテストするために必要な設定を含む`wdio.conf.js`または`wdio.conf.ts`を作成します。テストファイルの自動生成に同意した場合は、`npm run wdio`で最初のテストを実行できます。

<CreateMacOSProjectAnimation />

これで完了です 🎉

## 例

これは、電卓アプリケーションを開き、計算を行ってその結果を検証する簡単なテストの例です：

```js
describe('My Login application', () => {
    it('should set a text to a text view', async function () {
        await $('//XCUIElementTypeButton[@label="seven"]').click()
        await $('//XCUIElementTypeButton[@label="multiply"]').click()
        await $('//XCUIElementTypeButton[@label="six"]').click()
        await $('//XCUIElementTypeButton[@title="="]').click()
        await expect($('//XCUIElementTypeStaticText[@label="main display"]')).toHaveText('42')
    });
})
```

__注意:__ 電卓アプリはケイパビリティオプションとして`'appium:bundleId': 'com.apple.calculator'`が定義されているため、セッション開始時に自動的に開かれます。セッション中はいつでもアプリを切り替えることができます。

## 詳細情報

MacOSでのテストに関する詳細については、[Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver)プロジェクトをご確認ください。