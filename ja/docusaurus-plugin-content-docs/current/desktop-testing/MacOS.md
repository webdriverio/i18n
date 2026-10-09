---
id: macos
title: MacOS
description: "プロジェクトセットアップウィザードから始めて、AppiumとMac2ドライバーを使用し、WebdriverIOでネイティブmacOSアプリケーションを自動化します。"
---

WebdriverIOは、[Appium](https://appium.io/)を使用して任意のMacOSアプリケーションを自動化できます。必要なのは、システムに[XCode](https://developer.apple.com/xcode/)がインストールされていること、Appiumと[Mac2 Driver](https://github.com/appium/appium-mac2-driver)が依存関係としてインストールされていること、そして正しいcapabilitiesが設定されていることだけです。

## はじめに

新しいWebdriverIOプロジェクトを開始するには、次を実行します：

```sh
npm create wdio@latest ./
```

インストールウィザードがプロセスを案内します。どのような種類のテストを行いたいかを尋ねられたら、必ず _"Desktop Testing - of MacOS Applications"_ を選択してください。その後は、デフォルトのままにするか、好みに応じて変更してください。

設定ウィザードは、必要なすべてのAppiumパッケージをインストールし、MacOSでテストするために必要な設定を含む`wdio.conf.js`または`wdio.conf.ts`を作成します。テストファイルの自動生成に同意した場合は、`npm run wdio`で最初のテストを実行できます。

<CreateMacOSProjectAnimation />

以上です 🎉

## 例

以下は、計算機アプリケーションを開き、計算を行い、その結果を検証するシンプルなテストの例です：

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

__注意：__ 計算機アプリは、capabilityオプションとして`'appium:bundleId': 'com.apple.calculator'`が定義されているため、セッションの開始時に自動的に開かれました。セッション中はいつでもアプリを切り替えることができます。

## 詳細情報

MacOSでのテストに関する詳細については、[Appium Mac2 Driver](https://github.com/appium/appium-mac2-driver)プロジェクトを確認することをお勧めします。