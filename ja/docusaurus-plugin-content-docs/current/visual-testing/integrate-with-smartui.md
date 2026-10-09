---
id: integrate-with-smartui
title: SmartUI
description: "TestMu AI（旧 LambdaTest）SmartUI を使用して、WebdriverIO テストに AI を活用したビジュアルリグレッションテストを追加する方法（セットアップとオプションを含む）。"
---

TestMu AI（旧 LambdaTest）の [SmartUI](https://www.testmuai.com/support/docs/smart-visual-testing/) は、WebdriverIO テスト向けに AI を活用したビジュアルリグレッションテストを提供します。スクリーンショットをキャプチャしてベースラインと比較し、インテリジェントな比較アルゴリズムによって視覚的な差異をハイライトします。

## セットアップ

**SmartUI プロジェクトを作成する**

TestMu AI（旧 LambdaTest）に[サインイン](https://accounts.lambdatest.com/register)し、[SmartUI Projects](https://smartui.lambdatest.com/) に移動して新しいプロジェクトを作成します。プラットフォームとして **Web** を選択し、プロジェクト名、承認者、タグを設定します。

**認証情報を設定する**

TestMu AI（旧 LambdaTest）のダッシュボードから `LT_USERNAME` と `LT_ACCESS_KEY` を取得し、環境変数として設定します：

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**SmartUI SDK をインストールする**

```sh
npm install @lambdatest/wdio-driver
```

**WebdriverIO を設定する**

`wdio.conf.js` を更新します：

```javascript
exports.config = {
  user: process.env.LT_USERNAME,
  key: process.env.LT_ACCESS_KEY,

  capabilities: [{
    browserName: 'chrome',
    browserVersion: 'latest',
    'LT:Options': {
      platform: 'Windows 10',
      build: 'SmartUI Build',
      name: 'SmartUI Test',
      smartUI.project: '<Your Project Name>',
      smartUI.build: '<Your Build Name>',
      smartUI.baseline: false
    }
  }]
}
```

## 使い方

スクリーンショットをキャプチャするには `browser.execute('smartui.takeScreenshot')` を使用します：

```javascript
describe('WebdriverIO SmartUI Test', () => {
  it('should capture screenshot for visual testing', async () => {
    await browser.url('https://webdriver.io');

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage Screenshot'
    });

    await browser.execute('smartui.takeScreenshot', {
      screenshotName: 'Homepage with Options',
      ignoreDOM: {
        id: ['dynamic-element-id'],
        class: ['ad-banner']
      }
    });
  });
});
```

**テストを実行する**

```sh
npx wdio wdio.conf.js
```

結果は [SmartUI Dashboard](https://smartui.lambdatest.com/) で確認できます。

## 高度なオプション

**要素を無視する**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Ignore Dynamic Elements',
  ignoreDOM: {
    id: ['element-id'],
    class: ['dynamic-class'],
    xpath: ['//div[@class="ad"]']
  }
});
```

**特定の領域を選択する**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## リソース

| リソース                                                                                          | 説明                              |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [公式ドキュメント](https://www.testmuai.com/support/docs/smart-ui-cypress/)              | SmartUI ドキュメント                    |
| [SmartUI Dashboard](https://smartui.lambdatest.com/)                                              | SmartUI のプロジェクトとビルドにアクセス  |
| [高度な設定](https://www.testmuai.com/support/docs/test-settings-options/)              | 比較の感度を設定         |
| [ビルドオプション](https://www.testmuai.com/support/docs/smart-ui-build-options/)                 | 高度なビルド設定             |