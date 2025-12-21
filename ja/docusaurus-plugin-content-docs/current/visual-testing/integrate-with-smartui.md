---
id: integrate-with-smartui
title: SmartUI
---

LambdaTest [SmartUI](https://www.lambdatest.com/smart-visual-testing) は、WebdriverIOテスト用のAI搭載ビジュアル回帰テストを提供します。スクリーンショットをキャプチャし、ベースラインと比較して、インテリジェントな比較アルゴリズムで視覚的な違いを強調表示します。

## セットアップ

**SmartUIプロジェクトの作成**

LambdaTestに[サインイン](https://accounts.lambdatest.com/register)して、[SmartUI Projects](https://smartui.lambdatest.com/)に移動し、新しいプロジェクトを作成します。プラットフォームとして**Web**を選択し、プロジェクト名、承認者、タグを設定します。

**認証情報の設定**

LambdaTestダッシュボードから`LT_USERNAME`と`LT_ACCESS_KEY`を取得し、環境変数として設定します：

```sh
export LT_USERNAME="<your username>"
export LT_ACCESS_KEY="<your access key>"
```

**SmartUI SDKのインストール**

```sh
npm install @lambdatest/wdio-driver
```

**WebdriverIOの設定**

`wdio.conf.js`を更新します：

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

## 使用方法

`browser.execute('smartui.takeScreenshot')`を使用してスクリーンショットを取得します：

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

**テストを実行**

```sh
npx wdio wdio.conf.js
```

結果は[SmartUI Dashboard](https://smartui.lambdatest.com/)で確認できます。

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

**特定の領域を選択**

```javascript
await browser.execute('smartui.takeScreenshot', {
  screenshotName: 'Compare Specific Area',
  selectDOM: {
    id: ['main-content']
  }
});
```

## リソース

| リソース                                                                                          | 説明                                     |
|---------------------------------------------------------------------------------------------------|------------------------------------------|
| [公式ドキュメント](https://www.lambdatest.com/support/docs/smart-ui-cypress/)                     | SmartUIドキュメント                       |
| [SmartUIダッシュボード](https://smartui.lambdatest.com/)                                           | SmartUIプロジェクトとビルドへのアクセス    |
| [詳細設定](https://www.lambdatest.com/support/docs/test-settings-options/)                        | 比較感度の設定                           |
| [ビルドオプション](https://www.lambdatest.com/support/docs/smart-ui-build-options/)               | 高度なビルド設定                         |