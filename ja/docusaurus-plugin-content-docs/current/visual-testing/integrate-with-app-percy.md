---
id: integrate-with-app-percy
title: モバイルアプリケーション向け
---

## WebdriverIOテストとApp Percyを統合する

統合の前に、[WebdriverIO向けApp Percyのサンプルビルドチュートリアル](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)を参照できます。
テストスイートをBrowserStack App Percyと統合する手順の概要は次のとおりです：

### ステップ1：Percyダッシュボードで新しいアプリプロジェクトを作成する

Percyに[サインイン](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)し、[新しいアプリタイプのプロジェクトを作成](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)します。プロジェクトを作成すると、`PERCY_TOKEN`環境変数が表示されます。Percyはこの`PERCY_TOKEN`を使用して、スクリーンショットをアップロードする組織とプロジェクトを識別します。次のステップでこの`PERCY_TOKEN`が必要になります。

### ステップ2：プロジェクトトークンを環境変数として設定する

PERCY_TOKENを環境変数として設定するために、次のコマンドを実行します：

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### ステップ3：Percyパッケージをインストールする

テストスイートの統合環境を確立するために必要なコンポーネントをインストールします。
依存関係をインストールするには、次のコマンドを実行します：

```sh
npm install --save-dev @percy/cli
```

### ステップ4：依存関係をインストールする

Percy Appiumアプリをインストールします

```sh
npm install --save-dev @percy/appium-app
```

### ステップ5：テストスクリプトを更新する
コードに@percy/appium-appをインポートしていることを確認してください。

以下はpercyScreenshot関数を使用するテスト例です。スクリーンショットを撮る必要がある場所ではこの関数を使用してください。

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
必要な引数をpercyScreenshotメソッドに渡しています。

スクリーンショットメソッドの引数は次のとおりです：

```sh
percyScreenshot(driver, name[, options])
```
### ステップ6：テストスクリプトを実行する

`percy app:exec`を使用してテストを実行します。

percy app:execコマンドを使用できない場合や、IDEの実行オプションを使用してテストを実行したい場合は、percy app:exec:startとpercy app:exec:stopコマンドを使用できます。詳細については、[Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)をご覧ください。

```sh
$ percy app:exec -- appium test command
```
このコマンドはPercyを起動し、新しいPercyビルドを作成し、スナップショットを撮影してプロジェクトにアップロードし、Percyを停止します：


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## 詳細については以下のページをご覧ください：
- [WebdriverIOテストとPercyを統合する](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [環境変数ページ](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- BrowserStack Automateを使用している場合は、[BrowserStack SDKを使用した統合](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)をご覧ください。


| リソース                                                                                                                                                            | 説明                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [公式ドキュメント](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | App PercyのWebdriverIOドキュメント |
| [サンプルビルド - チュートリアル](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | App PercyのWebdriverIOチュートリアル      |
| [公式ビデオ](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | App Percyを使用した視覚的テスト         |
| [ブログ](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | App Percyの紹介：ネイティブアプリ向けのAI搭載自動視覚テストプラットフォーム    |