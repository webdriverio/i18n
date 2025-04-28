---
id: relaunchActiveApp
title: アクティブアプリの再起動
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

アクティブなネイティブアプリの再起動を以下の方法で実行します：

- アクティブなアプリを終了する
- 以前アクティブだったアプリを起動する

:::important
このコマンドは現在アクティブなアプリを再起動（終了/閉じて起動/開始）しますが、アプリの状態をリセットすることはありません。Appiumがアプリのハードリセットを実行できるのは以下の場合のみです：

- 新しいセッションを開始し、セッションハンドラーがアプリの状態を削除/デバイスをクリーンアップする
- アプリ内にアプリ状態をリセットするバックドアがあり、Appiumがそのバックドアを呼び出せる

AndroidやiOSのアプリ状態をリセットしたい場合は、スクリプトで独自のリセットメカニズム/コマンドを作成する必要があります。選択肢としては：

- Android：`adb`コマンドを使用してアプリデータをクリアする：`adb shell pm clear <appPackage>`
- iOS：`mobile: installApp`コマンドを使用してアプリを再インストールする
- ....
- このコマンドを使用しない

選択肢はプラットフォーム、アプリ、およびテスト場所（ほとんどの場合デバイスへの完全なアクセス権を持つローカル環境、またはアクセスが制限されるクラウド環境）によって異なります。

:::

##### 例

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```