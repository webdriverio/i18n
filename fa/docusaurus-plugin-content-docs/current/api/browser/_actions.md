---
id: actions
title: اکشن‌ها
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/browser/actions.ts
---

این دستور به شما اجازه می‌دهد چندین تعامل اکشن را به‌طور هم‌زمان اجرا کنید، به عنوان مثال برای شبیه‌سازی زوم با دو انگشت.
برای اطلاعات بیشتر در مورد دستور `action`، [مستندات](/docs/api/browser/action) را مطالعه کنید.

##### استفاده

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