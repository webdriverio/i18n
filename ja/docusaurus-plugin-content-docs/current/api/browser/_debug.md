---
id: debug
title: デバッグ
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/debug.ts
---

このコマンドは統合テストのデバッグに役立ちます。実行中のブラウザを停止し、ブラウザに入ってアプリケーションの状態（例：開発ツールを使用）を確認する時間を与えます。
ターミナルは[REPL](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)インターフェースに変換され、特定のコマンドを試したり、要素を見つけたり、それらに対してアクションをテストしたりすることができます。

[![WebdriverIO REPL](https://webdriver.io/img/repl.gif)](https://webdriver.io/img/repl.gif)

WDIOテストランナーを実行する場合は、テストのタイムアウトによるテスト終了を防ぐために、使用しているテストフレームワーク（例：MochaやJasmine）のタイムアウトプロパティを増やしてください。
また、複数のケイパビリティが同時に実行されている状態でコマンドを実行することは避けてください。

<iframe width="560" height="315" src="https://www.youtube.com/embed/xWwP-3B_YyE" frameborder="0" allowFullScreen></iframe>

##### 使用法

```js
browser.debug()
```

##### 例

```js title="debug.js"
it('should demonstrate the debug command', async () => {
    await $('#input').setValue('FOO')
    await browser.debug() // jumping into the browser and change value of #input to 'BAR'
    const value = await $('#input').getValue()
    console.log(value) // outputs: "BAR"
})
```