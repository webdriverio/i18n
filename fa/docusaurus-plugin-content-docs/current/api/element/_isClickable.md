---
id: isClickable
title: isClickable
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isClickable.ts
---

یک عنصر زمانی قابل کلیک در نظر گرفته می‌شود که شرایط زیر برآورده شوند:

- عنصر وجود داشته باشد
- عنصر نمایش داده شود
- عنصر غیرفعال نباشد
- عنصر در محدوده دید باشد
- عنصر بتواند به محدوده دید اسکرول شود
- مرکز عنصر با عنصر دیگری همپوشانی نداشته باشد

در غیر این صورت، false برگردانده می‌شود.

:::info

لطفاً توجه داشته باشید که `isClickable` فقط در مرورگرهای وب و در وب‌ویوهای موبایل کار می‌کند،
و در محیط بومی اپلیکیشن‌های موبایل کار نمی‌کند. همچنین، برخلاف سایر دستورات عنصر، 
WebdriverIO برای اجرای این دستور منتظر وجود عنصر نخواهد ماند.

:::

##### استفاده

```js
$(selector).isClickable()
```

##### مثال

```js title="isClickable.js"
it('should detect if an element is clickable', async () => {
    const el = await $('#el')
    let clickable = await el.isClickable();
    console.log(clickable); // outputs: true or false

    // wait for element to be clickable
    await browser.waitUntil(() => el.isClickable())
});
```

##### مقادیر بازگشتی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**             اگر عنصر قابل کلیک باشد true بر می‌گرداند