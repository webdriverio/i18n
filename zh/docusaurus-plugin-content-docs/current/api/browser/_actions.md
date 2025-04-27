---
id: actions
title: 动作
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

允许同时运行多个交互动作，例如模拟捏合缩放。
有关`action`命令的更多信息，请查看[文档](/docs/api/browser/action)。

##### 用法

```js
browser.actions()
```

##### 示例

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