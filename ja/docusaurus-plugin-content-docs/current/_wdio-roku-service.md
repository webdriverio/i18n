---
id: wdio-roku-service
title: Rokuサービス
custom_edit_url: https://github.com/theREDspace/wdio-roku-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-roku-serviceはサードパーティのパッケージです。詳細については[GitHub](https://github.com/theREDspace/wdio-roku-service) | [npm](https://www.npmjs.com/package/wdio-roku-service)をご覧ください。
このサービスはWebdriverIOの多くの部分をオーバーライドし、Rokuアプリで使用できるようにするとともに、テスト中にRokuを制御するための[Roku ECP](https://developer.roku.com/en-ca/docs/developer-program/dev-tools/external-control-api.md)へのアクセスを提供します。

## 要件

### Roku
テストチャンネル/channel.zipと、macと同じネットワーク上にある開発者モードが有効なRokuデバイスが必要です。

### WebdriverIO
これはスタンドアロン製品ではなく、WebdriverIOテストフレームワークのプラグイン（またはサービス）として使用されます。使用する前に、`npm init wdio@latest`を実行してWDIOのセットアップを完了させてください。

セットアップステップを進める際、すべての質問やオプションをナビゲートする必要がないように、初期化フェーズ中に以下の選択肢を選ぶことができます：
- Roku Testing（注：レポジトリがRokuテスト専用であれば、これがデフォルトかつ唯一のサービスとしてインストールされます。そうでない場合は、複数のサービスをインストールできるようにE2E Testingを選択してください）
- On my local machine（E2Eのみ）
- Web（E2Eのみ）
- Chrome（E2Eのみ）
- Mocha
- Typescript [modulesはTSとJSの両方で動作するので、どちらかを選択]
- autogenerate some test files (Y)
-- デフォルトの場所
- page objects (Y)
-- デフォルトの場所
- spec reporter
- additional plugins (N)
- Visual Testing (N)
- services (roku)
- npm install (Y)

### Typescript設定
テストの記述にTypescriptを使用したい場合は、WebdriverIOによって生成されたtsconfig.jsonファイルに以下のオプションが設定されていることを確認する必要があります。
```
"moduleResolution": "nodenext",
"module": "NodeNext",
```
その後、以下に詳述するようにテストにサービスをインポートして使用できます。

### WDIO設定
現在、テストは単一のRokuデバイスのみをサポートしています。以下の設定更新が必要です：
* `maxInstances`と`maxInstancesPerCapability`は1にする必要があります。複数のデバイスでの自動テストはサポートされておらず、Rokuに重複したコマンドが送信される結果になります。capabilities は1つだけにしてください。
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {

maxInstances: 1,

    capabilities: [{
        browserName: 'chrome'
        // またはヘッドレスモードを使用する場合：
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--headless', '--disable-gpu']
        }
    }],
    //...
}
```

* 各間隔でRokuからXMLをダウンロードするため、`waitforInterval`と`waitforTimeout`を増やすことをお勧めします。開発環境で`browser.debug()`機能をより活用するために、mochaテストランナーのタイムアウトを5分以上に延長することもできます。
```js
//wdio.conf.js
export const config: WebdriverIO.Config = {
    waitforTimeout: 30000,
    
    //オプション：
    mochaOpts: {
        ui: 'bdd',
        timeout: 600000
    },
    //...
}
```

これで最初のテストを書く準備ができました！

```js
import { installFromZip } from 'wdio-roku-service/install'
import { exitChannel } from 'wdio-roku-service/channel'
import { Buttons, keyPress, keySequence } from 'wdio-roku-service/controller'

describe('first test', () => {
    before('On the landing screen of the test channel', async () => {
        await installFromZip(process.env.ROKU_APP_PATH)
    })

    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
    })

    after('should return to home', async () => {
        await exitChannel()
    })
})

