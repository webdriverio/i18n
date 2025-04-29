---
id: wdio-gmail-service
title: Gmail サービス
custom_edit_url: https://github.com/webdriverio-community/wdio-gmail-service/edit/main/README.md
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

> wdio-gmail-service は、サードパーティのパッケージです。詳細については [GitHub](https://github.com/webdriverio-community/wdio-gmail-service) | [npm](https://www.npmjs.com/package/wdio-gmail-service) をご覧ください。

[Gmail Tester](https://github.com/levz0r/gmail-tester) を使用して Google Mail からメールを取得するための WebdriverIO プラグインです。

## インストール

最も簡単な方法は、package.json に `wdio-gmail-service` を `devDependency` として保持することです。

```json
{
  "devDependencies": {
    "wdio-gmail-service": "^2.0.0"
  }
}
```

次のようにインストールできます：

```sh
npm install wdio-gmail-service --save-dev
```

## 使用方法

### Gmail 認証

[Gmail Tester](https://github.com/levz0r/gmail-tester) の指示に従って、`credentials.json`（OAuth2 認証ファイル）と `token.json`（OAuth2 トークン）を作成する必要があります。

### 設定

サービスリストに `gmail` を追加してサービスを追加します。例：

```js
// wdio.conf.js
import path from 'path'

export const config = {
    // ...
    services: [['gmail', {
        credentialsJsonPath: path.join(process.cwd(), './credentials.json'),
        tokenJsonPath: join(process.cwd(), './token.json'),
        intervalSec: 10,
        timeoutSec: 60
    }]]
    // ...
};
```

## サービスオプション

### credentialsJsonPath
認証情報 JSON ファイルへの絶対パス。

型: `string`

必須: `true`

### tokenJsonPath
トークン JSON ファイルへの絶対パス。

型: `string`

必須: `true`

### intervalSec
Gmail 受信トレイのチェック間隔。

型: `number`

デフォルト: `10`

必須: `false`

### timeoutSec
指定されたフィルターでメールを見つけるための最大待機時間。

型: `number`

デフォルト: `60`

必須: `false`


## テストの作成

WebdriverIO テストで、メールが受信されたかどうかを確認できるようになりました。

```js
describe('Example', () => {
    it('Should check email', () => {
        // メールを送信するアクションを実行
        const emails = await browser.checkInbox({ from: 'AccountSupport@ubi.com', subject: 'Ubisoft Password Change Request' });
        expect(emails[0].body.html).toContain('https://account-uplay.ubi.com/en-GB/action/change-password?genomeid=')
    })
})
```

## `checkInbox` パラメータ

コマンドパラメータには、`from`、`to`、または `subject` のうち少なくとも1つが必要です：

### `from`
送信者のメールアドレスでフィルタリングします。

型: `String`

### `to`
受信者のメールアドレスでフィルタリングします。

型: `String`

### `subject`
メールの件名でフィルタリングします。

型: `String`

### `includeBody`
デコードされたメール本文を取得するには true に設定します。

型: `boolean`

### `includeAttachments`
Base64エンコードされたメール添付ファイルを取得するには true に設定します。

型: `boolean`

### `before`
指定された日付より前に受信したメッセージをフィルタリングします。

型: `Date`

### `after`
指定された日付より後に受信したメッセージをフィルタリングします。

型: `Date`

### `label`
デフォルトのラベルは 'INBOX' ですが、'SPAM'、'TRASH' またはカスタムラベルに変更できます。組み込みラベルの完全なリストについては、https://developers.google.com/gmail/api/guides/labels?hl=en を参照してください。

型: `String`

---

WebdriverIO の詳細については、[ホームページ](https://webdriver.io)をご覧ください。