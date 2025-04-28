---
id: actions
title: الإجراءات
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

يسمح بتشغيل عدة تفاعلات إجرائية في وقت واحد، على سبيل المثال لمحاكاة تكبير القرصة (pinch zoom).
لمزيد من المعلومات حول أمر `action`، راجع [الوثائق](/docs/api/browser/action).

##### الاستخدام

```js
browser.actions()
```

##### مثال

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