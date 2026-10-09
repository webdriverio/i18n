---
id: integrate-with-percy
title: Webアプリケーション向け
description: "Webアプリケーション向けのWebdriverIOテストをBrowserStack Percyと統合してビジュアルテストを行う方法を、プロジェクトの作成からビルドの実行まで説明します。"
---

## WebdriverIOテストをPercyと統合する

統合を始める前に、[WebdriverIO向けPercyサンプルビルドチュートリアル](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)を参照できます。
WebdriverIOの自動テストをBrowserStack Percyと統合します。統合手順の概要は以下のとおりです。

### ステップ1: Percyプロジェクトを作成する
Percyに[サインイン](https://percy.io/signup/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)します。Percyで、タイプがWebのプロジェクトを作成し、プロジェクトに名前を付けます。プロジェクトが作成されると、Percyがトークンを生成します。このトークンを控えておいてください。次のステップで環境変数を設定する際に使用します。

プロジェクトの作成について詳しくは、[Percyプロジェクトを作成する](https://www.browserstack.com/docs/percy/get-started/create-project/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)を参照してください。

### ステップ2: プロジェクトトークンを環境変数として設定する

以下のコマンドを実行して、PERCY_TOKENを環境変数として設定します。

```sh
export PERCY_TOKEN="<your token here>"   // macOS or Linux
$Env:PERCY_TOKEN="<your token here>"   // Windows PowerShell
set PERCY_TOKEN="<your token here>"    // Windows CMD
```

### ステップ3: Percyの依存関係をインストールする

テストスイートの統合環境を構築するために必要なコンポーネントをインストールします。

依存関係をインストールするには、次のコマンドを実行します。

```sh
npm install --save-dev @percy/cli @percy/webdriverio
```

### ステップ4: テストスクリプトを更新する

Percyライブラリをインポートして、スクリーンショットの取得に必要なメソッドと属性を使用できるようにします。
次の例では、非同期モードでpercySnapshot()関数を使用しています。

```sh
import percySnapshot from '@percy/webdriverio';
describe('webdriver.io page', () => {
  it('should have the right title', async () => {
    await browser.url('https://webdriver.io');
    await expect(browser).toHaveTitle('WebdriverIO · Next-gen browser and mobile automation test framework for Node.js');
    await percySnapshot('webdriver.io page');
  });
});
```

WebdriverIOを[スタンドアロンモード](https://webdriver.io/docs/setuptypes.html/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)で使用する場合は、`percySnapshot`関数の第1引数としてbrowserオブジェクトを渡します。

```sh
import { remote } from 'webdriverio'

import percySnapshot from '@percy/webdriverio';

const browser = await remote({
  logLevel: 'trace',
  capabilities: {
    browserName: 'chrome'
  }
});

await browser.url('https://duckduckgo.com');
const inputElem = await browser.$('#search_form_input_homepage');
await inputElem.setValue('WebdriverIO');
const submitBtn = await browser.$('#search_button_homepage');
await submitBtn.click();
// スタンドアロンモードではbrowserオブジェクトが必須です
percySnapshot(browser, 'WebdriverIO at DuckDuckGo');
await browser.deleteSession();
```
スナップショットメソッドの引数は以下のとおりです。

```sh
percySnapshot(name[, options])
```
### スタンドアロンモード

```sh
percySnapshot(browser, name[, options])
```

- browser（必須） - WebdriverIOのbrowserオブジェクト
- name（必須） - スナップショット名。スナップショットごとに一意である必要があります
- options - スナップショットごとの設定オプションを参照してください

詳しくは、[Percyスナップショット](https://www.browserstack.com/docs/percy/take-percy-snapshots/overview/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)を参照してください。

### ステップ5: Percyを実行する
以下のように`percy exec`コマンドを使用してテストを実行します。

`percy:exec`コマンドを使用できない場合や、IDEの実行オプションでテストを実行したい場合は、`percy:exec:start`および`percy:exec:stop`コマンドを使用できます。詳しくは、[Percyを実行する](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)を参照してください。

```sh
percy exec -- wdio wdio.conf.js
```

```sh
[percy] Percy has started!
[percy] Created build #1: https://percy.io/[your-project]
[percy] Running "wdio wdio.conf.js"
...
[...] webdriver.io page
[percy] Snapshot taken "webdriver.io page"
[...]    ✓ should have the right title
...
[percy] Stopping percy...
[percy] Finalized build #1: https://percy.io/[your-project]
[percy] Done!

```

## 詳細については、以下のページを参照してください:
- [WebdriverIOテストをPercyと統合する](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- [環境変数のページ](https://www.browserstack.com/docs/percy/get-started/set-env-var/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)
- BrowserStack Automateを使用している場合は、[BrowserStack SDKを使用して統合する](https://www.browserstack.com/docs/percy/integrate-bstack-sdk/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)を参照してください。


| リソース                                                                                                                                                            | 説明                       |
|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------|
| [公式ドキュメント](https://www.browserstack.com/docs/percy/integrate/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)             | PercyのWebdriverIOドキュメント |
| [サンプルビルド - チュートリアル](https://www.browserstack.com/docs/percy/sample-build/webdriverio/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation) | PercyのWebdriverIOチュートリアル      |
| [公式動画](https://youtu.be/1Sr_h9_3MI0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                                              | Percyによるビジュアルテスト         |
| [ブログ](https://www.browserstack.com/blog/introducing-visual-reviews-2-0/?utm_source=webdriverio&utm_medium=partnered&utm_campaign=documentation)                    | Visual Reviews 2.0のご紹介    |