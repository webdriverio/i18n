---
id: integrate-with-app-percy
title: モバイルアプリケーション向け
description: "WebdriverIOのモバイルアプリテストをBrowserStack App Percyと統合してビジュアルテストを行います。まずはPERCY_TOKENの設定から始めましょう。"
---

## WebdriverIOテストをApp Percyと統合する

統合の前に、[WebdriverIO向けApp Percyのサンプルビルドチュートリアル](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)を確認することができます。
テストスイートをBrowserStack App Percyと統合しましょう。統合手順の概要は以下のとおりです:

### ステップ1: Percyダッシュボードで新しいアプリプロジェクトを作成する

Percyに[サインイン](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)し、[新しいアプリタイプのプロジェクトを作成](https://www.browserstack.com/docs/app-percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)します。プロジェクトを作成すると、`PERCY_TOKEN`環境変数が表示されます。Percyは`PERCY_TOKEN`を使用して、スクリーンショットをアップロードする組織とプロジェクトを識別します。この`PERCY_TOKEN`は次のステップで必要になります。

### ステップ2: プロジェクトトークンを環境変数として設定する

以下のコマンドを実行して、PERCY_TOKENを環境変数として設定します:

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"    // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### ステップ3: Percyパッケージをインストールする

テストスイートの統合環境を構築するために必要なコンポーネントをインストールします。
依存関係をインストールするには、次のコマンドを実行します:

```sh
npm install --save-dev @percy/cli
```

### ステップ4: 依存関係をインストールする

Percy Appiumアプリをインストールします

```sh
npm install --save-dev @percy/appium-app
```

### ステップ5: テストスクリプトを更新する
コード内で@percy/appium-appをインポートしてください。

以下はpercyScreenshot関数を使用したテストの例です。スクリーンショットを撮る必要がある箇所でこの関数を使用してください。

```sh
import percyScreenshot from '@percy/appium-app';
describe('Appium webdriverio test example', function() {
  it('takes a screenshot', async () => {
    await percyScreenshot('Appium JS example');
  });
});
```
percyScreenshotメソッドに必要な引数を渡しています。

スクリーンショットメソッドの引数は以下のとおりです:

```sh
percyScreenshot(driver, name[, options])
```
### ステップ6: テストスクリプトを実行する

`percy app:exec`を使用してテストを実行します。

percy app:execコマンドを使用できない場合や、IDEの実行オプションを使用してテストを実行したい場合は、percy app:exec:startおよびpercy app:exec:stopコマンドを使用できます。詳細については、[Run Percy](https://www.browserstack.com/docs/app-percy/references/commands/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)をご覧ください。

```sh
$ percy app:exec -- appium test command
```
このコマンドはPercyを起動し、新しいPercyビルドを作成し、スナップショットを撮ってプロジェクトにアップロードし、Percyを停止します:


```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Snapshot taken "Appium WebdriverIO Example"
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!
```

## 詳細については、以下のページをご覧ください:
- [WebdriverIOテストをPercyと統合する](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [環境変数のページ](https://www.browserstack.com/docs/app-percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- BrowserStack Automateを使用している場合は、[BrowserStack SDKを使用して統合する](https://www.browserstack.com/docs/app-percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)


| リソース                                                                                                                                                            | 説明                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [公式ドキュメント](https://www.browserstack.com/docs/app-percy/integrate/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | App PercyのWebdriverIOドキュメント |
| [サンプルビルド - チュートリアル](https://www.browserstack.com/docs/app-percy/sample-build/webdriverio-javascript/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | App PercyのWebdriverIOチュートリアル      |
| [公式動画](https://youtu.be/a4I_RGFdwvc/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | App Percyによるビジュアルテスト         |
| [ブログ](https://www.browserstack.com/blog/product-launch-app-percy/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | App Percyのご紹介: ネイティブアプリ向けのAI搭載自動ビジュアルテストプラットフォーム    |