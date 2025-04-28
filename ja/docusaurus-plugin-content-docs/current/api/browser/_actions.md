---
id: actions
title: アクション
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

一度に複数のアクションインタラクションを実行することができます。例えば、ピンチズームをシミュレートする場合などです。
`action` コマンドの詳細については、[ドキュメント](/docs/api/browser/action)をご覧ください。

##### 使用方法

```js
browser.actions()
```

##### 例

```js title="action.js"
it('run multiple actions at once for a pinch zoom', async () => {
    await browser.actions([
        browser.action('pointer')
            .move(500, 500)
            .down()
            .move(250, 250)
            .up(),
        browser.action('pointer')
            .move(500, 500)
            .down()
            .move(750, 750)
            .up()
    ])
});
```