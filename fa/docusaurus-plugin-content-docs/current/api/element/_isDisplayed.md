---
id: isDisplayed
title: نمایش داده شدن
custom_edit_url: https://github.com/webdriverio/webdriverio/edit/main/packages/webdriverio/src/commands/element/isDisplayed.ts
---

مقدار true را برمی‌گرداند اگر عنصر DOM انتخاب شده نمایش داده شود (حتی زمانی که عنصر خارج از ویوپورت است). این دستور از 
متد [`checkVisibility`](https://developer.mozilla.org/en-US/docs/Web/API/Element/checkVisibility#visibilityproperty)
که توسط مرورگر ارائه می‌شود استفاده می‌کند تا تعیین کند آیا یک عنصر نمایش داده می‌شود یا خیر. از آنجایی که WebdriverIO مانند یک کاربر واقعی عمل می‌کند، مقادیر پیش‌فرض برای پرچم‌های `contentVisibilityAuto`، `opacityProperty` و `visibilityProperty` روی `true` تنظیم شده‌اند تا رفتار سخت‌گیرانه‌تری داشته باشد. این به این معنی است که دستور بررسی می‌کند آیا عنصر به دلیل مقدار خصوصیت‌های `content-visibility`، `opacity` و `visibility` قابل مشاهده است یا خیر.

اگر می‌خواهید همچنین تأیید کنید که عنصر در داخل ویوپورت نیز قرار دارد، پرچم `withinViewport` را به دستور ارائه دهید.

:::info

برخلاف سایر دستورات عنصر، WebdriverIO برای اجرای این دستور منتظر وجود عنصر نمی‌ماند.

:::

WebdriverIO هنگام انجام تست‌های مرورگر، از یک [اسکریپت سفارشی](https://github.com/webdriverio/webdriverio/blob/59d349ca847950354d02b9e548f60cc50e7871f0/packages/webdriverio/src/scripts/isElementDisplayed.ts) 
که به طور خاص برای ارزیابی قابلیت مشاهده عناصر طراحی شده، استفاده می‌کند. این اسکریپت برای تعیین اینکه آیا یک عنصر در صفحه نمایش داده می‌شود، کلیدی است. در مقابل، برای سناریوهای تست موبایل بومی با Appium، WebdriverIO به دستور [`isElementDisplayed`](https://appium.io/docs/en/2.1/reference/interfaces/appium_types.ExternalDriver/#elementdisplayed) 
که توسط Appium ارائه می‌شود، متکی است. این دستور قابلیت مشاهده عناصر را با استفاده از معیارهایی که توسط درایور زیربنایی Appium ایجاد شده، ارزیابی می‌کند و ارزیابی‌های دقیق و مخصوص درایور برای برنامه‌های موبایل را تضمین می‌کند.

##### استفاده

```js
$(selector).isDisplayed(withinViewport, contentVisibilityAuto, opacityProperty, visibilityProperty)
```

##### پارامترها

<table>
  <thead>
    <tr>
      <th>نام</th><th>نوع</th><th>جزئیات</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code><var>withinViewport=false</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>`true` برای بررسی اینکه آیا عنصر در داخل ویوپورت قرار دارد. به طور پیش‌فرض `false` است.</td>
    </tr>
    <tr>
      <td><code><var>contentVisibilityAuto=true</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>`true` برای بررسی اینکه آیا خاصیت content-visibility عنصر دارای مقدار auto است (یا آن را به ارث می‌برد)، و در حال حاضر از رندر آن صرف نظر می‌کند. به طور پیش‌فرض `true` است.</td>
    </tr>
    <tr>
      <td><code><var>opacityProperty=true</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>`true` برای بررسی اینکه آیا خاصیت opacity عنصر دارای مقدار 0 است (یا آن را به ارث می‌برد). به طور پیش‌فرض `true` است.</td>
    </tr>
    <tr>
      <td><code><var>visibilityProperty=true</var></code><br /><span className="label labelWarning">اختیاری</span></td>
      <td>`Boolean`</td>
      <td>`true` برای بررسی اینکه آیا عنصر به دلیل مقدار خاصیت visibility آن نامرئی است. به طور پیش‌فرض `true` است.</td>
    </tr>
  </tbody>
</table>

##### مثال‌ها

```html title="index.html"
<div id="noSize"></div>
<div id="noSizeWithContent">Hello World!</div>
<div id="notDisplayed" style="width: 10px; height: 10px; display: none"></div>
<div id="notVisible" style="width: 10px; height: 10px; visibility: hidden"></div>
<div id="zeroOpacity" style="width: 10px; height: 10px; opacity: 0"></div>
<div id="notInViewport" style="width: 10px; height: 10px; position:fixed; top: 999999; left: 999999"></div>
```

```js title="isDisplayed.js"
it('should detect if an element is displayed', async () => {
    elem = await $('#notExisting');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSize');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    let elem = await $('#noSizeWithContent');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true

    let elem = await $('#notDisplayed');
    let isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notVisible');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#zeroOpacity');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: false

    elem = await $('#notInViewport');
    isDisplayed = await elem.isDisplayed();
    console.log(isDisplayed); // outputs: true
});
isDisplayedWithinViewport.js
it('should detect if an element is visible within the viewport', async () => {
    let isDisplayedInViewport = await $('#notDisplayed').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notVisible').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notExisting').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#notInViewport').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false

    isDisplayedInViewport = await $('#zeroOpacity').isDisplayed({ withinViewport: true });
    console.log(isDisplayedInViewport); // outputs: false
});
```

##### برگشتی

- **&lt;Boolean&gt;**
            **<code><var>return</var></code>:**  true اگر عنصر نمایش داده شود