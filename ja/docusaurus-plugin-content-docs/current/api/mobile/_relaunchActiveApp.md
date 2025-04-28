---
id: relaunchActiveApp
title: アクティブなアプリを再起動する
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/mobile/relaunchActiveApp.ts
---

以下を実行してアクティブなネイティブアプリを再起動します：

- アクティブなアプリを終了する
- 以前アクティブだったアプリを起動する

:::important
このコマンドは現在アクティブなアプリを再起動（終了/閉じて起動/開始）しますが、アプリの状態はリセットしません。Appiumはアプリのハードリセットを実行できません。以下の場合を除きます：

- 新しいセッションを開始し、セッションハンドラーがアプリの状態を削除/デバイスをクリーンにする場合
- アプリ内にアプリの状態をリセットするバックドアがあり、Appiumがそのバックドアをコールできる場合

AndroidまたはiOSのアプリ状態をリセットしたい場合は、スクリプトで独自のリセットメカニズム/コマンドを作成する必要があります。オプションとしては：

- Android：`adb`コマンドを使用してアプリデータをクリアする：`adb shell pm clear <appPackage>`
- iOS：`mobile: installApp`コマンドを使用してアプリを再インストールする
- ....
- このコマンドを使用しない

利用可能なオプションはプラットフォーム、アプリ、テストを行う場所（通常はデバイスへの完全なアクセスを持つローカル環境か、アクセスが制限されたクラウド環境）によって異なります。

:::

##### 例

```js title="restart.app.js"
it('should restart the app with default options', async () => {
    await browser.relaunchActiveApp()
})
```