```

また、テストのデバッグやテスト作成のために、wdioの`browser.debug()`機能を利用することをお勧めします：

```js
// ...
    it('should launch to the homescreen without login', async () => {
        await $("//LoadingIndicator").waitForDisplayed({ reverse: true })
        await expect($("//ContentCarousel")).toBeDisplayed()
        await browser.debug()
        // テストが停止し、コマンド用のREPLが利用可能になります

```
Chromeがヘッドレスモードでなければ、最後に`openRokuXML()`が呼び出された時点（おそらく`waitForX`または`expect`を通じて）を確認できます。ターミナルのREPLを使用して、有効な`$`コマンドと、追加されたいくつかのカスタムコマンド（`browser.openRokuXML()`と`browser.saveScreenshot('path/to/ss.jpg')`）を使用できます。`controller`クラスは`browser`オブジェクトにアタッチされていないため、現在それらを使用することはできません。幸いにも、おそらくあなたはRokuの隣に座っていて、アプリをナビゲートするためのリモコンを持っているでしょう。そして時々`browser.openRokuXML()`を呼び出して、ページの状態がどうなったかを確認できます！また、XMLはChrome ブラウザ自体のXPathと自然に連携するため、デバッグ中にChrome コンソールで直接セレクタを評価/開発できることを覚えておいてください。

### .env
`.env.example`ファイルを参照してください。このファイルをコピーして、このサービスを使用するWebdriverIOプロジェクト内の`.env`にリネームしてください。.gitignoreにも追加することをお勧めします。

* `ROKU_IP`はRokuのIPである必要があります。コマンドはこのIPを使用してRokuと通信します。これは必須です。
* `ROKU_USER`と`ROKU_PW`：アーカイブのインストールやスクリーンショットの撮影には、ログイン認証情報が必要です。
* `ROKU_APP_PATH`はRokuチャンネルのzipファイルの絶対パスである必要があります。
* `ROKU_CHANNEL_ID`はRokuチャンネルのIDである必要があります（通常は「dev」）。
* `DEBUG=wdio-roku-service`はデバッグメッセージを有効にします。それらを表示したい場合は、行の先頭にある「#」を削除してください。

## 変更された関数
### Browser
* `waitUntil`は、各イテレーションでRokuからXMLをフェッチして変更を確認します。
* `saveScreenshot`はRokuから現在の画面のスクリーンショットをダウンロードします。特に、これらのスクリーンショットはWebdriverIOが通常使用する.png形式ではなく、.jpg形式です。
* `openRokuXML`は、待機ではなく手動でRokuからXMLをフェッチする必要がある場合に使用します。

### Elements
* すべての待機は、Browserと同じ方法でサポートされています。`waitForClickable`は`waitForDisplayed`にマップされ、`waitForStable`は`waitForExist`にマップされています。
* `click`、`doubleClick`、および`moveTo`はサポートされていません。アプリを手動でナビゲートする必要があります。
* `isFocused`は、要素の`focused`属性がtrueであることをチェックします。
* `isDisplayed`は、要素の`bounds`属性をチェックし、`visible`がfalseに設定されていないことを確認します。`withinViewport`が設定されている場合、境界はRokuの画面サイズと比較されます。
* `getSize`と`getLocation`は`bounds`属性から値を取得し、存在しない場合はサイズは0、位置は-Infinityを返します。

その他の関数は変更されていませんが、多くは期待通りに動作します。

### Matchers
ほとんどのマッチャーは待機中にXMLをフェッチするように更新されています。いくつかは少し異なる機能を持っています。
* `toBeDisplayed`、`toBeDisplayedInViewport`、`toBeFocused`、`toBeExisting`、`toBePresent`、`toExist`、`toHaveSize`、`toHaveWidth`、`toHaveHeight`、および`toHaveAttribute`はすべて、Element の変更を考慮して、期待通りに動作します。
* `toHaveElementProperty`は`toHaveAttribute`にマップされています。
* `toHaveElementClass`は要素の`name`属性をチェックします。
* `toHaveId`は`toHaveElementClass`にマップされています。
* `toHaveText`は要素の`text`属性をチェックします。
* `toHaveChildren`は要素の`children`属性をチェックします。
* `toHaveHTML`はXMLをHTMLとして扱いますが、あまり有用ではない可能性があります。

以下は現在サポートされていません：
* `toBeSelected` - 選択されたボタンのXMLがどのように見えるか、違いがあるかどうかを判断した後、すぐにサポートされる可能性があります。
* `toBeChecked` - チェックされたチェックボックスのXMLがどのように見えるか、違いがあるかどうかを判断した後、すぐにサポートされる可能性があります。
* `toHaveComputedLabel` - Roku要素でこれと同等のものがある場合は、`toHaveAttribute`で属性をチェックしてください。
* `toHaveComputedRole` - Roku要素でこれと同等のものがある場合は、`toHaveAttribute`で属性をチェックしてください。
* `toHaveHref` - Roku要素にURLがある場合は、`toHaveAttribute`で属性をチェックしてください。
* `toHaveStyle` - XML要素にはスタイルがありません。
* `toHaveClipboardText` - これは不明です。
* `toHaveTitle` - タイトルはランダムに生成された一時的なXMLのファイル名になります。
* `toHaveUrl` - URLはコンピュータ上のXMLファイルへのパスになります。

## 使用方法
### チャンネルのインストール

これには、チャンネルに割り当てられたIDが必要です。
```js
import { installByID } from 'wdio-roku-service/install';

async before() {
    await installByID(process.env.ROKU_CHANNEL_ID);
}
```

アーカイブのインストール

特に複数の開発者がいて、場所やファイル名が異なる可能性がある場合は、パスを.envに保存することをお勧めします。
```js
import { installFromZip } from 'wdio-roku-service/install';

async before() {
    await installFromZip(process.env.ROKU_ARCHIVE_PATH);
}
```

事前インストール済みチャンネル

テスト前にチャンネルを自分でインストールした場合は、単純に起動できます。
```js
import { launchChannel, exitChannel } from 'wdio-roku-service/channel';

async before() {
    // チャンネルが既に開いている場合は閉じます。チャンネルがインスタントレジュームをサポートしている場合、これは単にバックグラウンドに移動するだけです
    await exitChannel();
    // チャンネルIDとして'dev'を使用すると、サイドロードされたアプリケーションが起動します
    await launchChannel('dev');
}
```

### テスト
`wdio-roku-service/controller`はRokuにボタン押下を送信する機能を提供します。`keySequence`が主要なもので、複数のボタン押下を順番に送信します。
```js
import { Buttons, keySequence } from 'wdio-roku-service/controller';

// アプリをナビゲート
await keySequence(Buttons.LEFT, Buttons.LEFT, Buttons.SELECT, Buttons.DOWN, Buttons.SELECT);
// 現在のアプリUIをRokuからフェッチしてブラウザにロード
await browser.openRokuXML();
// または、タイムアウトするか条件が満たされるまで繰り返しXMLをロードする待機を使用
await browser.waitUntil(condition);
await element.waitForDisplayed();
// Roku XMLをウェブページのようにWDIOマッチャーを使用
await expect(element).toHaveAttr('focused');
```

`wdio-roku-service/controller`にはボタンの保持や解放、およびキーボードへのテキスト入力のための関数もあります。
```js
import { Buttons, keyboardInput, keyPress, keySequence } from 'wdio-roku-service/controller';

await keySequence(Buttons.DOWN, Buttons.DOWN, Buttons.SELECT);
await keyboardInput('example');
await keyPress(Buttons.ENTER);
await browser.openRokuXML();
```

### ディープリンク
`wdio-roku-service/channel`はチャンネル関連の機能を提供します。`inputChannel`を使用すると、アプリに任意の情報を送信できます。
```js
import { exitChannel, launchChannel, MediaType } from 'wdio-roku-service/channel';
await exitChannel();
await launchChannel(process.env.ROKU_CHANNEL_ID, myContent, MediaType.MOVIE, {myExtraParameter:true});
await expect(MyContent.header).toBeDisplayed();
```

### その他の関数
`wdio-roku-service/info`は、アプリアイコンや孤立ノードの取得など、その他の機能を提供します。
```js
import { getAppIcon } from 'wdio-roku-service/info';
const response = await getAppIcon(process.env.ROKU_CHANNEL_ID);
expect(response.headers.get('Content-Type')).toBe('image/jpg');
```
`wdio-roku-service/ecp`は、非常に特殊なことを行う必要がある場合のECPとの直接のインターフェースです。
```js
import { ECP } from 'wdio-roku-service/ecp';
await ECP('search/browse?keyword=voyage&type=movie&tmsid=MV000058030000', 'POST');
```

## よくある落とし穴
* Roku要素では、テキストはタグの間ではなく、'text'属性にあります。セレクタを作成する場合、ほとんどの要素で`$('element=Text')`は機能しません。代わりに、`$('element[text=Text]')`を使用する必要があります。

## 機能ロードマップ
* `npm init wdio@latest`質問票中にこのサービスをインストールできるようにするPRが近日中に提出される予定です。
* 現在、スリープ状態のRokuを起こす手段など、より多くの機能をツール化できるようにするためのRokuとのソケット通信を評価中です。
* ネットワークアクティビティをキーにできるネットワークプロキシ機能。

## AllureレポートにスクリーンショットとXMLファイルを添付する方法

標準状態では、Allureレポートにはアプリのスクリーンショットやテスト実行中のRokuアプリの現在の状態を表すXMLコードのコピーを生成する設定がありません。以下のドキュメントでは、`it`テストが実行を完了するたびにアプリの現在の状態のスクリーンショットを生成し、Allureレポートに添付する方法を説明します。また、`it`テストの実行が失敗した場合に、現在のRokuアプリの状態を表すXMLのスナップショットを取得することもできます。

Allureレポーターの完全なドキュメントについては、@wdio/allure-reporterのドキュメント https://webdriver.io/docs/allure-reporter/ をご覧ください。

### Utils.js依存関係
次のコードを`Utils.js`というファイルに追加します。このファイルは`/helpers`フォルダなどに配置できます。
```js
/**
 * エポックのミリ秒単位の「現在」タイムスタンプの文字列表現を返します。
 */
export const getEpochTimestamp = async () => {
    return Date.now().toString()
}

/**
 * パターン：{YYYY}-{MM}-{DD}_{24時間形式の時}-{分}-{秒}-{ミリ秒}に従った「現在」タイムスタンプの文字列表現を返します。
 */
export const getLongFormatTimestamp = async () => {
    const now = new Date(Date.now())
    const result = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}-${now.getMilliseconds()}`
    return result
}

/**
 * レポート目的で使用される可能なファイル拡張子の文字列表現を含むオブジェクト。
 */
export const FILE_EXTENSIONS = {
    JPG: '.jpg',
    XML: '.xml'
}

/**
 * レポート目的で使用される可能なMIMEタイプの文字列表現を含むオブジェクト。
 */
export const FILE_MIME_TYPES = {
    JPG: 'image/jpeg',
    XML: 'application/xml'
}

/**
 * 可能な接頭辞、タイムスタンプ、および提供された可能な拡張子の1つを持つファイル名を生成する関数。
 * @param {string} fileExtension 前に定義されたFILE_EXTENSIONSオブジェクトの値の1つを使用します。
 * @param {string} [fileNamePrefix] 提供された場合、ファイル名の先頭に追加される接頭辞。デフォルトは空の文字列です。
 */
export const getFileNameWithTimestamp = async (fileExtension, fileNamePrefix = '') => {
    return (fileNamePrefix !== '')
        ? `${fileNamePrefix}_${await getLongFormatTimestamp()}${fileExtension}`
        : `${await getLongFormatTimestamp()}${fileExtension}`
}

```

### wdio.conf.jsコード
`wdio.conf.js`ファイルに次のインポート文を追加します：
```js
import { readFile, rm } from 'node:fs/promises'
import { addAttachment } from '@wdio/allure-reporter'
import { FILE_EXTENSIONS, FILE_MIME_TYPES, getFileNameWithTimestamp } from './<Utils.jsファイルのパス>/Utils.js'  // <Utils.jsファイルのパス>を実際のUtils.jsファイルへの相対パスに置き換えてください

```

`wdio.conf.js`ファイルに次の`afterTest`フックを定義します。このフックに既に動作するコードがある場合は、以下のコードを追加してください。
```js
afterTest: async function (test, context, result) {
        // テスト結果に関係なくスクリーンショットを保存・添付するロジック。
        const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.JPG)
        try {
            const tempScreenshotPath = `./allure-results/${fileName}`
            await browser.saveScreenshot(tempScreenshotPath)
            const screenShotData = await readFile(tempScreenshotPath)
            addAttachment(`${fileName}`, screenShotData, FILE_MIME_TYPES.JPG)
            await rm(tempScreenshotPath).catch((rmError) => {
                console.error(`Failed to remove file: ${tempScreenshotPath}`, rmError)
            })
        } catch (error) {
            console.error('Error handling screenshot or attachment: ', error)
        }

        // テスト失敗時のXML添付ロジック。
        if (result.passed === false) {
            const fileName = await getFileNameWithTimestamp(FILE_EXTENSIONS.XML, 'AppStateAfterTestFail')
            const rawSourceString = String(await browser.getPageSource())
            const extractedXMLSubstring = '<?xml version="1.0" encoding="UTF-8" ?>\n'.concat(rawSourceString.substring(rawSourceString.search('<app-ui xmlns="">'), rawSourceString.search('</app-ui>')).concat('</app-ui>')).replace('<app-ui xmlns="">', '<app-ui>')
            try {
                addAttachment(`${fileName}`, extractedXMLSubstring, FILE_MIME_TYPES.XML)
            } catch (error) {
                console.log(error)
            }
        }
    },
```

### 期待される動作
このコードをプロジェクトの設定に配置すると、`it`テストが実行されるたびに、テスト結果に関係なく、実行終了時にスクリーンショットが撮影され、Allureレポートの関連セクションに添付されることが期待されます。特にテストが失敗した場合、アプリの状態のXML形式のソーススナップショットもAllureレポートのテストセクションに添付されます。

### 注意
* 標準のAllureレポートは`.png`形式のスクリーンショットをサポートしています。このサービスのメソッドオーバーライドは代わりに`.jpg`形式の画像をサポートしています。
* XML添付ファイルはAllureレポート自体で閲覧するか、ブラウザの別のタブで開くことができます。